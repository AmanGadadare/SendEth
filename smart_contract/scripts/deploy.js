


const main =async () =>{ //last which wil deploy the contract
 
  const Transactions= await hre.ethers.getContractFactory("Transactions");  //class which will genertae instances of contract
  
  const transactions = await Transactions.deploy(); //instances


  await transactions.deployed();

  console.log("Transaction deployed to:", transactions.address);
}


const runMain=async()=>{   //second

  try{
    await main();

    process.exit(0) ;  //0 means process went suceesfulyy
  } catch(error){
    console.error(error);
    process.exit(1) ; //1 means there was an error

  }
}
  runMain();  //first called


