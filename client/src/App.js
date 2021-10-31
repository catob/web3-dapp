import React from 'react';
import Web3Info from './components/Web3Info.js';
import './App.css';
import { useWeb3 } from '@openzeppelin/network/react';

const infuraProjectId = '95202223388e49f48b423ea50a70e336';

function App() {
  const web3Context = useWeb3(`wss://mainnet.infura.io/ws/v3/${infuraProjectId}`);
  // const web3Context = useWeb3('http://localhost:8545');

  return (
    <div className="App">
      <Web3Info
        title="Web3 Info"
        web3Context={web3Context}
      />
    </div>
  );
};

export default App;
