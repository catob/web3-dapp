import React, { useState, useEffect, useCallback } from 'react';

export default function Web3Info(props) {
  const { web3Context } = props;
  const { networkId, networkName, accounts, providerName, lib } = web3Context;

  const [balance, setBalance] = useState(0);

  const getBalance = useCallback(async () => {
    let balance = accounts && accounts.length > 0
      ? lib.utils.fromWei(await lib.eth.getBalance(accounts[0]),  'ether')
      : 'Unknown';
    setBalance(balance);
  }, [accounts, lib.eth, lib.utils]);

  useEffect(() => {
    getBalance();
  }, [accounts, getBalance, networkId]);

  const requestAuth = async web3Context => {
    try {
      await web3Context.requestAuth();
    } catch (error) {
      console.log(error);
    }
  };

  const requestAccess = useCallback(() => requestAuth(web3Context), []);

  return (
    <div>
      <h3>{props.title}</h3>
      <div>Network: {networkId ? `${networkId} - ${networkName}` : 'No connection'}</div>
      <div>Your address: {accounts && accounts.length ? accounts[0] : 'unknown'}</div>
      <div>Your ETH balance: {balance}</div>
      <div>Provider: {providerName}</div>
      {accounts && accounts.length ? (
        <div>Accounts & Signing Status: Access Grated</div>
      ) : !!networkId && providerName !== 'infura' ? (
        <>
          <button onClick={requestAccess}>Request Access</button>
        </>
      ) : <></>}
    </div>
  );
};

