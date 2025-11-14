/**
 * Admin Routes
 * Handles admin authentication and wallet verification
 */

const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');
const { verifyWalletWithContract } = require('../utils/contractVerifier');

/**
 * POST /api/admin/login
 * Admin login endpoint
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate credentials against environment variables
    if (username === process.env.ADMIN_USERNAME && 
        password === process.env.ADMIN_PASSWORD) {
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token: 'admin-authenticated' // In production, use JWT tokens
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
});

/**
 * POST /api/admin/verify
 * Verify wallet by comparing MongoDB hash with blockchain contract hash
 */
router.post('/verify', async (req, res) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        message: 'Wallet address is required'
      });
    }

    // Find wallet in MongoDB
    const wallet = await Wallet.findOne({ 
      walletAddress: walletAddress.toLowerCase() 
    });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: 'Wallet not found in database'
      });
    }

    // Get hash from smart contract on Polygon Amoy
    const contractHash = await verifyWalletWithContract(walletAddress);

    if (!contractHash) {
      return res.status(404).json({
        success: false,
        message: 'Wallet not found in smart contract'
      });
    }

    // Compare hashes
    if (wallet.hash === contractHash) {
      // Update auth status to true
      wallet.auth = true;
      wallet.verifiedAt = new Date();
      await wallet.save();

      res.status(200).json({
        success: true,
        message: 'Wallet verified successfully',
        data: {
          walletAddress: wallet.walletAddress,
          hash: wallet.hash,
          auth: wallet.auth,
          verifiedAt: wallet.verifiedAt
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Hash mismatch - verification failed',
        details: {
          databaseHash: wallet.hash,
          contractHash: contractHash
        }
      });
    }

  } catch (error) {
    console.error('Error verifying wallet:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying wallet',
      error: error.message
    });
  }
});

/**
 * GET /api/admin/wallets
 * Get all wallets (admin only)
 */
router.get('/wallets', async (req, res) => {
  try {
    const wallets = await Wallet.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: wallets.length,
      data: wallets
    });

  } catch (error) {
    console.error('Error fetching wallets:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching wallets',
      error: error.message
    });
  }
});

module.exports = router;



