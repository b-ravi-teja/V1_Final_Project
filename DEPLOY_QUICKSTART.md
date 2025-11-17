# ⚡ Quick Deploy to Internet

Follow these steps to deploy your app to the internet in 10 minutes!

## 🎯 Quick Steps

### 1. Push to GitHub (if not already)
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

### 2. Deploy Backend (Choose one)

#### Option A: Railway (Recommended - Easiest)
1. Go to [railway.app](https://railway.app) → Sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repo
4. Add environment variables:
   - `MONGODB_URI` = your MongoDB connection string
   - `CONTRACT_ADDRESS` = `0x7261a6BB2B939Fa24710a5237d0dcd00f3f7d43A`
   - `POLYGON_AMOY_RPC_URL` = `https://rpc-amoy.polygon.technology/`
   - `PORT` = `5000`
   - `ADMIN_USERNAME` = `block_test`
   - `ADMIN_PASSWORD` = `block`
5. Wait for deployment → Copy the URL (e.g., `https://xxx.railway.app`)

#### Option B: Render
1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect your repo
4. Settings:
   - Build: `npm install`
   - Start: `npm start`
5. Add same environment variables as above
6. Deploy → Copy URL

### 3. Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click "Add New..." → "Project"
3. Import your GitHub repo
4. Configure:
   - **Root Directory**: `frontend`
   - **Framework**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variables:
   - `REACT_APP_CONTRACT_ADDRESS` = `0x7261a6BB2B939Fa24710a5237d0dcd00f3f7d43A`
   - `REACT_APP_API_URL` = `https://your-backend-url.railway.app` (from step 2)
6. Click "Deploy"
7. Copy your Vercel URL (e.g., `https://xxx.vercel.app`)

### 4. Test Your Live App! 🎉

Visit your Vercel URL and test:
- ✅ Connect MetaMask
- ✅ Register a user
- ✅ Admin login
- ✅ Verify wallet

## 🔗 Your Live URLs

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`
- **Contract**: `0x7261a6BB2B939Fa24710a5237d0dcd00f3f7d43A` on Polygon Amoy

## ❓ Need Help?

See `PRODUCTION_DEPLOYMENT.md` for detailed instructions.

