import React, {Component} from "react";
import tether from '../tether.png';
import Withdraw from "./Withdraw";

class Client extends Component {

    render() {
        return (
            <div id='content' className="mt-3 text-center">
                <table className="table text-muted text-center">
                    <thead>
                        <tr style={{color: 'white'}}>
                            <th scope="col">Staking Balance</th>
                            <th scope="col">Reward Balance</th>
                        </tr>
                    </thead>
                    <tbody className="text-center" style={{color: 'white'}}>
                        <tr>
                            <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} USDT</td>
                            <td>{window.web3.utils.fromWei(this.props.rwdBalance, 'Ether')} RWD</td>
                        </tr>
                    </tbody>
                </table>
                <div className="card mb-2 text-center" style={{opacity: '.9', backgroundColor: 'green', color: 'white'}}>
                    <div>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault()
                                let amount
                                amount = this.input.value.toString()
                                amount = window.web3.utils.toWei(amount, 'Ether')
                                this.props.stakeTokens(amount)
                            }}
                            className="mb-3" >
                            <div className="text-center" style={{borderSpacing: '0 1em'}}>
                                <label className="text-center mt-3"><b>BALANCE: {window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')} eth</b></label>
                                <div className="input-group mb4 justify-content-center">
                                    <label className="text-center mt-3"><b>Stake Tokens &nbsp;&nbsp;</b></label>
                                    <input
                                        ref={(input) => {this.input = input}}
                                        type='text'
                                        placeholder="0"
                                        required />
                                    <div className="input-group-open">
                                        <div className="input-group-text">
                                            <img src={tether} alt='tether' height='30px' />
                                            &nbsp;&nbsp; USDT
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mt-3" style={{width: '100px'}}>Deposit</button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <Withdraw unstakeTokens={this.props.unstakeTokens}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Client;