# Lost & Found - Render Deployment Guide

## Prerequisites
- GitHub account with repository
- Render account (https://render.com)
- MongoDB Atlas account

## Step 1: MongoDB Atlas Setup

1. Visit https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new Cluster (M0 Free tier is fine)
4. Create a database user with username and password
5. Get the connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string: `mongodb+srv://username:password@cluster.mongodb.net/lostfound?retryWrites=true&w=majority`
6. Add IP 0.0.0.0/0 to Network Access (for development)

## Step 2: Deploy Backend to Render

1. Go to https://render.com/dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository
5. Configure:
   - **Name**: `lost-found-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (if available)

6. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lostfound?retryWrites=true&w=majority
   JWT_SECRET=your-secret-key-here
   NODE_ENV=production
   ```

7. Click "Create Web Service"
8. Wait for deployment (check logs)
9. Copy the URL (e.g., https://lost-found-api.onrender.com)

## Step 3: Deploy Frontend to Render

1. On Render dashboard, click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `lost-found-app`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/dist`

4. Add Environment Variables:
   ```
   VITE_API_URL=https://lost-found-api.onrender.com/api
   ```
   (Replace with your actual backend URL)

5. Click "Create Static Site"
6. Wait for deployment
7. Once done, you'll get a URL like https://lost-found-app.onrender.com

## Step 4: Update API URL (if needed)

After frontend deployment:
1. Add environment variable to frontend:
   - Go to Static site settings
   - Add `VITE_API_URL=https://your-api-url.onrender.com/api`
   - Trigger a redeploy

## Step 5: Test the Application

1. Visit your frontend URL
2. Register a new account
3. Post a test item
4. Verify it appears in the list

## Troubleshooting

### Build fails on Render
- Check build logs in Render dashboard
- Ensure `package.json` is in correct directories
- Verify all dependencies are listed

### API connection issues
- Check CORS settings in backend
- Verify VITE_API_URL is correct
- Check MongoDB connection string

### Database connection fails
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas (0.0.0.0/0)
- Ensure database user credentials are correct

## MongoDB Atlas IP Whitelist

For production, replace 0.0.0.0/0 with specific Render IPs:
1. Try deployment first with 0.0.0.0/0
2. Check Render IP from logs if needed
3. Update MongoDB Atlas Network Access with specific IP

## Auto-deployments

Render automatically deploys when you push to the connected GitHub branch (usually `main`).

To disable:
- Go to service settings
- Disable "Auto-Deploy"

## Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- Limited compute resources
- Email support

For production, upgrade to paid plans.

## Important Notes

1. Change `JWT_SECRET` to a strong value
2. Never commit `.env` files to GitHub
3. Render environment variables are secure and encrypted
4. Monitor your MongoDB Atlas usage (free tier limits)
5. Keep dependencies updated for security

## Redeploying

To redeploy:
1. Make changes to code
2. Push to GitHub
3. Render automatically redeploys

Or manually redeploy:
1. Go to service dashboard
2. Click "Manual Deploy" → "Deploy latest commit"
