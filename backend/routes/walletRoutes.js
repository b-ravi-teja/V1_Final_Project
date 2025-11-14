/**
 * Wallet Routes
 * Handles wallet registration and IPFS hash storage
 */

const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');

/**
 * POST /api/wallet/register
 * Store wallet address and IPFS hash in MongoDB
 */
router.post('/register', async (req, res) => {
  try {
    const { walletAddress, hash } = req.body;

    // Validate input
    if (!walletAddress || !hash) {
      return res.status(400).json({ 
        success: false, 
        message: 'Wallet address and IPFS hash are required' 
      });
    }

    // Check if wallet already exists
    const existingWallet = await Wallet.findOne({ 
      walletAddress: walletAddress.toLowerCase() 
    });

    if (existingWallet) {
      // Update existing record
      existingWallet.hash = hash;
      existingWallet.auth = false; // Reset auth status on new submission
      await existingWallet.save();

      return res.status(200).json({
        success: true,
        message: 'Wallet information updated successfully',
        data: existingWallet
      });
    }

    // Create new wallet record
    const newWallet = new Wallet({
      walletAddress: walletAddress.toLowerCase(),
      hash,
      auth: false
    });

    await newWallet.save();

    res.status(201).json({
      success: true,
      message: 'Wallet registered successfully',
      data: newWallet
    });

  } catch (error) {
    console.error('Error registering wallet:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering wallet',
      error: error.message
    });
  }
});

/**
 * GET /api/wallet/:address
 * Retrieve wallet information by address
 */
router.get('/:address', async (req, res) => {
  try {
    const { address } = req.params;

    const wallet = await Wallet.findOne({ 
      walletAddress: address.toLowerCase() 
    });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: 'Wallet not found'
      });
    }

    res.status(200).json({
      success: true,
      data: wallet
    });

  } catch (error) {
    console.error('Error fetching wallet:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching wallet',
      error: error.message
    });
  }
});

module.exports = router;



