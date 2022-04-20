import React, {Component} from 'react';
import bank from '../bank.png';

class Navbar extends Component {
    render() {
        return (
            <nav className='navbar navbar-dark fixed-top shadow p-0' style={{backgroundColor: 'black', height: '50px'}}>
                <a className='navbar-brand col-sm-3 col-md-2 mr-0' style={{color: 'white'}}>
                    <img alt="bank" src={bank} heigth='50px' width='80px' className='d-inline-block align-top' />
                    &nbsp; CurrEth Investment
                </a>
                <ul className='navbar-nav px-3'>
                    <li className='text-nowrap d-none nav-item d-sm-none d-sm-block'>
                        <small style={{color: 'white'}}>ACC No: {this.props.account}</small>
                    </li>
                </ul>
            </nav>
        )
    }
}
export default Navbar;