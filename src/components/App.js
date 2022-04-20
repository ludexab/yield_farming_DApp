import React, {Component} from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DBank from "../truffle_abis/DBank.json";
import ParticleSettings from './ParticleSettings';

class App extends Component {

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('no ethereum wallet detected, you can check out MetaMask.')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account: account[0]})
        if (account == '0xEdE6F1BDe48fd183fE3B95487a2648c53Ed88Abf'){
            this.setState({bank: true})
        }

        const networkId = await web3.eth.net.getId()

        //load Tether contract
        const tetherData = Tether.networks[networkId]
        if (tetherData) {
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
            this.setState({tether: tether})
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({tetherBalance: tetherBalance.toString()})
        }
        else {
            window.alert('Error! Tether contract not deployed - no netork detected')
        }

        //Load RWD Contract
        const rwdData = RWD.networks[networkId]
        if (rwdData) {
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
            this.setState({rwd: rwd})
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance.toString()})
        }
        else {
            window.alert('Error! RWD contract not deployed - no netork detected')
        }

        //Load DBank
        const dbankData = DBank.networks[networkId]
        if (dbankData) {
            const dbank = new web3.eth.Contract(DBank.abi, dbankData.address)
            this.setState({dbank: dbank})
            let stakingBalance = await dbank.methods.stakingBalance(this.state.account).call()
            this.setState({stakingBalance: stakingBalance.toString()})
        }
        else {
            window.alert('Error! DBank contract not deployed - no netork detected')
        }

        //After loading all contract data
        this.setState({loading: false})
    }

    giveOutRewardTokens = async () => {
        console.log("Attempting to Issue rewards tokens!")
        await this.state.dbank.methods.issueRewardTokens().send({from: this.state.account})
        console.log("Issue rewards successful!")
    }

    stakeTokens = async (amount) => {
        this.setState({loading: true});
        await this.state.tether.methods.approve(this.state.dbank._address, amount).send({from: this.state.account});
        await this.state.dbank.methods.depositStakeTokens(amount).send({from: this.state.account});
        this.setState({loading: false});
    };

    unstakeTokens = async (amount) => {
        this.setState({loading: true})
        await this.state.dbank.methods.unstakeTokens(amount).send({from: this.state.account})
        this.setState({loading: false})
    }

    constructor(props) {
        super(props)
        this.state = {
            bank: false,
            account: '0x0',
            tether: {},
            rwd: {},
            dbank: {},
            loading: true,
            tetherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            countDown: false,
        }
    }
    render() {
        let content
        {
            this.state.loading ? content =
                <p id='loader' classname='text-center' style={{margin: '30px', color: 'white'}}>
                    LOADING, PLEASE WAIT...
                </p> :
                content = <Main
                    dbank={this.state.dbank}
                    bank={this.state.bank}
                    account={this.state.account}
                    dbankData={this.dbankData}
                    stakingBalance={this.state.stakingBalance}
                    rwdBalance={this.state.rwdBalance}
                    tetherBalance={this.state.tetherBalance}
                    stakeTokens={this.stakeTokens}
                    unstakeTokens={this.unstakeTokens}
                    giveOutRewardTokens={this.giveOutRewardTokens} />
        }
        return (
            <div className="App" style={{position: 'relative'}}>
                <div style={{position: 'absolute'}}>
                    <ParticleSettings />
                </div>
                <Navbar account={this.state.account} />
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth: '800px', minHeight: '100vm'}}>
                            <div>
                                {content}
                            </div>
                        </main>
                    </div>
                </div>
            </div >
        )
    }
}

export default App;