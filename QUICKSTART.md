# ⚡ Quick Start Guide

Get up and running in 5 minutes!

## 🎯 Prerequisites

- Node.js installed
- MetaMask installed
- MongoDB Atlas account (free tier)

## 🚀 Setup Steps

### 1. Install All Dependencies

```bash
# Root and backend
npm install

# Frontend
cd frontend && npm install && cd ..

# Smart contracts
cd contracts && npm install && cd ..
```

### 2. Configure Environment

Create `.env` in root directory:

```env
# Required - Get from MongoDB Atlas
MONGODB_URI=mongodb+srv://ravibalguri9:YOUR_PASSWORD@cluster0.ce9z6rv.mongodb.net/

# Required - Polygon Amoy RPC
POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology/

# Will add after deploying contract
CONTRACT_ADDRESS=0x...

# Server config
PORT=5000

# Admin credentials
ADMIN_USERNAME=block_test
ADMIN_PASSWORD=block

# For contract deployment only
PRIVATE_KEY=your_metamask_private_key
```

### 3. Deploy Smart Contract

```bash
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network polygonAmoy
```

Copy the deployed contract address and update:
- `.env` → `CONTRACT_ADDRESS=0x...`
- `frontend/.env` → `REACT_APP_CONTRACT_ADDRESS=0x...`

### 4. Start Backend

```bash
# From root directory
npm run dev
```

Backend runs on `http://localhost:5000`

### 5. Start Frontend

```bash
# In a new terminal
cd frontend
npm start
```

Frontend opens at `http://localhost:3000`

## ✅ Test It Out

1. **Connect MetaMask**
   - Open http://localhost:3000
   - Click "Connect Wallet"
   - Approve in MetaMask

2. **Register**
   - Fill in the form
   - Submit and approve transaction
   - Wait for success message

3. **Verify (Admin)**
   - Click "Admin Panel"
   - Login: `block_test` / `block`
   - Enter wallet address
   - Click "Verify Wallet"

## 🎉 You're Done!

Your dApp is now running locally.

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for production deployment
- Customize the UI and add features

## ⚠️ Common Issues

**MetaMask Not Detected?**
- Install MetaMask extension
- Refresh the page

**Transaction Fails?**
- Get test MATIC: https://faucet.polygon.technology/
- Switch to Polygon Amoy network

**MongoDB Connection Error?**
- Check MONGODB_URI is correct
- Whitelist your IP in MongoDB Atlas

**Contract Not Deployed?**
- Ensure you have test MATIC
- Check PRIVATE_KEY in .env
- Verify network is Polygon Amoy

---

Need help? Check the full README.md or open an issue!







