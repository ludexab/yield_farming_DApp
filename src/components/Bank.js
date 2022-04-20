import React, {Component} from "react";
import tether from '../tether.png';
import Airdrop from "./Airdrop";

class Bank extends Component {

    render() {
        return (
            <div id='content' className="mt-3 text-center">
                <div className="card mb-2 text-center" style={{opacity: '.9', backgroundColor: 'green', color: 'white'}}>
                    
                    <div className="text-center">
                        <div className="card-body" style={{color: 'White'}}> AIRDROP <Airdrop account={this.props.account} stakingBalance={this.props.stakingBalance} dbank={this.props.dbank} /></div>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            onClick={(event) => {
                                event.preventDefault(
                                    this.props.giveOutRewardTokens()
                                )
                            }}
                            className="btn btn-primary mb-3" style={{width: '100px'}}>Reward</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Bank;
