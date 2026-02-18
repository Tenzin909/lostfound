# Complete Deployment Guide - Render

## 📋 Pre-Deployment Checklist

- [ ] GitHub account
- [ ] GitHub repository with code pushed
- [ ] Render account (https://render.com)
- [ ] MongoDB Atlas account
- [ ] MongoDB cluster created
- [ ] Database user created with credentials

---

## 🗄️ MongoDB Atlas Setup (5 minutes)

### Create MongoDB Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign in or create account
3. Click "Create a Deployment"
4. Choose **M0 (Free)** tier
5. Select cloud provider and region
6. Click "Create Deployment"

### Create Database User

1. In cluster view, go to "Security" → "Database Access"
2. Click "Add New Database User"
3. Enter username and auto-generate password
4. Copy the password somewhere safe
5. Click "Add User"

### Get Connection String

1. Go to "Deployment" → "Databases"
2. Click "Connect" on your cluster
3. Select "Drivers"
4. Copy connection string (select Node.js)
5. Replace `<password>` with your password
6. Replace `myFirstDatabase` with `lostfound`

Example: `mongodb+srv://user:password@cluster0.abc123.mongodb.net/lostfound?retryWrites=true&w=majority`

### Allow IP Access

1. Go to "Security" → "Network Access"
2. Click "Add IP Address"
3. Select "Allow access from anywhere" → 0.0.0.0/0 (for development)
4. For production, add specific Render IPs
5. Click "Confirm"

---

## 🔧 GitHub Setup

### Push Code to GitHub

```bash
cd /Users/tenzindargyal/lostfound

# Initialize git if needed
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Lost and Found app"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/lostfound.git

# Push
git branch -M main
git push -u origin main
```

---

## 🚀 Deploy Backend to Render

### Step 1: Create Web Service

1. Go to https://render.com/dashboard
2. Click "New +" button
3. Select "Web Service"
4. Click "Connect Account" and authorize GitHub
5. Find and select your `lostfound` repository

### Step 2: Configure Backend

Fill in the form:

| Field | Value |
|-------|-------|
| **Name** | `lost-found-api` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

### Step 3: Set Environment Variables

Click "Advanced" then "Add Environment Variable":

```
MONGODB_URI: mongodb+srv://username:password@cluster.mongodb.net/lostfound?retryWrites=true&w=majority
JWT_SECRET: use-a-strong-random-string-here
NODE_ENV: production
PORT: 5000
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Watch the build logs
3. Once complete (green checkmark), get the URL

**Save this URL** - you'll need it for frontend: `https://lost-found-api.onrender.com`

---

## 🎨 Deploy Frontend to Render

### Step 1: Create Static Site

1. Go to https://render.com/dashboard
2. Click "New +"
3. Select "Static Site"
4. Select the same GitHub repository

### Step 2: Configure Frontend

Fill in the form:

| Field | Value |
|-------|-------|
| **Name** | `lost-found-app` |
| **Build Command** | `cd client && npm install && npm run build` |
| **Publish Directory** | `client/dist` |

### Step 3: Set Environment Variables

Click "Advanced" then "Add Environment Variable":

```
VITE_API_URL: https://lost-found-api.onrender.com/api
```

(Replace with your actual backend URL from Step 4 above)

### Step 4: Deploy

1. Click "Create Static Site"
2. Wait for build to complete
3. Once done, get your frontend URL: `https://lost-found-app.onrender.com`

---

## ✅ Test Your Deployment

1. Go to your frontend URL
2. Click "Register"
3. Create an account
4. Post a test item
5. View the item
6. Test filters and search

---

## 📝 Updating Your Application

### To deploy new changes:

```bash
# Make changes to code
# Test locally first

# Commit changes
git add .
git commit -m "Description of changes"
git push origin main
```

**Render automatically redeploys** when you push to the main branch!

---

## 🔒 Security Best Practices

1. **JWT_SECRET**: Use a strong random string (min 32 characters)
   ```bash
   # Generate one:
   openssl rand -base64 32
   ```

2. **Environment Variables**: Never commit `.env` files
3. **MongoDB IP**: For production, replace 0.0.0.0/0 with specific IPs
4. **CORS**: Backend is configured for all origins (update in production)
5. **HTTPS**: Render provides free SSL/TLS

---

## 🐛 Troubleshooting

### Backend Build Fails

**Check:**
- Repository structure matches expected layout
- All dependencies in server/package.json
- No syntax errors in server.js

**Fix:**
- Check Render build logs
- Run locally: `cd server && npm install && npm start`
- Push fixes and redeploy

### Frontend Build Fails

**Check:**
- Vite config is correct
- All dependencies in client/package.json
- No missing environment variables

**Fix:**
- Check logs for specific errors
- Build locally: `cd client && npm run build`
- Push fixes and redeploy

### API Connection Issues

**Common causes:**
- VITE_API_URL is incorrect
- Backend not running/deployed
- CORS not configured

**Fix:**
1. Check VITE_API_URL matches backend URL
2. Verify backend is deployed and running
3. Check browser console for errors
4. Backend CORS is set to allow all origins

### Slow Performance

**On free tier:**
- Services spin down after 15 minutes
- First request takes ~30 seconds to wake up
- Upgrade to paid plan for better performance

---

## 💾 Database Backups

MongoDB Atlas Free tier includes:
- Daily backups (7-day retention)
- Manual backups
- Point-in-time restore

To backup:
1. Go to MongoDB Atlas
2. Select cluster
3. Go to "Backup"
4. Click "Take a Snapshot" for instant backup

---

## 📊 Monitoring

### Render Dashboard

- View deployment logs
- Check build history
- Monitor resource usage
- Manual deploy/redeploy

### MongoDB Atlas

- View database metrics
- Monitor connection usage
- Check storage usage
- View query performance

---

## 🆘 Getting Help

### If deployment fails:

1. **Check Render logs** (click service → Logs)
2. **Check MongoDB connection** (test in VS Code)
3. **Verify environment variables** are set correctly
4. **Check GitHub repository** has all files

### Common Errors:

| Error | Solution |
|-------|----------|
| `Cannot find module` | Run `npm install` |
| `MongoNetworkError` | Check MongoDB URI and IP whitelist |
| `ECONNREFUSED` | Backend not running/deployed |
| `404 Not Found` | Check API routes and URLs |
| `Build failed` | Check build logs, syntax errors |

---

## 🎉 You're Live!

Your Lost & Found app is now:
- ✅ Deployed on Render
- ✅ Connected to MongoDB Atlas
- ✅ Accessible 24/7
- ✅ Auto-updating on push

**Frontend URL**: https://your-app.onrender.com
**Backend URL**: https://your-api.onrender.com

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Vite Guide](https://vitejs.dev)
- [Express Docs](https://expressjs.com)

---

## 🔄 Production Recommendations

For production deployment:
1. Use custom domain
2. Set up analytics
3. Enable auto-scaling
4. Set specific MongoDB IP whitelist
5. Use strong environment variables
6. Enable CORS restrictions
7. Set up monitoring/alerts
8. Regular database backups
9. Load testing before launch
10. Security audit of code

---

**Created**: February 2026
**Version**: 1.0.0
