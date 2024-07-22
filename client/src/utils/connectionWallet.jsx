import {ethers,Contract} from "ethers";
import stakingAbi from "../ABI/stakingAbi.json"
import stakeTokenAbi from "../ABI/stakeTokenAbi.json";


export const connectWallet = async()=>{
    try{
       let [signer,provider,stakingContract,stakeTokenContract,chainId]=[null,null,null,null,null];
       if(window.ethereum===null){
          throw new Error("Metamsk is not installed");
       }
       const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
       })

       let chainIdHex= await window.ethereum.request({
        method:'eth_chainId'
       })
       chainId= parseInt(chainIdHex,16)
       
       let selectedAccount =accounts[0];
       if(!selectedAccount){
        throw new Error("No ethereum accounts available")
       } 

       provider = new ethers.BrowserProvider(window.ethereum);
       signer = await provider.getSigner();
            const stakingContractAddress = "0x11f6dd9932377cddf3305a724355b35d9e18ae6a"
            const stakeTokenContractAddress= "0x72c4730cc001c5bfb91ffbf9a2703416f57eb3c3"
            stakingContract= new Contract(stakingContractAddress,stakingAbi,signer);
            stakeTokenContract=new Contract(stakeTokenContractAddress,stakeTokenAbi,signer);
     
            return {provider,selectedAccount,stakeTokenContract,stakingContract,chainId}
     
         }catch(error){
             console.error(error);
             throw error
         }
         
     }