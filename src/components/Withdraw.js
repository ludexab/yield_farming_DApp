import React, {Component} from "react";
import tether from '../tether.png';

class Withdraw extends Component {

    render() {
        return (
            <div>
                <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        let unstakeAmount
                        unstakeAmount = this.input.value.toString()
                        unstakeAmount = window.web3.utils.toWei(unstakeAmount, 'Ether')
                        this.props.unstakeTokens(unstakeAmount)
                    }}
                    className="mb-3" >
                    <div className="text-center" style={{borderSpacing: '0 1em'}}>
                        <div className="input-group mb4 justify-content-center">
                            <label className="text-center mt-3"><b>Unstake Tokens &nbsp;&nbsp;</b></label>
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
                        <button type="submit" className="btn btn-primary mt-3" style={{width: '100px'}}>Withdraw</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default Withdraw;