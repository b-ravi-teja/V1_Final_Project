# 🚂 Railway Deployment Steps

Since Railway CLI requires interactive prompts, please follow these steps in the Railway dashboard:

## Step 1: Create/Select Service

1. Go to [railway.app](https://railway.app) and open your project "Major Project"
2. Click "New Service" or select an existing service
3. Choose "GitHub Repo" and select your repository
4. Railway will auto-detect it's a Node.js project

## Step 2: Set Environment Variables

In the Railway service dashboard, go to "Variables" tab and add:

```
MONGODB_URI=mongodb+srv://your-username:password@cluster.mongodb.net/
CONTRACT_ADDRESS=0x7261a6BB2B939Fa24710a5237d0dcd00f3f7d43A
POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
PORT=5000
ADMIN_USERNAME=block_test
ADMIN_PASSWORD=block
NODE_ENV=production
```

⚠️ **Important**: Replace `MONGODB_URI` with your actual MongoDB connection string!

## Step 3: Configure Service Settings

1. Go to "Settings" tab
2. Set **Start Command**: `npm start`
3. Set **Root Directory**: (leave empty, it's at root)
4. Railway will auto-detect the build

## Step 4: Deploy

1. Railway will automatically deploy when you push to GitHub
2. Or click "Deploy" button
3. Wait for deployment to complete
4. Copy the generated URL (e.g., `https://your-app.up.railway.app`)

## Step 5: Get Your Backend URL

Once deployed, Railway will provide a URL like:
- `https://your-app-name.up.railway.app`

**Save this URL** - you'll need it for Vercel deployment!

---

After you get the Railway URL, let me know and I'll help deploy the frontend to Vercel! 🚀

