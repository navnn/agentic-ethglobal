// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HierarchicalWallet {
    address public parent;
    address public child;
    uint public constant REQUIRED_CONFIRMATIONS = 2;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmations;
    }

    mapping(uint => Transaction) public transactions;
    mapping(uint => mapping(address => bool)) public confirmations;
    uint public transactionCount;

    event TransactionSubmitted(uint indexed transactionId);
    event TransactionConfirmed(uint indexed transactionId, address indexed signer);
    event TransactionExecuted(uint indexed transactionId);

    constructor(address _parent, address _child) {
        parent = _parent;
        child = _child;
    }

    modifier onlyOwner() {
        require(msg.sender == parent || msg.sender == child, "Not an owner");
        _;
    }

    function submitTransaction(address _to, uint _value, bytes memory _data) public onlyOwner {
        uint transactionId = transactionCount;
        transactions[transactionId] = Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false,
            numConfirmations: 0
        });
        transactionCount++;
        emit TransactionSubmitted(transactionId);
    }

    function confirmTransaction(uint _transactionId) public onlyOwner {
        require(!transactions[_transactionId].executed, "Transaction already executed");
        require(!confirmations[_transactionId][msg.sender], "Transaction already confirmed by this owner");

        confirmations[_transactionId][msg.sender] = true;
        transactions[_transactionId].numConfirmations++;
        emit TransactionConfirmed(_transactionId, msg.sender);

        if (transactions[_transactionId].numConfirmations >= REQUIRED_CONFIRMATIONS) {
            executeTransaction(_transactionId);
        }
    }

    function executeTransaction(uint _transactionId) private {
        require(!transactions[_transactionId].executed, "Transaction already executed");
        require(transactions[_transactionId].numConfirmations >= REQUIRED_CONFIRMATIONS, "Not enough confirmations");

        Transaction storage transaction = transactions[_transactionId];
        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data);
        require(success, "Transaction execution failed");

        emit TransactionExecuted(_transactionId);
    }
}