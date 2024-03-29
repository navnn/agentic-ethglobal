// const fetch = require('node-fetch');
// const ethers = require("ethers");
import fetch from 'node-fetch';
import { ethers } from "ethers";

async function main() {
    const response = await fetch('https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=0x50802059B3A299b36bc2c71aBEDBA450032f49AB&apikey=BKYNJIC6UXF5YQYTQKJPHVFQCK4VUHK6UI');
    const data = await response.json();

    let abi = data.result;
    console.log(abi);

    //const node = "wss://polygon-mumbai.g.alchemy.com/v2/6lbrRWLNtFdHA0G1cC2_JlPziApEjcvz";
    //const provider = new ethers.providers.WebSocketProvider(node);
    const node = "https://sepolia.era.zksync.dev";
    const provider = new ethers.providers.JsonRpcProvider(node);

    // initiating a new Wallet, passing in our private key to sign transactions
    //let privatekey = "fdfb72ce9754e3cbc1e79e44a8e20804cebd3c4a347605c6a3462a8de05b8784";
    //let wallet = new ethers.Wallet(privatekey, provider);
    //let mnemonic = "tent absorb shine viable used guard anxiety possible before rhythm rough bid toy treat document";
    //let wallet = new ethers.Wallet.fromMnemonic(mnemonic, provider);
    const wallet = ethers.Wallet.createRandom();

    // print the wallet address
    console.log('address:', wallet.address)
    console.log('mnemonic:', wallet.mnemonic)
    console.log('privateKey:', wallet.privateKey)
}

main();