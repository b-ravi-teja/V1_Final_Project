# 📊 Project Overview

## 🎯 What This Project Does

This is a complete **blockchain-based wallet verification system** that:

1. **Allows users to register** their identity (name, email, Aadhaar) linked to their MetaMask wallet
2. **Stores user data on IPFS** (decentralized storage)
3. **Records IPFS hash on Polygon blockchain** (immutable proof)
4. **Saves records in MongoDB** (traditional database for quick access)
5. **Enables admin verification** by comparing blockchain and database hashes

## 🏗️ Architecture

```
┌─────────────────┐
│   React Frontend│
│   + MetaMask    │
└────────┬────────┘
         │
         ├──────────────────┐
         │                  │
         ▼                  ▼
┌─────────────────┐  ┌──────────────┐
│  IPFS (Infura)  │  │   Polygon    │
│  Store JSON     │  │   Amoy       │
│  Return Hash    │  │   Contract   │
└─────────────────┘  └──────┬───────┘
         │                  │
         │                  │
         ▼                  ▼
┌──────────────────────────────┐
│   Node.js + Express Backend  │
│   - Store in MongoDB         │
│   - Admin verification       │
│   - Compare blockchain hash  │
└──────────────────────────────┘
         │
         ▼
┌─────────────────┐
│  MongoDB Atlas  │
│  Store records  │
└─────────────────┘
```

## 📦 Project Structure

```
Cursor/
│
├── 📁 backend/                  # Node.js/Express backend
│   ├── models/
│   │   └── Wallet.js           # MongoDB schema
│   ├── routes/
│   │   ├── walletRoutes.js     # User registration endpoints
│   │   └── adminRoutes.js      # Admin verification endpoints
│   ├── utils/
│   │   └── contractVerifier.js # Blockchain interaction
│   └── server.js               # Main server file
│
├── 📁 contracts/                # Solidity smart contracts
│   ├── WalletVerification.sol  # Main contract
│   ├── hardhat.config.js       # Hardhat config
│   ├── scripts/
│   │   └── deploy.js           # Deployment script
│   └── package.json
│
├── 📁 frontend/                 # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── WalletConnect.js    # MetaMask connection
│   │   │   ├── RegistrationForm.js # User registration
│   │   │   └── AdminPanel.js       # Admin dashboard
│   │   ├── App.js              # Main app component
│   │   ├── App.css             # Styles
│   │   └── index.js            # Entry point
│   └── package.json
│
├── 📄 .env                      # Environment variables (create this)
├── 📄 env.template              # Environment template
├── 📄 package.json              # Backend dependencies
├── 📄 .gitignore                # Git ignore rules
│
├── 📚 README.md                 # Full documentation
├── 📚 QUICKSTART.md             # Quick setup guide
├── 📚 DEPLOYMENT_GUIDE.md       # Deployment instructions
├── 📚 PROJECT_OVERVIEW.md       # This file
└── 🔧 setup.sh                  # Automated setup script
```

## 🔄 User Flow

### Registration Process

1. User connects MetaMask wallet
2. Fills in registration form (name, email, Aadhaar)
3. Clicks submit:
   - Frontend converts data to JSON
   - Uploads JSON to IPFS → gets hash (e.g., `QmXxxx...`)
   - Calls smart contract to store hash on blockchain
   - User approves transaction in MetaMask
   - Sends wallet + hash to backend
   - Backend saves to MongoDB with `auth: false`
4. Success! User is registered

### Verification Process

1. Admin logs in (`block_test` / `block`)
2. Enters wallet address to verify
3. Clicks verify:
   - Backend fetches hash from MongoDB
   - Backend fetches hash from blockchain contract
   - Compares both hashes
   - If match: Updates `auth: true` in MongoDB
   - If no match: Returns error
4. Wallet is now verified!

## 🛠️ Technology Stack

### Frontend
- **React 18**: UI framework
- **ethers.js v6**: Blockchain interaction
- **ipfs-http-client**: IPFS uploads
- **Axios**: HTTP requests
- **MetaMask**: Wallet connection

### Backend
- **Node.js**: Runtime
- **Express**: Web framework
- **Mongoose**: MongoDB ODM
- **ethers.js**: Contract interaction
- **dotenv**: Environment variables

### Blockchain
- **Solidity ^0.8.20**: Smart contract language
- **Hardhat**: Development environment
- **Polygon Amoy**: Testnet deployment
- **ethers.js**: Contract deployment

