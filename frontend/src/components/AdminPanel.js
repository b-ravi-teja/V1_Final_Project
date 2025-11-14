/**
 * AdminPanel Component
 * Handles admin login and wallet verification
 */

import React, { useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [verifyAddress, setVerifyAddress] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [allWallets, setAllWallets] = useState([]);

  /**
   * Handle login form input changes
   */
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Handle admin login
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    try {
      const response = await axios.post('/api/admin/login', loginData);

      if (response.data.success) {
        setIsLoggedIn(true);
        setStatusMessage('✅ Login successful!');
        loadAllWallets();
      }

    } catch (error) {
      console.error('Login error:', error);
      setStatusMessage('❌ Invalid credentials. Please try again.');
    }
  };

  /**
   * Load all wallets from database
   */
  const loadAllWallets = async () => {
    try {
      const response = await axios.get('/api/admin/wallets');
      if (response.data.success) {
        setAllWallets(response.data.data);
      }
    } catch (error) {
      console.error('Error loading wallets:', error);
    }
  };

  /**
   * Handle wallet verification
   */
  const handleVerify = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerificationResult(null);
    setStatusMessage('');

    try {
      if (!verifyAddress) {
        throw new Error('Please enter a wallet address');
      }

      const response = await axios.post('/api/admin/verify', {
        walletAddress: verifyAddress
      });

      setVerificationResult(response.data);
      
      if (response.data.success) {
        setStatusMessage('✅ Wallet verified successfully!');
        loadAllWallets(); // Refresh wallet list
      } else {
        setStatusMessage(`❌ ${response.data.message}`);
      }

    } catch (error) {
      console.error('Verification error:', error);
      setStatusMessage(`❌ ${error.response?.data?.message || error.message}`);
    } finally {
      setIsVerifying(false);
    }
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: '', password: '' });
    setVerifyAddress('');
    setVerificationResult(null);
    setAllWallets([]);
    setStatusMessage('');
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  /**
   * Format wallet address for display
   */
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 8)}...${address.substring(address.length - 6)}`;
  };

  // Login Form
  if (!isLoggedIn) {
    return (
      <div className="admin-panel-container">
        <h2>🔐 Admin Login</h2>
        <p className="admin-description">
          Enter your admin credentials to access the verification panel.
        </p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {statusMessage && (
          <div className={`status-message ${statusMessage.includes('❌') ? 'error' : 'success'}`}>
            {statusMessage}
          </div>
        )}

        <div className="admin-hint">
          <p>Default credentials:</p>
          <p>Username: <code>block_test</code></p>
          <p>Password: <code>block</code></p>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="admin-panel-container">
      <div className="admin-header">
        <h2>👨‍💼 Admin Dashboard</h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="verify-section">
        <h3>Verify Wallet</h3>
        <p className="section-description">
          Enter a wallet address to verify against the blockchain contract.
        </p>

        <form onSubmit={handleVerify} className="verify-form">
          <div className="form-group">
            <label htmlFor="verifyAddress">Wallet Address</label>
            <input
              type="text"
              id="verifyAddress"
              value={verifyAddress}
              onChange={(e) => setVerifyAddress(e.target.value)}
              placeholder="0x..."
              required
              disabled={isVerifying}
            />
          </div>

          <button 
            type="submit" 
            className="verify-button"
            disabled={isVerifying}
          >
            {isVerifying ? '⏳ Verifying...' : '🔍 Verify Wallet'}
          </button>
        </form>

        {statusMessage && (
          <div className={`status-message ${statusMessage.includes('❌') ? 'error' : 'success'}`}>
            {statusMessage}
          </div>
        )}

        {verificationResult && (
          <div className="verification-result">
            <h4>Verification Result:</h4>
            <pre>{JSON.stringify(verificationResult, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="wallets-section">
        <h3>All Registered Wallets</h3>
        <div className="wallets-list">
          {allWallets.length === 0 ? (
            <p className="no-wallets">No wallets registered yet.</p>
          ) : (
            <table className="wallets-table">
              <thead>
                <tr>
                  <th>Wallet Address</th>
                  <th>IPFS Hash</th>
                  <th>Verified</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {allWallets.map((wallet) => (
                  <tr key={wallet._id}>
                    <td>
                      <code className="address-cell">{formatAddress(wallet.walletAddress)}</code>
                    </td>
                    <td>
                      <code className="hash-cell">{wallet.hash.substring(0, 12)}...</code>
                    </td>
                    <td>
                      <span className={`auth-badge ${wallet.auth ? 'verified' : 'pending'}`}>
                        {wallet.auth ? '✅ Verified' : '⏳ Pending'}
                      </span>
                    </td>
                    <td className="date-cell">{formatDate(wallet.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;







