/**
 * WalletConnect Component
 * Handles MetaMask wallet connection and displays wallet status
 */

import React from 'react';
import './WalletConnect.css';

function WalletConnect({ walletAddress, isConnected, connectWallet, disconnectWallet }) {
  
  /**
   * Format wallet address for display
   */
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  /**
   * Copy wallet address to clipboard
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    alert('Wallet address copied to clipboard!');
  };

  return (
    <div className="wallet-connect-container">
      <h2>Connect Your Wallet</h2>
      
      {!isConnected ? (
        <div className="connect-section">
          <p className="info-text">
            Connect your MetaMask wallet to get started with the verification process.
          </p>
          <button 
            className="connect-button"
            onClick={connectWallet}
          >
            🦊 Connect Wallet (MetaMask)
          </button>
        </div>
      ) : (
        <div className="connected-section">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span>Connected</span>
          </div>
          
          <div className="wallet-info">
            <label>Wallet Address:</label>
            <div className="address-display">
              <span className="full-address">{walletAddress}</span>
              <span className="short-address">{formatAddress(walletAddress)}</span>
              <button 
                className="copy-button"
                onClick={copyToClipboard}
                title="Copy address"
              >
                📋
              </button>
            </div>
          </div>

          <button 
            className="disconnect-button"
            onClick={disconnectWallet}
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;







