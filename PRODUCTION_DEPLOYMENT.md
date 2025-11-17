# 🌐 Production Deployment Guide

This guide will help you deploy your Blockchain Wallet Verification System to the internet.

## 📋 Prerequisites

- [ ] GitHub account
- [ ] Railway/Render account (for backend)
- [ ] Vercel account (for frontend)
- [ ] MongoDB Atlas account
- [ ] Smart contract deployed (✅ Already done: `0x7261a6BB2B939Fa24710a5237d0dcd00f3f7d43A`)

## 🚀 Deployment Steps

### Step 1: Push Code to GitHub

```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### Step 2: Deploy Backend to Railway

1. **Sign up/Login to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Environment Variables**
   In Railway dashboard, add these environment variables:
   ```
   MONGODB_URI=mongodb+srv://your-username:password@cluster.mongodb.net/
   CONTRACT_ADDRESS=0x7261a6BB2B939Fa24710a5237d0dcd00f3f7d43A
   POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
   PORT=5000
   ADMIN_USERNAME=block_test
   ADMIN_PASSWORD=block
   NODE_ENV=production
   ```

4. **Deploy**
   - Railway will automatically detect the project
   - It will build and deploy
   - Note the generated URL (e.g., `https://your-app.railway.app`)

### Alternative: Deploy Backend to Render

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Settings**
   - **Name**: `wallet-verification-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Add Environment Variables**
   Same as Railway above

5. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy
   - Note the URL (e.g., `https://wallet-verification-backend.onrender.com`)

### Step 3: Deploy Frontend to Vercel

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project**
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

4. **Add Environment Variables**
   ```
   REACT_APP_CONTRACT_ADDRESS=0x7261a6BB2B939Fa24710a5237d0dcd00f3f7d43A
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```
   ⚠️ **Important**: Replace `your-backend-url.railway.app` with your actual backend URL from Step 2

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy
   - Note the URL (e.g., `https://your-app.vercel.app`)

### Step 4: Update CORS in Backend (if needed)

If you encounter CORS errors, update `backend/server.js`:

```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

Then redeploy the backend.

## ✅ Verification

After deployment, verify:

1. **Backend Health Check**
   - Visit: `https://your-backend-url.railway.app/health`
   - Should return: `{"status":"Server is running",...}`

2. **Frontend**
   - Visit your Vercel URL
   - Should load the application
   - Try connecting MetaMask
   - Test registration flow

3. **End-to-End Test**
   - Connect wallet
   - Register a user
   - Verify in admin panel

## 🔧 Troubleshooting

### CORS Errors
- Make sure `REACT_APP_API_URL` is set correctly in Vercel
- Update backend CORS settings to include your frontend URL

### MongoDB Connection Issues
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0` (for all IPs)
- Check connection string is correct

### Environment Variables Not Working
- In Vercel: Make sure variables start with `REACT_APP_`
- Redeploy after adding new environment variables

### Build Failures
- Check build logs in deployment platform
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

## 📝 Environment Variables Summary

### Backend (Railway/Render)
```
MONGODB_URI=mongodb+srv://...
CONTRACT_ADDRESS=0x7261a6BB2B939Fa24710a5237d0dcd00f3f7d43A
POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
PORT=5000
ADMIN_USERNAME=block_test
ADMIN_PASSWORD=block
NODE_ENV=production
```

### Frontend (Vercel)
```
REACT_APP_CONTRACT_ADDRESS=0x7261a6BB2B939Fa24710a5237d0dcd00f3f7d43A
REACT_APP_API_URL=https://your-backend-url.railway.app
```

## 🎉 Success!

Your application is now live on the internet! Share your Vercel URL with users.

---

**Need Help?** Check the main README.md or open an issue.

