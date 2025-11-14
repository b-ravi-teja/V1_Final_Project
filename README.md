# 🔐 Blockchain Wallet Verification System

A full-stack decentralized application (dApp) for secure identity verification using **Polygon Amoy testnet**, **IPFS**, **MetaMask**, and **MongoDB**.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Smart Contract](#smart-contract)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Frontend (React)
- 🦊 **MetaMask Integration**: Seamless wallet connection with auto-detection
- 🔄 **Real-time Updates**: Listens for account and network changes
- 📝 **User Registration Form**: Capture name, email, unique ID (Aadhaar), and wallet address
- 📤 **IPFS Upload**: Automatic upload of user data to IPFS
- ⛓️ **Blockchain Integration**: Store IPFS hash on Polygon Amoy smart contract
- 👨‍💼 **Admin Panel**: Verify wallets and view all registrations

### Backend (Node.js + Express)
- 🗄️ **MongoDB Integration**: Store wallet data with Mongoose
- 🔑 **Admin Authentication**: Secure login for admin operations
- ✅ **Verification System**: Compare MongoDB hash with blockchain hash
- 🔍 **RESTful API**: Well-structured endpoints for all operations

### Smart Contract (Solidity)
- 📜 **Deployed on Polygon Amoy**: Low-cost testnet transactions
- 🗂️ **Hash Storage**: Map wallet addresses to IPFS hashes
- 📢 **Event Emission**: Track all hash storage operations
- 🔒 **Secure & Optimized**: Gas-efficient implementation

## 🛠️ Tech Stack

### Frontend
- React 18
- ethers.js v6
- ipfs-http-client
- Axios

### Backend
- Node.js
- Express.js
- Mongoose
- dotenv

### Smart Contract
- Solidity ^0.8.20
- Hardhat
- Polygon Amoy Testnet

### Storage & Database
- IPFS (Infura)
- MongoDB Atlas

## 📁 Project Structure

```
Cursor/
├── backend/
│   ├── models/
│   │   └── Wallet.js           # MongoDB schema
│   ├── routes/
│   │   ├── walletRoutes.js     # Wallet registration endpoints
│   │   └── adminRoutes.js      # Admin endpoints
│   ├── utils/
│   │   └── contractVerifier.js # Blockchain verification utility
│   └── server.js               # Express server
├── contracts/
│   ├── WalletVerification.sol  # Smart contract
│   ├── hardhat.config.js       # Hardhat configuration
│   ├── scripts/
│   │   └── deploy.js           # Deployment script
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── WalletConnect.js    # MetaMask connection
│   │   │   ├── RegistrationForm.js # User registration
│   │   │   └── AdminPanel.js       # Admin dashboard
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── package.json                # Root package.json
├── env.template               # Environment variables template
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MetaMask** browser extension
- **MongoDB Atlas** account (or local MongoDB)
- **Polygon Amoy** testnet tokens ([Get from faucet](https://faucet.polygon.technology/))

## 🚀 Installation

### 1. Clone the Repository

```bash
cd /Users/ravitejabalguri/development/Cursor
```

### 2. Install Dependencies

#### Root & Backend
```bash
npm install
```

#### Frontend
```bash
cd frontend
npm install
cd ..
```

#### Smart Contracts
```bash
cd contracts
npm install
cd ..
```

## ⚙️ Configuration

### 1. Backend Environment Variables

Create a `.env` file in the root directory:

```bash
cp env.template .env
```

Edit `.env` with your actual values:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://ravibalguri9:YOUR_PASSWORD@cluster0.ce9z6rv.mongodb.net/

# Polygon Amoy RPC URL
POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology/

# Smart Contract Address (add after deployment)
CONTRACT_ADDRESS=0x...

# Server Configuration
PORT=5000

# Admin Credentials
ADMIN_USERNAME=block_test
ADMIN_PASSWORD=block
```

### 2. Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
cd frontend
cp env.example .env
```

Edit `frontend/.env`:

```env
REACT_APP_CONTRACT_ADDRESS=0x...  # Add after deploying contract
```

### 3. Smart Contract Environment

Add to your root `.env` file:

```env
# Add your MetaMask private key for deployment
PRIVATE_KEY=your_private_key_here
```

⚠️ **Warning**: Never commit your private key to Git!

## 📤 Deployment

### 1. Deploy Smart Contract

```bash
cd contracts

# Compile the contract
npx hardhat compile

# Deploy to Polygon Amoy testnet
npx hardhat run scripts/deploy.js --network polygonAmoy

# Copy the deployed contract address
# Update CONTRACT_ADDRESS in both .env files
```

### 2. Start Backend Server

```bash
cd ..  # Back to root directory
npm start
# Or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Start Frontend

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## 📖 Usage

### User Registration Flow

1. **Open the Application**: Navigate to `http://localhost:3000`

2. **Connect MetaMask**:
   - Click "Connect Wallet (MetaMask)"
   - Approve the connection in MetaMask
   - Ensure you're on Polygon Amoy testnet

3. **Fill Registration Form**:
   - Enter your full name
   - Enter your email address
   - Enter your Aadhaar number (unique ID)
   - Wallet address will be auto-filled

4. **Submit Registration**:
   - Click "Submit Registration"
   - Data uploads to IPFS
   - Approve the transaction in MetaMask
   - Wait for blockchain confirmation
   - Data saved to MongoDB

### Admin Verification Flow

1. **Switch to Admin Panel**: Click the "Admin Panel" tab

2. **Login**:
   - Username: `block_test`
   - Password: `block`

3. **Verify Wallet**:
   - Enter a wallet address
   - Click "Verify Wallet"
   - System compares MongoDB hash with blockchain hash
   - If match, wallet is marked as verified (auth = true)

4. **View All Wallets**: See all registered wallets with their verification status

## 📡 API Documentation

### Wallet Endpoints

#### Register Wallet
```http
POST /api/wallet/register
Content-Type: application/json

{
  "walletAddress": "0x...",
  "hash": "QmXxx..."
}
```

#### Get Wallet Info
```http
GET /api/wallet/:address
```

### Admin Endpoints

#### Admin Login
```http
POST /api/admin/login
Content-Type: application/json

{
  "username": "block_test",
  "password": "block"
}
```

#### Verify Wallet
```http
POST /api/admin/verify
Content-Type: application/json

{
  "walletAddress": "0x..."
}
```

#### Get All Wallets
```http
GET /api/admin/wallets
```

## 📜 Smart Contract

### WalletVerification.sol

**Key Functions**:

- `setHash(address walletAddress, string memory ipfsHash)`: Store IPFS hash for a wallet
- `getHash(address walletAddress)`: Retrieve IPFS hash for a wallet
- `hasHash(address walletAddress)`: Check if wallet has a hash stored

**Events**:

- `HashStored(address indexed walletAddress, string ipfsHash, uint256 timestamp)`
- `HashUpdated(address indexed walletAddress, string oldHash, string newHash, uint256 timestamp)`

**Deployed on**: Polygon Amoy Testnet (Chain ID: 80002)

View your contract on [PolygonScan Amoy](https://amoy.polygonscan.com/)

## 🔧 Troubleshooting

### MetaMask Issues

**Problem**: MetaMask not detected
```
Solution: Ensure MetaMask extension is installed and enabled
```

**Problem**: Wrong network
```
Solution: Switch to Polygon Amoy testnet in MetaMask
Network Name: Polygon Amoy
RPC URL: https://rpc-amoy.polygon.technology/
Chain ID: 80002
Currency Symbol: MATIC
```

### IPFS Upload Fails

**Problem**: IPFS upload timeout
```
Solution: Check your internet connection or try alternative IPFS gateways
Update ipfsClient configuration in RegistrationForm.js
```

### Contract Interaction Fails

**Problem**: Transaction reverts
```
Solution: 
1. Ensure you have sufficient MATIC for gas
2. Check CONTRACT_ADDRESS is correctly set
3. Verify you're on the correct network
```

### MongoDB Connection Issues

**Problem**: Cannot connect to MongoDB
```
Solution:
1. Check MONGODB_URI is correct
2. Ensure IP whitelist in MongoDB Atlas includes your IP
3. Verify network connectivity
```

## 🧪 Testing

### Get Testnet Tokens

1. Visit [Polygon Faucet](https://faucet.polygon.technology/)
2. Select "Polygon Amoy"
3. Enter your wallet address
4. Receive test MATIC tokens

### Test the Flow

1. Register a new wallet
2. Check IPFS hash on `ipfs.io/ipfs/YOUR_HASH`
3. View transaction on PolygonScan
4. Login as admin and verify the wallet
5. Check MongoDB for updated auth status

## 🔒 Security Considerations

- Never commit `.env` files or private keys
- Use environment variables for all sensitive data
- Implement proper authentication (JWT) in production
- Add rate limiting to API endpoints
- Validate all user inputs
- Use HTTPS in production
- Regularly update dependencies

## 🚀 Production Deployment

### Backend (Heroku, Railway, or similar)
1. Set all environment variables
2. Deploy backend with `npm start`

### Frontend (Vercel, Netlify, or similar)
1. Build: `npm run build`
2. Deploy `build` folder
3. Set environment variables

### Smart Contract
- Already deployed on Polygon Amoy
- For mainnet, deploy to Polygon PoS

## 📝 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using React, Solidity, IPFS, and MongoDB**