### Storage
- **IPFS (Infura)**: Decentralized file storage
- **MongoDB Atlas**: Traditional database

## 🔑 Key Features

### Security
✅ MetaMask signature verification  
✅ Blockchain immutability  
✅ IPFS content addressing  
✅ Admin authentication  
✅ Environment variable protection  

### User Experience
✅ Auto-detect MetaMask  
✅ Auto-fill wallet address  
✅ Listen for account changes  
✅ Listen for network changes  
✅ Real-time status updates  
✅ Beautiful, modern UI  

### Admin Features
✅ Secure login  
✅ Wallet verification  
✅ View all registrations  
✅ Hash comparison  
✅ Verification status tracking  

## 📊 Database Schema

```javascript
{
  walletAddress: String,    // Ethereum address (unique)
  hash: String,             // IPFS hash
  auth: Boolean,            // Verification status
  createdAt: Date,          // Registration timestamp
  verifiedAt: Date,         // Verification timestamp
  timestamps: true          // Auto timestamps
}
```

## 🔗 Smart Contract Functions

```solidity
// Store IPFS hash for a wallet
setHash(address walletAddress, string ipfsHash)

// Retrieve IPFS hash for a wallet
getHash(address walletAddress) returns (string)

// Check if wallet has a hash
hasHash(address walletAddress) returns (bool)

// Events
HashStored(address indexed walletAddress, string ipfsHash, uint256 timestamp)
HashUpdated(address indexed walletAddress, string oldHash, string newHash, uint256 timestamp)
```

## 🌐 API Endpoints

### Public Endpoints

**Register Wallet**
```
POST /api/wallet/register
Body: { walletAddress, hash }
```

**Get Wallet Info**
```
GET /api/wallet/:address
```

### Admin Endpoints

**Login**
```
POST /api/admin/login
Body: { username, password }
```

**Verify Wallet**
```
POST /api/admin/verify
Body: { walletAddress }
```

**Get All Wallets**
```
GET /api/admin/wallets
```

## 🚀 Quick Commands

### Setup
```bash
./setup.sh                    # Run automated setup
```

### Development
```bash
npm run dev                   # Start backend (dev mode)
cd frontend && npm start      # Start frontend
```

### Smart Contract
```bash
cd contracts
npx hardhat compile           # Compile contract
npx hardhat run scripts/deploy.js --network polygonAmoy  # Deploy
```

### Production
```bash
npm start                     # Start backend (production)
cd frontend && npm run build  # Build frontend
```

## 📈 Data Flow Diagram

```
User Fills Form
      ↓
Convert to JSON
      ↓
Upload to IPFS → IPFS Hash (QmXxx...)
      ↓
Store on Blockchain (via MetaMask transaction)
      ↓
Send to Backend API
      ↓
Save in MongoDB (auth: false)
      ↓
Admin Verifies
      ↓
Compare MongoDB hash ↔ Blockchain hash
      ↓
If Match: Update MongoDB (auth: true)
```

## 🔒 Environment Variables Required

### Backend (.env)
```env
MONGODB_URI                # MongoDB connection string
POLYGON_AMOY_RPC_URL      # Polygon RPC endpoint
CONTRACT_ADDRESS          # Deployed contract address
PORT                      # Server port
ADMIN_USERNAME            # Admin username
ADMIN_PASSWORD            # Admin password
PRIVATE_KEY              # For contract deployment only
```

### Frontend (frontend/.env)
```env
REACT_APP_CONTRACT_ADDRESS  # Deployed contract address
```

## 🎓 Learning Resources

**Blockchain Concepts**
- Ethereum addresses and wallets
- Smart contracts
- Gas fees and transactions
- Testnet vs Mainnet

**IPFS**
- Content addressing
- Decentralized storage
- IPFS hashing

**React + Web3**
- MetaMask integration
- ethers.js usage
- Transaction signing
- Event listening

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MetaMask not detected | Install extension, refresh page |
| Transaction fails | Check MATIC balance, verify network |
| MongoDB connection error | Check URI, IP whitelist |
| Contract not found | Verify CONTRACT_ADDRESS is correct |
| IPFS upload fails | Check internet, try different gateway |

## 📝 License

MIT License - Free to use for learning and development

## 🙏 Credits

Built with:
- React
- Solidity
- ethers.js
- IPFS
- MongoDB
- Polygon
- Hardhat

---

**Ready to build?** Start with `QUICKSTART.md` for a 5-minute setup!


