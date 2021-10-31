import React, { useCallback } from 'react';

export default function Web3Info(props) {
  const { web3Context } = props;
  const { networkId, networkName, accounts, providerName } = web3Context;

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

