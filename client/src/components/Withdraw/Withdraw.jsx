import { ethers } from "ethers";
import { useState, useContext,useRef } from "react";
import Web3Context from "../../context/Web3Context";
import StakingContext from '../../context/StakingContext';
import { toast } from "react-hot-toast";

import "./Withdraw.css"


import Button from "../Button/Button";
const WithdrawStakeAmount = () =>
    {
        const [transactionStatus,setTransactionStatus] = useState("")
         const {stakingContract}=useContext(Web3Context);
         const {isReload,setIsReload}=useContext(StakingContext)

         const withdrawStakeAmountRef= useRef();
         

         const withdrawStakeToken=async(e)=>{
           e.preventDefault();
         const amount = withdrawStakeAmountRef.current.value.trim();
         console.log(amount)
         if(isNaN(amount) || amount<=0){
         console.error("Please enter a valid positive number");
         return;
          }
            const amountToWithdraw = ethers.parseUnits(amount, 18).toString();
            console.log(amountToWithdraw)
            
            try{
                const  transaction = await stakingContract.withdrawStakedTokens(amountToWithdraw)
                await toast.promise(transaction.wait(),
                {
                 loading: "Transaction is pending...",
                 success: 'Transaction successful 👌',
                 error: 'Transaction failed 🤯'
                });
                withdrawStakeAmountRef.current.value = "";
                setIsReload(!isReload);
                //setTransactionStatus("Transaction is Pending.....")
                //const receipt = await transaction.wait();
                //if(receipt.status==1){
                //    setTransactionStatus("Transaction is Successful");

                 //   setIsReload(!isReload)
                 //   setTimeout(()=>{
                 //       setTransactionStatus("")
                 //   },5000)
                 //   withdrawStakeAmountRef.current.value= "";


               // }
              //  else{ setTransactionStatus("Transaction Failed...")
                //}
            }
            catch(error){
                toast.error("Staking Failed");
                console.error(error.message)
            }

        }
        return(
            <form className="withdraw-form" onSubmit={withdrawStakeToken}>
            <label>Withdraw Token:</label>
            <input type="text" ref={withdrawStakeAmountRef} />
            <Button
            onClick={withdrawStakeToken}
            type="submit"
            label="Withdraw Staked Token"
            />
      </form>

        )
        

    }
    export default WithdrawStakeAmount;