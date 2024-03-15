const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = 'idea future arena ghost meat deer food dad finish always defense catalog';

module.exports = {
    networks: {
        mumbai: {
            provider: () => new HDWalletProvider(mnemonic, 'https://polygon-mumbai.g.alchemy.com/v2/6lbrRWLNtFdHA0G1cC2_JlPziApEjcvz'),
            network_id: 80001,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true
        }
    },
    compilers: {
        solc: {
            version: "0.8.0"
        }
    }
};