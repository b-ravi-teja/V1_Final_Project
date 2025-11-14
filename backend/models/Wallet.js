/**
 * Mongoose Schema for Wallet Verification
 * Stores wallet address, IPFS hash, and authentication status
 */

const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Validate Ethereum address format
        return /^0x[a-fA-F0-9]{40}$/.test(v);
      },
      message: props => `${props.value} is not a valid Ethereum address!`
    }
  },
  hash: {
    type: String,
    required: true,
    trim: true
  },
  auth: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  verifiedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for faster queries
walletSchema.index({ walletAddress: 1 });

module.exports = mongoose.model('Wallet', walletSchema);



