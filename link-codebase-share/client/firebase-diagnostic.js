// Firebase Diagnostic Script
// Run this in your browser console to diagnose Firebase issues

console.log('🔍 Firebase Diagnostic Script Starting...');

// Check if Firebase is loaded
if (typeof firebase === 'undefined') {
    console.error('❌ Firebase SDK not loaded');
} else {
    console.log('✅ Firebase SDK loaded');
}

// Check Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjtZynMr3W1Yk9jfnPLNJZNlgKRzAF_IQ",
    authDomain: "makao-648bd.firebaseapp.com",
    projectId: "makao-648bd",
    storageBucket: "makao-648bd.firebasestorage.app",
    messagingSenderId: "142667530803",
    appId: "1:142667530803:web:d635acdf583356dda21946",
    measurementId: "G-QSSV2V096Q"
};

console.log('🔧 Firebase Config:', firebaseConfig);

// Test network connectivity
async function testNetworkConnectivity() {
    console.log('🌐 Testing network connectivity...');
    
    try {
        // Test basic connectivity
        const response = await fetch('https://www.google.com', { mode: 'no-cors' });
        console.log('✅ Basic network connectivity working');
        
        // Test Firebase domains
        const firebaseResponse = await fetch('https://makao-648bd.firebaseapp.com', { mode: 'no-cors' });
        console.log('✅ Firebase domain accessible');
        
    } catch (error) {
        console.error('❌ Network connectivity issue:', error);
    }
}

// Test Firebase services
async function testFirebaseServices() {
    console.log('🔥 Testing Firebase services...');
    
    try {
        // Import Firebase modules
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const { getAuth } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
        const { getStorage } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js');
        
        console.log('✅ Firebase modules imported successfully');
        
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        console.log('✅ Firebase app initialized');
        
        // Test Firestore
        const db = getFirestore(app);
        console.log('✅ Firestore initialized');
        
        // Test Auth
        const auth = getAuth(app);
        console.log('✅ Auth initialized');
        
        // Test Storage
        const storage = getStorage(app);
        console.log('✅ Storage initialized');
        
        console.log('🎉 All Firebase services working!');
        
    } catch (error) {
        console.error('❌ Firebase services test failed:', error);
    }
}

// Run diagnostics
testNetworkConnectivity();
testFirebaseServices();

console.log('🔍 Firebase Diagnostic Script Complete');
