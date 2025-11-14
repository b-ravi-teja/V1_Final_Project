# 🚀 Deployment Guide

Step-by-step guide to deploy your Blockchain Wallet Verification System.

## 📋 Pre-Deployment Checklist

- [ ] Node.js installed (v16+)
- [ ] MetaMask installed with Polygon Amoy testnet configured
- [ ] MongoDB Atlas account created
- [ ] Test MATIC tokens obtained
- [ ] Private key saved securely (never commit!)

## 1️⃣ MongoDB Setup

### Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for testing)
5. Get your connection string:
   ```
   mongodb+srv://ravibalguri9:YOUR_PASSWORD@cluster0.ce9z6rv.mongodb.net/
   ```

### Update Configuration

Add to your `.env` file:
```env
MONGODB_URI=mongodb+srv://ravibalguri9:YOUR_PASSWORD@cluster0.ce9z6rv.mongodb.net/
```

## 2️⃣ Configure Polygon Amoy Testnet

### Add Network to MetaMask

1. Open MetaMask
2. Click network dropdown → "Add Network"
3. Enter details:
   - **Network Name**: Polygon Amoy
   - **RPC URL**: `https://rpc-amoy.polygon.technology/`
   - **Chain ID**: `80002`
   - **Currency Symbol**: `MATIC`
   - **Block Explorer**: `https://amoy.polygonscan.com/`

### Get Test Tokens

1. Visit [Polygon Faucet](https://faucet.polygon.technology/)
2. Select "Polygon Amoy"
3. Paste your wallet address
4. Click "Submit"
5. Wait for tokens (usually instant)

## 3️⃣ Deploy Smart Contract

### Install Dependencies

```bash
cd contracts
npm install
```

### Configure Deployment

Add to root `.env` file:
```env
PRIVATE_KEY=your_metamask_private_key_here
POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
```

⚠️ **Get Private Key**:
1. Open MetaMask
2. Click account menu → Account details
3. Click "Show private key"
4. Enter password
5. Copy private key

### Compile Contract

```bash
npx hardhat compile
```

### Deploy to Polygon Amoy

```bash
npx hardhat run scripts/deploy.js --network polygonAmoy
```

**Expected Output**:
```
🚀 Deploying WalletVerification contract to Polygon Amoy...
✅ WalletVerification deployed to: 0x1234567890abcdef...
📝 Update your .env file with:
CONTRACT_ADDRESS=0x1234567890abcdef...
```

### Update Environment Variables

1. Copy the contract address from output
2. Add to root `.env`:
   ```env
   CONTRACT_ADDRESS=0x1234567890abcdef...
   ```
3. Add to `frontend/.env`:
   ```env
   REACT_APP_CONTRACT_ADDRESS=0x1234567890abcdef...
   ```

### Verify Deployment

Visit: `https://amoy.polygonscan.com/address/YOUR_CONTRACT_ADDRESS`

## 4️⃣ Start Backend Server

### Install Dependencies

```bash
cd ..  # Back to root directory
npm install
```

### Configure Environment

Ensure your `.env` has all required values:
```env
MONGODB_URI=mongodb+srv://...
POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
CONTRACT_ADDRESS=0x...
PORT=5000
ADMIN_USERNAME=block_test
ADMIN_PASSWORD=block
```

### Start Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

**Verify Backend**:
- Visit: `http://localhost:5000/health`
- Should return: `{"status": "Server is running", "timestamp": "..."}`

## 5️⃣ Start Frontend Application

### Install Dependencies

```bash
cd frontend
npm install
```

### Configure Environment

Create `frontend/.env`:
```env
REACT_APP_CONTRACT_ADDRESS=0x1234567890abcdef...
```

### Start Development Server

```bash
npm start
```

Frontend will open at: `http://localhost:3000`

## 6️⃣ Test the Application

### Test User Registration

1. Open `http://localhost:3000`
2. Click "Connect Wallet (MetaMask)"
3. Approve connection in MetaMask
4. Fill in the form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Aadhaar: "123456789012"
5. Click "Submit Registration"
6. Approve transaction in MetaMask
7. Wait for success message

### Test Admin Verification

1. Click "Admin Panel" tab
2. Login with:
   - Username: `block_test`
   - Password: `block`
3. Enter the wallet address you just registered
4. Click "Verify Wallet"
5. Should show "✅ Wallet verified successfully!"

## 7️⃣ Production Deployment (Optional)

### Deploy Backend (Railway/Heroku)

**Railway**:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables in Railway dashboard
# Deploy
railway up
```

**Heroku**:
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=...
heroku config:set CONTRACT_ADDRESS=...
# ... set all other env vars

# Deploy
git push heroku main
```

### Deploy Frontend (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Build frontend
cd frontend
npm run build

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
```

Update frontend to point to production backend URL.

## 🔍 Verification Checklist

After deployment, verify:

- [ ] MongoDB connection successful (check backend logs)
- [ ] Contract deployed on Polygon Amoy
- [ ] Frontend can connect to MetaMask
- [ ] User registration works end-to-end
- [ ] IPFS upload successful
- [ ] Blockchain transaction confirmed
- [ ] Data saved in MongoDB
- [ ] Admin login works
- [ ] Wallet verification works
- [ ] All wallets display in admin panel

## 🐛 Common Issues

### Issue: "Transaction Reverted"

**Solutions**:
- Check you have enough MATIC for gas
- Verify contract address is correct
- Ensure you're on Polygon Amoy network

### Issue: "Cannot connect to MongoDB"

**Solutions**:
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure no firewall blocking connection

### Issue: "MetaMask not detected"

**Solutions**:
- Install MetaMask extension
- Refresh the page
- Check browser console for errors

### Issue: "IPFS upload fails"

**Solutions**:
- Check internet connection
- Try alternative IPFS gateway
- Verify ipfs-http-client configuration

## 📊 Monitoring

### Check Backend Health

```bash
curl http://localhost:5000/health
```

### Check MongoDB Connection

```bash
# In backend console, you should see:
✅ Connected to MongoDB
```

### Check Smart Contract

Visit: `https://amoy.polygonscan.com/address/YOUR_CONTRACT_ADDRESS`

- View transactions
- Check contract interactions
- Verify events emitted

## 🔄 Updates & Maintenance

### Update Contract

If you need to redeploy the contract:
```bash
cd contracts
npx hardhat run scripts/deploy.js --network polygonAmoy
# Update CONTRACT_ADDRESS in both .env files
```

### Update Frontend

```bash
cd frontend
npm run build
# Deploy new build to hosting service
```

### Update Backend

```bash
git pull
npm install
npm start
# Or use your platform's deployment method
```

## 📝 Environment Variables Summary

### Root `.env`
```env
MONGODB_URI=mongodb+srv://...
POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
CONTRACT_ADDRESS=0x...
PORT=5000
ADMIN_USERNAME=block_test
ADMIN_PASSWORD=block
PRIVATE_KEY=your_private_key  # Only for deployment
```

### `frontend/.env`
```env
REACT_APP_CONTRACT_ADDRESS=0x...
```

---

**✅ Deployment Complete!**

Your Blockchain Wallet Verification System is now live and ready to use.

For support, refer to the main README.md or open an issue.







