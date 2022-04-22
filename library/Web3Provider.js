import { createContext, useState } from 'react'

//create a context with createContext api
export const Web3Context = createContext()

const Web3Provider = (props) => {
    //this state will be shared with all components
    const [account, setAccount] = useState("")
    const [ethersProvider, setEthersProvider] = useState()
    const [balance, setBalance] = useState("")
    const [ensName, setENSName] = useState("")
    const [nativeSymbol, setNativeSymbol] = useState("ETH");

    return (
        //this is the provider providing state
        <Web3Context.Provider value={{
            acct: [account, setAccount],
            eth: [ethersProvider, setEthersProvider],
            bal: [balance, setBalance],
            ens: [ensName, setENSName],
            sym: [nativeSymbol, setNativeSymbol]
        }}>
            {props.children}
        </Web3Context.Provider>
    );
};

export default Web3Provider