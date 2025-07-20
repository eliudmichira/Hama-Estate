import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; // Adjusted path
import { Mail, Lock, Briefcase, User as UserIcon } from 'lucide-react';

const AuthForms: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false); // To toggle between Sign In and Sign Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { 
    signInWithEmailPassword,
    signUpWithEmailPassword,
    signInWithGoogle 
  } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError("Password should be at least 6 characters");
        setLoading(false);
        return;
      }
      try {
        await signUpWithEmailPassword(email, password);
        // Navigation will be handled by AuthContext or parent component if user becomes non-null
      } catch (err: any) {
        if (err.code === 'auth/email-already-in-use') {
          setError('This email is already in use. Please try logging in.');
        } else if (err.code === 'auth/weak-password') {
          setError('The password is too weak.');
        } else {
          setError(err.message || 'Failed to sign up. Please try again.');
        }
        console.error("Sign up error:", err);
      }
    } else {
      try {
        await signInWithEmailPassword(email, password);
        // Navigation will be handled by AuthContext or parent component if user becomes non-null
      } catch (err: any) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          setError('Invalid email or password. Please try again.');
        } else {
          setError(err.message || 'Failed to sign in. Please try again.');
        }
        console.error("Sign in error:", err);
      }
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      // Navigation will be handled by AuthContext or parent component if user becomes non-null
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google. Please try again.');
      console.error("Google sign in error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {isSignUp ? 'Create your Bogani Account' : 'Sign in to Bogani'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <button 
            onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
            className="font-medium text-primaryRed hover:text-primaryRed-dark dark:text-accentGreen dark:hover:text-accentGreen-light focus:outline-none"
          >
            {isSignUp ? 'sign in to your existing account' : 'create a new account'}
          </button>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
          </div>
        )}
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-primaryRed focus:border-primaryRed dark:focus:ring-accentGreen dark:focus:border-accentGreen sm:text-sm ${
                  isSignUp ? 'rounded-md' : 'rounded-t-md'
                }`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="pt-3">
            <label htmlFor="password sr-only">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-primaryRed focus:border-primaryRed dark:focus:ring-accentGreen dark:focus:border-accentGreen sm:text-sm ${
                  isSignUp ? 'rounded-md' : 'rounded-b-md' // Only round bottom for signin if no confirm pass
                }`}
                placeholder={isSignUp ? "Password (min. 6 characters)" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {isSignUp && (
            <div className="pt-3">
              <label htmlFor="confirm-password sr-only">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-primaryRed focus:border-primaryRed dark:focus:ring-accentGreen dark:focus:border-accentGreen sm:text-sm"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {!isSignUp && (
           <div className="flex items-center justify-end">
            <div className="text-sm">
              <a href="#" /* Implement password reset */ className="font-medium text-primaryRed hover:text-primaryRed-dark dark:text-accentGreen dark:hover:text-accentGreen-light">
                Forgot your password?
              </a>
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primaryRed hover:bg-primaryRed-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryRed-dark dark:bg-accentGreen dark:hover:bg-accentGreen-dark dark:focus:ring-accentGreen-dark disabled:opacity-50 transition duration-150 ease-in-out"
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              isSignUp ? 'Sign Up' : 'Sign In'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            type="button"
            className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryRed dark:focus:ring-accentGreen disabled:opacity-50 transition duration-150 ease-in-out"
          >
            {/* Replace Briefcase with a proper Google icon if available or use SVG */}
            <svg className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 398.8 0 256S110.3 0 244 0c76.6 0 140.6 30.6 188.4 78.9l-68.3 65.9c-20.4-19.2-49.4-30.9-79.6-30.9-70.3 0-128.3 58.5-128.3 130.3s58 130.3 128.3 130.3c52.2 0 94-23.4 113.6-66.6H244V301.3h236.9c2.4 13.6 3.9 27.9 3.9 42.5z"></path></svg>
            {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
          </button>
        </div>
      </div>
       {isSignUp && (
        <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          By creating an account, you agree to Bogani's <br />
          <a href="/terms" className="underline hover:text-primaryRed dark:hover:text-accentGreen">Terms of Service</a> and <a href="/privacy" className="underline hover:text-primaryRed dark:hover:text-accentGreen">Privacy Policy</a>.
        </p>
      )}
    </div>
  );
};

export default AuthForms; 