# 🔥 Firebase Migration Guide: dwellmate-285e8

## ✅ **Migration Completed**

Your project has been successfully updated to use the new **dwellmate-285e8** Firebase project.

## 📋 **What Was Updated**

### 1. **Client-Side Configuration**
- ✅ `client/src/lib/firebase.js` - Updated Firebase config
- ✅ `client/env.example` - Updated environment variables
- ✅ `client/env.local` - Created local environment file

### 2. **Server-Side Configuration**
- ✅ `server/scripts/seedAuthUsersToFirestore.js` - Updated service account path
- ✅ `server/env.example` - Created server environment template

### 3. **Firebase Configuration Files**
- ✅ `client/firebase.json` - Updated hosting configuration
- ✅ `firebase.json` - Root Firebase configuration

## 🚀 **Next Steps Required**

### 1. **Create Environment Files**
```bash
# Copy the environment files to their proper names
cp client/env.local client/.env
cp server/env.example server/.env
```

### 2. **Download Firebase Service Account Key**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your **dwellmate-285e8** project
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Save the file as `server/.secrets/dwellmate-serviceAccount.json`

### 3. **Update Environment Variables**
Edit `server/.env` and update these values:
```env
# Generate a secure JWT secret
JWT_SECRET_KEY=your-secure-jwt-secret-here

# Update email credentials if needed
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Update database URL if needed
DATABASE_URL="mongodb://localhost:27017/dwellmate-estate"
```

### 4. **Initialize Firebase Project**
```bash
# Navigate to your project root
cd /path/to/your/project

# Login to Firebase (if not already logged in)
firebase login

# Set the active project
firebase use dwellmate-285e8

# Deploy Firestore rules and indexes
firebase deploy --only firestore
```

### 5. **Test the Configuration**
```bash
# Start the development server
cd client
npm run dev

# In another terminal, start the backend
cd server
npm start
```

## 🔧 **New Firebase Project Details**

| Property | Value |
|----------|-------|
| **Project ID** | `dwellmate-285e8` |
| **Project Number** | `951413621891` |
| **Web API Key** | `AIzaSyCpRetSaoI5YGsjQJbfL7ZEmYuTKAK2bS8` |
| **Auth Domain** | `dwellmate-285e8.firebaseapp.com` |
| **Storage Bucket** | `dwellmate-285e8.firebasestorage.app` |
| **App ID** | `1:951413621891:web:ab7a731b8db0e1a28687b6` |
| **Measurement ID** | `G-JXTFE2L2T0` |

## 🛡️ **Security Notes**

1. **Never commit `.env` files** to version control
2. **Keep service account keys secure** and never expose them publicly
3. **Use environment variables** for all sensitive configuration
4. **Set up proper Firestore security rules** for production

## 🐛 **Troubleshooting**

### Common Issues:

1. **Firebase connection errors**: Verify your API keys are correct
2. **Authentication issues**: Check that the service account key is properly placed
3. **CORS errors**: Ensure your client URL is correctly configured in server environment

### Verification Commands:
```bash
# Test Firebase connection
cd client
npm run dev
# Check browser console for Firebase initialization messages

# Test server connection
cd server
npm start
# Check for successful database connection
```

## 📞 **Support**

If you encounter any issues during the migration, check:
1. Firebase Console for project status
2. Browser console for client-side errors
3. Server logs for backend errors
4. Network tab for API call failures

---

**Migration completed successfully!** 🎉
Your project is now using the dwellmate-285e8 Firebase project.
