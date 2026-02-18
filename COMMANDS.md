# Commands Reference - Lost & Found Application

## 🔧 Setup Commands

### Backend Setup
```bash
cd /Users/tenzindargyal/lostfound/server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### Frontend Setup
```bash
cd /Users/tenzindargyal/lostfound/client
npm install
cp .env.example .env
# Edit .env with your API URL
```

---

## ▶️ Running Commands

### Start Backend (Development)
```bash
cd server
npm run dev
```
Runs on: http://localhost:5000

### Start Backend (Production)
```bash
cd server
npm start
```

### Start Frontend (Development)
```bash
cd client
npm run dev
```
Runs on: http://localhost:3000

### Build Frontend (Production)
```bash
cd client
npm run build
```
Output: `client/dist`

---

## 🧹 Cleaning Commands

### Remove Dependencies
```bash
# Backend
cd server
rm -rf node_modules package-lock.json
npm install

# Frontend
cd client
rm -rf node_modules package-lock.json
npm install
```

### Clear Build
```bash
cd client
rm -rf dist
npm run build
```

---

## 🐙 Git Commands

### Initialize Repository
```bash
cd /Users/tenzindargyal/lostfound

# Initialize git
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

### Update Repository
```bash
# Make changes
# Commit
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

---

## 📦 Dependency Commands

### Add Package to Backend
```bash
cd server
npm install package-name
```

### Add Package to Frontend
```bash
cd client
npm install package-name
```

### Update Dependencies
```bash
# Backend
cd server
npm update

# Frontend
cd client
npm update
```

### Check for Vulnerabilities
```bash
# Backend
cd server
npm audit

# Frontend
cd client
npm audit
```

---

## 🧪 Testing Commands

### Verify Backend
```bash
# Check if backend starts
cd server
npm start

# Test API endpoint
curl http://localhost:5000/api/health
```

### Verify Frontend Build
```bash
cd client
npm run build

# Check if dist folder created
ls -la dist
```

---

## 🔒 Environment & Security

### Generate JWT Secret
```bash
# Generate random string (Mac/Linux)
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Test MongoDB Connection
```bash
# In Node.js
node
```
```javascript
const mongoose = require('mongoose');
mongoose.connect('your_mongodb_uri');
// Should connect without error
```

---

## 📊 Database Commands (MongoDB CLI)

### Connect to MongoDB
```bash
# Install MongoDB CLI tools first
brew install mongodb-database-tools  # Mac
# or apt install mongodb-mongosh     # Linux

# Connect
mongosh "mongodb+srv://username:password@cluster.mongodb.net/lostfound"
```

### Common Database Queries
```javascript
// List all items
db.items.find()

// Count items
db.items.countDocuments()

// Find lost items
db.items.find({ type: "Lost" })

// Delete all items (be careful!)
db.items.deleteMany({})

// Update item status
db.items.updateOne({ _id: ObjectId("...") }, { $set: { status: "Claimed" } })
```

---

## 🚀 Deployment Commands (Render)

### Trigger Manual Deploy
```bash
# Just push to main branch
git push origin main

# Or manually trigger on Render dashboard
```

### Check Deployment Status
```bash
# View logs on Render dashboard
# Or use Render CLI if installed:
render logs --service-id=your_service_id
```

---

## 🐛 Debugging Commands

### Check Node Version
```bash
node --version
npm --version
```

### Check Ports
```bash
# Mac/Linux
lsof -i :5000    # Backend
lsof -i :3000    # Frontend
lsof -i :27017   # MongoDB (local)
```

### View Logs
```bash
# Terminal history
history | grep npm

# Check package.json scripts
cd server && cat package.json | grep scripts
```

### Clear Cache
```bash
# npm cache
npm cache clean --force

# Browser cache
# Chrome: DevTools → Application → Clear site data
```

---

## 💾 Backup Commands

### Backup Project
```bash
# Create backup
tar -czf lostfound-backup.tar.gz /Users/tenzindargyal/lostfound

# Restore backup
tar -xzf lostfound-backup.tar.gz
```

### Backup Database
```bash
# MongoDB Atlas handles backups automatically
# But you can export data:
mongoexport --uri="mongodb+srv://..." --collection items --out items.json
```

---

## 🔍 Useful Development Commands

### Format Code (if eslint configured)
```bash
# Backend
cd server
npm run lint

# Frontend
cd client
npm run lint
```

### Run in Production Mode Locally
```bash
# Build
cd client
npm run build

# Serve
npx serve dist

# Backend
NODE_ENV=production npm start
```

### API Testing (if curl available)
```bash
# Health check
curl http://localhost:5000/api/health

# Get all items
curl http://localhost:5000/api/items

# With token
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/users/profile
```

---

## 📝 File Editing Commands

### Edit Environment Files
```bash
# Backend
nano server/.env

# Frontend
nano client/.env

# Exit nano: Ctrl+X, then Y, then Enter
```

### View Files
```bash
# Backend structure
tree server

# Frontend structure
tree client
```

---

## 🆚 Git Useful Commands

### View Changes
```bash
# See uncommitted changes
git status

# See differences
git diff

# See commit history
git log
```

### Undo Changes
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Restore specific file
git restore filename
```

---

## 🌐 API Testing Tools

### Using curl
```bash
# GET request
curl http://localhost:5000/api/items

# POST request
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123","phone":"123456"}'

# With authorization
curl -H "Authorization: Bearer TOKEN" http://localhost:5000/api/users/profile
```

### Using Postman
1. Download from https://www.postman.com
2. Import API endpoints
3. Test each route
4. Save collection

### Using VS Code REST Client
Create `requests.rest` file:
```
### Get all items
GET http://localhost:5000/api/items

### Login
POST http://localhost:5000/api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

---

## ⚠️ Important Notes

1. **Never commit `.env` files** - use `.env.example` instead
2. **Keep dependencies updated** - security patches
3. **Test locally first** - before pushing to GitHub
4. **Use strong JWT secrets** - at least 32 characters
5. **Backup MongoDB** - use Atlas backup feature
6. **Monitor Render usage** - free tier has limits

---

## 🆘 Quick Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 PID
```

### npm install Fails
```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### MongoDB Connection Error
```bash
# Check URI format
# Check IP whitelist in MongoDB Atlas
# Test locally with mongosh
```

### Frontend Can't Connect
```bash
# Check VITE_API_URL
# Verify backend is running
# Check browser console for CORS errors
```

---

## 📚 More Help

- Read README.md for overview
- Check QUICK_START.md for setup
- See DEPLOYMENT_GUIDE.md for deployment
- Visit backend/README.md for API details
- Check client/README.md for frontend details

---

**Last Updated**: February 2026
