# 🚀 Render Deployment Guide

Since Railway's free tier is limited, we'll use **Render** which offers a generous free tier with full WebSocket support.

## 🌐 Render Setup

### 1. Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub (recommended)

### 2. Deploy Your Backend

1. **Click "New +" → "Web Service"**
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Name:** `whiteboard-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`

### 3. Environment Variables
Render will automatically set:
- `PORT` (Render assigns this)
- `NODE_ENV=production`

### 4. Deploy
- Click "Create Web Service"
- Render will automatically deploy your app
- Wait for the build to complete

## 🔧 Alternative: Railway Pro Plan

If you prefer Railway, you can:
1. Upgrade to Railway Pro ($5/month)
2. Run: `railway up` to deploy

## 💰 Cost Comparison

| Platform | Plan | Cost | WebSocket Support |
|----------|------|------|-------------------|
| **Render** | Free | $0/month | ✅ Full Support |
| **Railway** | Pro | $5/month | ✅ Full Support |
| **Heroku** | Basic | $7/month | ✅ Full Support |
| **Heroku** | Eco | $5/month | ✅ Full Support |

## 🎯 Recommendation

**Use Render** - it's completely free and supports everything your whiteboard app needs!

## 📱 After Deployment

1. Render will give you a URL like: `https://your-app.onrender.com`
2. Update your frontend to use this new backend URL
3. Test your whiteboard functionality

## 🆘 Need Help?

- Render Docs: [docs.render.com](https://docs.render.com)
- Render Community: [community.render.com](https://community.render.com)
