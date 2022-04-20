const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DBank = artifacts.require("DBank");

module.exports = async function (deployer, network, accounts) {
  // deploy Tether contract
  await deployer.deploy(Tether);
  const tether = await Tether.deployed()

  // deploy RWD contract
  await deployer.deploy(RWD);
  const rwd = await RWD.deployed()

  // deploy DBank contract
  await deployer.deploy(DBank, rwd.address, tether.address);
  const dbank = await DBank.deployed()

  // transfer all RWD token to DBank
  await rwd.transfer(dbank.address, '1000000000000000000000000')

  // distribute 100 Tether tokens to investors (new accounts registered)
  await tether.transfer(accounts[1], '100000000000000000000')
};
