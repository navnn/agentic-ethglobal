import { ethers } from "ethers";

async function initiateTransaction() {
  try {
    const node = "https://polygon-mumbai.g.alchemy.com/v2/6lbrRWLNtFdHA0G1cC2_JlPziApEjcvz";
    //const node = "https://polygon-mumbai-pokt.nodies.app";
    //const node = "https://sepolia.era.zksync.dev";
    const provider = new ethers.providers.JsonRpcProvider(node);
    const network = await provider.getNetwork();
    console.log('Connected to network:', network.name);

    const privateKey = '0xf0f5ca7834d60c343f3155815537e3bfb016e8472a85deafd4873ff88836d88b';
    const wallet = new ethers.Wallet(privateKey, provider);

    // Check the wallet balance
    const balance = await wallet.getBalance();
    console.log('Wallet balance:', ethers.utils.formatEther(balance), 'MATIC');

    // Validate the recipient address
    const recipientAddress = '0xf21C459e7e3a34091331968f95a3F22B7C4E8d59';
    if (!ethers.utils.isAddress(recipientAddress)) {
      throw new Error('Invalid recipient address');
    } else {
        console.log("Recepient wallet is valid");
    }

    // Validate the recipient address
    const senderAddress = await wallet.getAddress();
    if (!ethers.utils.isAddress(senderAddress)) {
      throw new Error('Invalid sender address');
    } else {
        console.log("sender wallet is valid");
    }

    // const transaction = {
    //     // from: await wallet.getAddress(),
    //     to: '0xf21C459e7e3a34091331968f95a3F22B7C4E8d59',
    //     value: ethers.utils.parseEther('0.001'),
    //     gasLimit: 21000,
    //     maxFeePerGas: ethers.utils.parseUnits('0.1', 'gwei'),
    //     maxPriorityFeePerGas: ethers.utils.parseUnits('0.1', 'gwei'),
    //     type: 0x2,
    //     nonce: 1,
    //     chainId: 0x13881
    //   };
    // const signedTransaction = await wallet.signTransaction(transaction);
    // const transactionResponse = await provider.sendTransaction(signedTransaction);

    const transaction = {
        to: '0xf21C459e7e3a34091331968f95a3F22B7C4E8d59',
        value: ethers.utils.parseEther('0.001'),
        gasLimit: 210000,
        type: 0x2,
    };
    //const signedTransaction = await wallet.signTransaction(transaction);
    const transactionResponse = await wallet.sendTransaction(transaction);
    console.log('Transaction hash:', transactionResponse.hash);
    
    const transactionReceipt = await transactionResponse.wait();
    console.log('Confirmed');
  } catch (error) {
    console.error('Error:', error);
  }
}

initiateTransaction();