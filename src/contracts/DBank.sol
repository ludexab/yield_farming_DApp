pragma solidity ^0.5.17;

import "./RWD.sol";
import "./Tether.sol";

contract DBank {
    string public name = "Decentralized Bank";
    address public owner;
    RWD public rwd;
    Tether public tether;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public stakingAmount;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    function depositStakeTokens(uint256 _amount) public {
        require(_amount > 0, "Staking amount cannot be 0");

        tether.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function unstakeTokens(uint256 _amount) public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0);
        tether.transfer(msg.sender, _amount);
        stakingBalance[msg.sender] -= _amount;
        isStaking[msg.sender] = false;
    }

    function issueRewardTokens() public {
        require(msg.sender == owner);
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 10;
            if (balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }
}
