import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCjtZynMr3W1Yk9jfnPLNJZNlgKRzAF_IQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "makao-648bd.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "makao-648bd",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "makao-648bd.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "142667530803",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:142667530803:web:d635acdf583356dda21946",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-QSSV2V096Q"
};

// Check if Firebase is properly configured
const isFirebaseConfigured = firebaseConfig.apiKey !== "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" && 
                            firebaseConfig.projectId !== "your-project-id";

let app, auth, googleProvider;

if (isFirebaseConfigured) {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  
  // Configure Google provider
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
  
  // Add scopes if needed
  googleProvider.addScope('email');
  googleProvider.addScope('profile');
} else {
  // Create mock objects for development
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback) => {
      // Mock auth state change
      callback(null);
      return () => {};
    }
  };
  googleProvider = {};
}

// Authentication functions
export const signInWithEmail = async (email, password) => {
  if (!isFirebaseConfigured) {
    // Development fallback - simulate successful login
    const mockUser = {
      uid: 'dev-user-id',
      email: email,
      displayName: email.split('@')[0],
      photoURL: '',
      metadata: { creationTime: new Date().toISOString() },
      providerData: [{ providerId: 'password' }]
    };
    return { success: true, user: mockUser };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signUpWithEmail = async (email, password) => {
  if (!isFirebaseConfigured) {
    // Development fallback - simulate successful signup
    const mockUser = {
      uid: 'dev-user-id-' + Date.now(),
      email: email,
      displayName: email.split('@')[0],
      photoURL: '',
      metadata: { creationTime: new Date().toISOString() },
      providerData: [{ providerId: 'password' }]
    };
    return { success: true, user: mockUser };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signInWithGoogle = async () => {
  if (!isFirebaseConfigured) {
    // Development fallback - simulate successful Google signin
    const mockUser = {
      uid: 'dev-google-user-id',
      email: 'devuser@gmail.com',
      displayName: 'Dev User',
      photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      metadata: { creationTime: new Date().toISOString() },
      providerData: [{ providerId: 'google.com' }]
    };
    return { success: true, user: mockUser };
  }

  try {
    // Handle popup blocking and COOP issues
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    // Handle specific popup-related errors
    if (error.code === 'auth/popup-blocked') {
      return { 
        success: false, 
        error: 'Popup was blocked. Please allow popups for this site and try again.' 
      };
    } else if (error.code === 'auth/popup-closed-by-user') {
      return { 
        success: false, 
        error: 'Sign-in was cancelled. Please try again.' 
      };
    } else if (error.code === 'auth/cancelled-popup-request') {
      return { 
        success: false, 
        error: 'Multiple sign-in attempts detected. Please wait a moment and try again.' 
      };
    }
    return { success: false, error: error.message };
  }
};

export const signOutUser = async () => {
  if (!isFirebaseConfigured) {
    // Development fallback
    return { success: true };
  }

  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const onAuthStateChange = (callback) => {
  if (!isFirebaseConfigured) {
    // Development fallback
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

export { auth, googleProvider };
export default app; 