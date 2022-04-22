import { useContext } from "react";
import { ethers } from "ethers";
import { Web3Context } from "../../library/Web3Provider";
import { Button } from "antd";

function ConnectButton() {
  //get context
  const { acct, eth, bal, ens } = useContext(Web3Context);
  const [account, setAccount] = acct;
  const [ethersProvider, setEthersProvider] = eth;
  const [balance, setBalance] = bal;
  const [ensName, setENSName] = ens;

  //request access to the users MetaMask account
  async function requestAccounts() {
    //if metamask installed
    if (typeof window.ethereum !== "undefined") {
      //check local storage for existing user
      const existingUser = window.localStorage.getItem("user");

      //existing user not found
      if (existingUser == null) {
        //query web3 for connected accounts, save to context
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });

        //at least one account returned
        if (accounts.length > 0) {
          //set first account as logged in user
          setAccount(accounts[0]);

          //save account to local storage
          window.localStorage.setItem("user", accounts[0]);

          //create new ethers provider, save to context
          const ep = new ethers.providers.Web3Provider(window.ethereum);
          setEthersProvider(new ethers.providers.Web3Provider(window.ethereum));

          //query balance, format, save to context
          let balance = await ep.getBalance(accounts[0]);
          let formattedBal = ethers.utils.formatEther(balance);
          setBalance(formattedBal);

          //check for ens name
          try {
            let name = await ep.lookupAddress(accounts[0]);

            if (name != null) {
              //save ens to context
              setENSName(name);
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    } else {
      console.log("Install MetaMask!");
      //TODO: create alert
    }
  }

  return (
    <Button type="primary" shape="round" onClick={() => requestAccounts()}>
      Connect
    </Button>
  );
}

export default ConnectButton;
