# 🚀 E-Commerce Deployment Guide

## 📋 Prerequisites

Before deploying, make sure you have:
- [ ] GitHub account
- [ ] MongoDB Atlas account (free tier)
- [ ] Cloudinary account (free tier)
- [ ] Vercel account (free tier)
- [ ] Railway account (free tier)

---

## 🔧 Step 1: Database Setup (MongoDB Atlas)

### 1.1 Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Choose your preferred region
5. Click "Create Cluster"

### 1.2 Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Select "Read and write to any database"
5. Click "Add User"

### 1.3 Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for deployment)
4. Click "Confirm"

### 1.4 Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `luxury-ecommerce`

---

## ☁️ Step 2: Image Storage Setup (Cloudinary)

### 2.1 Create Cloudinary Account
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Go to your Dashboard

### 2.2 Get Credentials
1. Copy your "Cloud name"
2. Copy your "API Key"
3. Copy your "API Secret"

---

## 🔐 Step 3: Environment Variables Setup

### 3.1 Backend Environment Variables
Create a `.env` file in the `backend` folder with:

```env
# Database
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/luxury-ecommerce

# Server
PORT=3002
NODE_ENV=production

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Secret (generate a secure random string)
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Frontend URL (will be updated after frontend deployment)
FRONTEND_URL=https://your-frontend.vercel.app
```

### 3.2 Generate JWT Secret
Run this command to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 🚀 Step 4: Backend Deployment (Railway)

### 4.1 Prepare Backend for Railway
1. Make sure your backend code is committed to GitHub
2. Ensure `railway.json` exists in the backend folder

### 4.2 Deploy to Railway
1. Go to [Railway](https://railway.app/)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Set the root directory to `backend`
7. Click "Deploy"

### 4.3 Configure Environment Variables in Railway
1. Go to your project in Railway
2. Click on "Variables" tab
3. Add all environment variables from your `.env` file
4. Click "Save"

### 4.4 Get Backend URL
1. Once deployed, copy your Railway app URL
2. It will look like: `https://your-app-name.railway.app`

---

## 🌐 Step 5: Frontend Deployment (Vercel)

### 5.1 Update Frontend Configuration
1. Update `frontend/src/config/axios.js`:
```javascript
const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.railway.app'
  : 'http://localhost:3002';
```

### 5.2 Deploy to Vercel
1. Go to [Vercel](https://vercel.com/)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Set the root directory to `frontend`
6. Set build command: `npm run build`
7. Set output directory: `build`
8. Click "Deploy"

### 5.3 Configure Environment Variables in Vercel
1. Go to your project settings in Vercel
2. Click "Environment Variables"
3. Add:
   - `REACT_APP_API_URL`: `https://your-backend-url.railway.app`

---

## 🔄 Step 6: Update URLs and Final Configuration

### 6.1 Update Backend CORS
1. Go back to Railway
2. Update the `FRONTEND_URL` environment variable with your Vercel URL
3. Redeploy the backend

### 6.2 Update Frontend API URL
1. Go to Vercel
2. Update the `REACT_APP_API_URL` environment variable
3. Redeploy the frontend

---

## 👨‍💼 Step 7: Create Admin Account

### 7.1 Run Admin Creation Script
1. Go to your Railway backend
2. Open the terminal/console
3. Run:
```bash
node createAdmin.js
```

### 7.2 Admin Credentials
- Email: `admin@luxuryecommerce.com`
- Password: `admin123`
- **Important**: Change these credentials after first login!

---

## 🧪 Step 8: Test Your Deployment

### 8.1 Test Frontend
1. Visit your Vercel URL
2. Test the homepage
3. Test product browsing
4. Test cart functionality
5. Test checkout process

### 8.2 Test Admin Panel
1. Go to `your-frontend-url/admin`
2. Login with admin credentials
3. Test admin dashboard
4. Test product management
5. Test order management

### 8.3 Test API Endpoints
1. Test product endpoints
2. Test order creation
3. Test admin authentication

---

## 🔧 Step 9: Database Seeding (Optional)

If you want to add sample products:

1. Go to Railway backend console
2. Run:
```bash
node seed.js
```

---

## 🛡️ Step 10: Security Checklist

- [ ] Change admin password
- [ ] Verify HTTPS is working
- [ ] Test CORS configuration
- [ ] Verify environment variables are secure
- [ ] Test authentication flow
- [ ] Verify image uploads work

---

## 📞 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure `FRONTEND_URL` is correct in backend
2. **Database Connection**: Verify MongoDB URI and network access
3. **Image Upload**: Check Cloudinary credentials
4. **Build Errors**: Check Node.js version compatibility

### Support:
- Check Railway logs for backend issues
- Check Vercel logs for frontend issues
- Verify all environment variables are set correctly

---

## 🎉 Congratulations!

Your E-Commerce application is now live! 

**Frontend**: `https://your-app.vercel.app`
**Backend**: `https://your-app.railway.app`
**Admin Panel**: `https://your-app.vercel.app/admin`

Remember to:
- Monitor your application performance
- Set up proper monitoring and logging
- Regularly backup your database
- Keep dependencies updated
- Monitor usage limits on free tiers 

## 🔧 **Fix the Build Command Issue**

### **Step 1: Update Build Command**
In your Render service configuration, change:

**Current (incorrect):**
```
Build Command: npm install
```

**Change to:**
```
Build Command: cd backend && npm install
```

### **Step 2: Update Start Command**
Also change:

**Current (incorrect):**
```
Start Command: npm start
```

**Change to:**
```
Start Command: cd backend && npm start
```

### **Step 3: Alternative Configuration**
If that doesn't work, try this:

**Build Command:**
```
npm install --prefix backend
```

**Start Command:**
```
npm start --prefix backend
```

---

##  **How to Update in Render:**

1. **Go to your Render dashboard**
2. **Click on your service**
3. **Go to "Settings" tab**
4. **Find "Build & Deploy" section**
5. **Update the commands** as shown above
6. **Click "Save Changes"**
7. **Redeploy** (it should auto-redeploy)

---

## 📝 **Correct Configuration Summary:**

```
Name: luxury-ecommerce-backend
Environment: Node
Region: (your choice)
Branch: main
Root Directory: backend
Build Command: cd backend && npm install
Start Command: cd backend && npm start
```

---

**Can you update the build and start commands in your Render service settings?** 

**What do you see in the Settings tab?** 🔧 