/**
 * Main Application Component
 * Handles MetaMask integration, user registration, and IPFS upload
 */

import React, { useState, useEffect } from 'react';
import './App.css';
import WalletConnect from './components/WalletConnect';
import RegistrationForm from './components/RegistrationForm';
import AdminPanel from './components/AdminPanel';

import FloatingCubes from './components/FloatingCubes';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('user'); // 'user' or 'admin'

  /**
   * Check if MetaMask is already connected on page load
   */
  useEffect(() => {
    checkIfWalletIsConnected();
    setupEventListeners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Check if wallet is already connected
   */
  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  /**
   * Set up event listeners for MetaMask account and network changes
   */
  const setupEventListeners = () => {
    if (window.ethereum) {
      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // Listen for network changes
      window.ethereum.on('chainChanged', handleChainChanged);
    }
  };

  /**
   * Handle account changes in MetaMask
   */
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected wallet
      setWalletAddress('');
      setIsConnected(false);
    } else {
      // User switched account
      setWalletAddress(accounts[0]);
      setIsConnected(true);
    }
  };

  /**
   * Handle network changes in MetaMask
   */
  const handleChainChanged = () => {
    // Reload the page on network change
    window.location.reload();
  };

  /**
   * Connect to MetaMask wallet
   */
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask is not installed. Please install MetaMask to continue.');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      setWalletAddress(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Failed to connect to MetaMask. Please try again.');
    }
  };

  /**
   * Disconnect wallet
   */
  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
  };

  return (
    <div className="App">
      <FloatingCubes />
      <header className="App-header">
        <h1>🔐 Blockchain Wallet Verification</h1>
        <p>Secure identity verification using Polygon, IPFS, and MetaMask</p>
      </header>

      <div className="tab-container">
        <button
          className={`tab ${activeTab === 'user' ? 'active' : ''}`}
          onClick={() => setActiveTab('user')}
        >
          User Registration
        </button>
        <button
          className={`tab ${activeTab === 'admin' ? 'active' : ''}`}
          onClick={() => setActiveTab('admin')}
        >
          Admin Panel
        </button>
      </div>

      <main className="main-content">
        {activeTab === 'user' ? (
          <>
            <WalletConnect
              walletAddress={walletAddress}
              isConnected={isConnected}
              connectWallet={connectWallet}
              disconnectWallet={disconnectWallet}
            />

            {isConnected && (
              <RegistrationForm
                walletAddress={walletAddress}
              />
            )}
          </>
        ) : (
          <AdminPanel />
        )}
      </main>

      <footer className="App-footer">
        <p>Built with React, Solidity, IPFS, and MongoDB</p>
      </footer>
    </div>
  );
}

export default App;


