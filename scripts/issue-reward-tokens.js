const DBank = artifacts.require('DBank');

module.exports = async function issueRewards(callback) {
    let dBank = await DBank.deployed()
    await dBank.issueRewardTokens()
    console.log('Rewards have been issued successfully')
    callback()
}