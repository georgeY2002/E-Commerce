# 🔐 Environment Variables Template

Copy these variables and replace the placeholder values with your actual credentials.

## Backend Environment Variables (.env file)

```env
# Database
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/luxury-ecommerce

# Server
PORT=3002
NODE_ENV=production

# Cloudinary (Free tier)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Secret (Generated for you)
JWT_SECRET=3ea88ec7ab889f61d17f1f65cef03de039cb701cc6d7bf9e28703d013f5f544f0b742ebbb4f2b217538f0958ded760193dbe02805a304a2a30abfdcbddda24b0

# Frontend URL (Update after frontend deployment)
FRONTEND_URL=https://your-frontend.vercel.app
```

## Frontend Environment Variables (Vercel)

```
REACT_APP_API_URL=https://your-backend-url.railway.app
```

## 🔑 Where to Get These Values:

### MongoDB Atlas:
1. Go to your cluster
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` and `<dbname>`

### Cloudinary:
1. Go to your Dashboard
2. Copy "Cloud name"
3. Copy "API Key"
4. Copy "API Secret"

### JWT Secret:
✅ Already generated for you above

### Frontend URL:
- Will be provided by Vercel after deployment
- Format: `https://your-app-name.vercel.app`

### Backend URL:
- Will be provided by Railway after deployment
- Format: `https://your-app-name.railway.app`

## 📝 Important Notes:

1. **Never commit the `.env` file to GitHub**
2. **Keep your JWT secret secure**
3. **Update URLs after each deployment step**
4. **Test all functionality after deployment** 