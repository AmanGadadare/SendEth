import React,{useEffect,useState} from 'react';
import {ethers} from 'ethers';

import {contractABI,contractAddress } from '../utils/constants';


export const TransactionContext=React.createContext();

const {ethereum} =window;

const getEthereumContract=()=>{
    const provider =new ethers.providers.Web3Provider(ethereum);
    const signer= provider.getSigner();


    const transactionContract =new ethers.Contract(contractAddress,contractABI,signer) //paramerters need to fetch our contract


    return transactionContract;

}
 

//react error function
//every context provider need for props thats children,also need to retunn  something

export const TransactionProvider=({children})=>{

    const[currentAccount,setCurrentAccount]=useState('');
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" }); //getting data from the form of welcome 
    const [isLoading,setIsLoading]=useState(false);
    const[tranasactionCount,setTransactionCount]=useState(localStorage.getItem('transactionCount'));

//dynamically will update the form data


const handleChange =(e,name)=>{
    setformData((prevState) => ({...prevState,[name]:e.target.value}));
}


   
    const checkIfWalletIsConnect = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
    
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
    
            getAllTransactions();
          } else {
            console.log("No accounts found");
          }
        } catch (error) {
          console.log(error);
          throw new Error("no ethereum object")
         
        }
      };







const sendTransaction =async()=>{
    try{
        if (!ethereum) return alert("Please install MetaMask.");
        const{addressTo,amount,keyword,message}=formData;
        const transactionContract =getEthereumContract();
        const parsedAmount=ethers.utils.parseEther(amount);





        await ethereum.request({
            method :'eth_sendTransaction',
            params:[{
                from:currentAccount,
                to:addressTo,
                gas:'0x5208',  //21000 gwei ether 0.000021
                value:parsedAmount._hex,
            }]
        });
        const transactionHash=await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);
        setIsLoading(true);
        console.log('Loading-${transactionHash.hash}');
        await transactionHash.wait();

        setIsLoading(false);
        console.log('Success- ${transactionHash.hash}');

        const transactionCount=await transactionContract.getTransactionCount();
        setTransactionCount(tranasactionCount.toNumber());


        

        //get the data from the form

    }catch(error){
        console.log(error);
        throw new Error("No ethereum object")
    }
}




    const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
    
          setCurrentAccount(accounts[0]);
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };


















    useEffect(()=>{
        checkIfWalletIsConnect();
    },[])






    return(
        <TransactionContext.Provider value={{connectWallet,currentAccount,formData,setformData,handleChange,sendTransaction}}>

            {children}
        </TransactionContext.Provider>

    );
};


