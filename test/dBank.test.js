const RWD = artifacts.require('RWD')
const Tether = artifacts.require('Tether')
const DBank = artifacts.require('DBank')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DBank', ([owner, client]) => {

    let tether, rwd, dbank;
    function ethToWei(ethAmount) {
        return web3.utils.toWei(ethAmount, 'Ether')
    }

    before(async () => {
        // loading contracts
        tether = await Tether.new()
        rwd = await RWD.new()
        dbank = await DBank.new(rwd.address, tether.address)

        // transfering all reward tokens to DBank
        await rwd.transfer(dbank.address, ethToWei('1000000'))

        // transfer 100 tokens to investors(new registered accounts)
        await tether.transfer(client, ethToWei('100'), {from: owner})

    })

    describe('Tether deployment', async () => {
        it('matches name correctly', async () => {
            const name = await tether.name()
            assert.equal(name, 'Tether')
        })
    })

    describe('Reward token deployment', async () => {
        it('mathces the token name correctly', async () => {
            const rwdName = await rwd.name()
            assert.equal(rwdName, 'Reward Token')
        })
    })

    describe('DBank deployment', async () => {
        it('mathces name correctly', async () => {
            const bankName = await dbank.name()
            assert.equal(bankName, 'Decentralized Bank')
        })
        it('Has total reward tokens', async () => {
            let balance = await rwd.balanceOf(dbank.address)
            assert.equal(balance, ethToWei('1000000'))
        })

        describe('Yield farming', async () => {
            it('Initial tokens should match 100', async () => {
                let initBal = await tether.balanceOf(client)
                assert.equal(initBal.toString(), ethToWei('100'))
            })
            it('Staking amount should reflect in total balance', async () => {
                let tokAmount = ethToWei('100')
                await tether.approve(dbank.address, tokAmount, {from: client})
                await dbank.depositStakeTokens(tokAmount, {from: client})
                let stakeBal = await dbank.stakingBalance(client)
                assert.equal(stakeBal.toString(), tokAmount.toString(), 'it should match 100 tokens')
            })
            it('checking bal of client after stake', async () => {
                let clientBal = await tether.balanceOf(client)
                assert.equal(clientBal.toString(), ethToWei('0'))
            })
            it('checking bal of dbank after stake', async () => {
                let bankBal = await tether.balanceOf(dbank.address)
                assert.equal(bankBal.toString(), ethToWei('100'))
            })
            it('Reward clients for staking', async () => {
                //checking if dbank can reward client
                await dbank.issueRewardTokens({from: owner})
                let checkReward = await rwd.balanceOf(client)
                assert.equal(checkReward.toString(), ethToWei('10'), 'reward is 10% (stake/10) of stake')

                //checking if anyone can reward client
                await dbank.issueRewardTokens({from: client}).should.be.rejected;
            })
            it('Checking for successful unstaking', async () => {
                await dbank.unstakeTokens(ethToWei('10'), {from: client})
            })
            it('Checking for successful stake bal update', async () => {
                let newClientBal = await tether.balanceOf(client)
                assert.equal(newClientBal.toString(), ethToWei('10'))
            })
            it('checking bal of dbank after unstake', async () => {
                let bankBal = await tether.balanceOf(dbank.address)
                assert.equal(bankBal.toString(), ethToWei('90'))
            })
        })
    })
})