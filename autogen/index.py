import os
from web3 import Web3

# Set up Alchemy API URL and your account's private key as environment variables for enhanced security
#ALCHEMY_URL = os.getenv("https://polygon-mumbai.g.alchemy.com/v2/6lbrRWLNtFdHA0G1cC2_JlPziApEjcvz")  # Replace with your actual Alchemy URL if not using environment variables
#SENDER_PRIVATE_KEY = os.getenv("0xf0f5ca7834d60c343f3155815537e3bfb016e8472a85deafd4873ff88836d88b")  # Replace with your actual sender private key
ALCHEMY_URL = "https://polygon-mumbai.g.alchemy.com/v2/6lbrRWLNtFdHA0G1cC2_JlPziApEjcvz"
SENDER_PRIVATE_KEY = "0xf0f5ca7834d60c343f3155815537e3bfb016e8472a85deafd4873ff88836d88b"

# Replace these placeholders with the sender and recipient Ethereum addresses
SENDER_ADDRESS = "0xDE57E1034Dacd7f62502b5aa3cF1B87AC9fE13A6"
RECIPIENT_ADDRESS = "0xf21C459e7e3a34091331968f95a3F22B7C4E8d59"

# Connect to the Ethereum network through Alchemy
web3 = Web3(Web3.HTTPProvider(ALCHEMY_URL))

# Ensure the connection is established
assert web3.is_connected(), "Failed to connect to Ethereum network."

# Convert Ether to Wei for the transaction amount
amount_in_ether = 0.01  # Example amount, adjust as necessary
amount_in_wei = web3.to_wei(amount_in_ether, 'ether')

# Retrieve the nonce for the sender's address
nonce = web3.eth.get_transaction_count(SENDER_ADDRESS)

# Construct the transaction dictionary
transaction = {
    'nonce': nonce,
    'to': RECIPIENT_ADDRESS,
    'value': amount_in_wei,
    'gas': 2000000,
    'gasPrice': web3.to_wei('50', 'gwei'),
    'chainId': 80001  # Use 1 for Ethereum main network
}

# Sign the transaction with the sender's private key
signed_txn = web3.eth.account.sign_transaction(transaction, SENDER_PRIVATE_KEY)

# Send the transaction and get the transaction hash
txn_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)

# Output the transaction hash; convert to hexadecimal string
print(f"Transaction hash: {web3.to_hex(txn_hash)}")
