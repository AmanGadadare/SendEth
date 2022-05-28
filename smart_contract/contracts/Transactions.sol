
//used to transfer amount and store the all transactions

//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


contract Transactions{
    uint256 transactionCount; //  variable  hold the no of transactions


    event Transfer(address from,address receiver,uint amount,string message,uint256 timestamp,string keyword);


    struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;

    }
    TransferStruct[] transactions; //arreay of transactions




    function addToBlockchain(address payable receiver ,uint amount,string memory message,string memory keyword) public{ //public function anyone can read it 
    transactionCount +=1;
    transactions.push(TransferStruct(msg.sender,receiver,amount,message,block.timestamp,keyword));



    emit Transfer(msg.sender,receiver,amount,message,block.timestamp,keyword);

    }

    function getAllTransactions() public view returns( TransferStruct[] memory){ //public function retuen transactions from array
      return transactions;


    }

    function getTransactionCount() public view returns (uint256){ //public function return transaction count
     return transactionCount;
    }

}