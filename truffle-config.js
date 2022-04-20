require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("@truffle/hdwallet-provider");
let privateKeys = ["faa2d09a9c6e491320a8ac83cdb7f688914502f462dcbfd9c777f88f0ff4c8a0",
                    "c589abf29076d8b02ddde527c2c6b3ea1e780a965844a6200ba5eea92f069432"]
let secret = {
    "key": "faa2d09a9c6e491320a8ac83cdb7f688914502f462dcbfd9c777f88f0ff4c8a0",
    "url": "https://rinkeby.infura.io/v3/db48c07b7a2b4765a2b5071c60b61db2",
    "url_wss":"wss://rinkeby.infura.io/ws/v3/db48c07b7a2b4765a2b5071c60b61db2"
}
module.exports = {
    networks: {
        development:{
            host: '127.0.0.1',
            port: '7545',
            network_id: '*' // match any network
        },
        rinkeby: {
            provider: () => new HDWalletProvider({
                privateKeys: privateKeys,
                providerOrUrl: secret.url_wss,
                numberOfAddresses: 2
            }),
            network_id: 4,       // 4 for rinkeby, 3 for Ropsten's id
            gas: 5500000,        // Ropsten has a lower block limit than mainnet
            confirmations: 2,    // # of confs to wait between deployments. (default: 0)
            timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
            skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
            },
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/truffle_abis/',
    compilers: {
        solc: {
            version: '0.5.17',
            optimizer:{
                enabled: true,
                runs: 200
            },
        }
    }
}