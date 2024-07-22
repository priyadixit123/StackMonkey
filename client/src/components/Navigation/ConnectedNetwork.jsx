import { useContext } from "react"
import Web3Context from "../../context/Web3Context"
const ConnectedNetwork =()=>{
    const {chainId}=useContext (Web3Context);
    if(chainId===11155111)
        {
            return <p>Sepolia</p>
        }
        else
        {
            return <p> Unsuppoeted </p>
        }
    console.log(chainId)
}
export default ConnectedNetwork