import React, {Component} from "react";
import tether from '../tether.png';
import bg from '../bg.jpg';
import Airdrop from "./Airdrop";
import Bank from "./Bank";
import Client from "./Client";

class Main extends Component {

    render() {
        let content
        {
            this.props.bank? content = <Bank
            dbank={this.props.dbank}
            bank={this.props.bank}
            account={this.props.account}
            dbankData={this.dbankData}
            stakingBalance={this.props.stakingBalance}
            rwdBalance={this.props.rwdBalance}
            tetherBalance={this.props.tetherBalance}
            giveOutRewardTokens={this.props.giveOutRewardTokens}/>:

            content = <Client
            dbank={this.props.dbank}
            bank={this.props.bank}
            account={this.props.account}
            dbankData={this.dbankData}
            stakingBalance={this.props.stakingBalance}
            rwdBalance={this.props.rwdBalance}
            tetherBalance={this.props.tetherBalance}
            stakeTokens={this.props.stakeTokens}
            unstakeTokens={this.props.unstakeTokens} />
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}
export default Main;