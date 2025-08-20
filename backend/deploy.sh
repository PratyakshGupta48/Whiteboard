#!/bin/bash

echo "🚂 Deploying Whiteboard Backend to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Check if user is logged in
if ! railway whoami &> /dev/null; then
    echo "🔐 Please login to Railway..."
    railway login
fi

# Deploy to Railway
echo "📦 Deploying to Railway..."
railway up

# Show deployment status
echo "📊 Deployment Status:"
railway status

echo "✅ Deployment complete!"
echo "🌐 Your backend URL will be shown above"
echo "💡 Run 'railway logs' to see deployment logs"
