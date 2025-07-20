import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, Eye, EyeOff, ArrowRight, Building2, Check, Star, Shield, Sparkles, AlertCircle, Loader2, ChevronRight, Zap, Award, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// Enhanced notification system with modern animations
const showNotification = (options) => {
  const notification = document.createElement('div');
  notification.className = `fixed top-6 right-6 z-[9999] transform transition-all duration-500 ease-out`;
  
  notification.innerHTML = `
    <div class="relative overflow-hidden rounded-2xl p-5 min-w-[300px] max-w-[400px] ${
      options.color === 'red' 
        ? 'bg-gradient-to-br from-red-500 via-red-600 to-red-700' 
        : options.color === 'blue'
          ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600'
          : 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600'
    } text-white shadow-2xl backdrop-blur-xl border border-white/20">
      <!-- Animated background pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]"></div>
        </div>
      
      <!-- Content -->
      <div class="relative flex items-start gap-4">
        <div class="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
          <div class="w-3 h-3 rounded-full bg-white animate-pulse"></div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-bold text-sm tracking-wide mb-1">${options.title}</div>
          <div class="text-xs opacity-90 leading-relaxed">${options.message}</div>
        </div>
        <div class="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>
      
      <!-- Progress bar -->
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div class="h-full bg-white/60 animate-[progress_4s_linear]"></div>
      </div>
    </div>
  `;
  
  // Add custom CSS for progress animation
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes progress {
        from { width: 100%; }
        to { width: 0%; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Initial position (off-screen)
  notification.style.transform = 'translateX(120%) scale(0.8)';
  notification.style.opacity = '0';
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0) scale(1)';
    notification.style.opacity = '1';
  }, 50);
  
  // Animate out
  setTimeout(() => {
    notification.style.transform = 'translateX(120%) scale(0.8)';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 500);
  }, 4000);
};

// Modern Enhanced Input Component
function ModernInput({ 
  label, 
  placeholder, 
  type = 'text', 
  icon: Icon, 
  value, 
  onChange, 
  error, 
  showPassword, 
  onTogglePassword,
  disabled = false 
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  
  useEffect(() => {
    setIsValid(value && value.length > 0 && !error);
  }, [value, error]);
  
  return (
    <div className="space-y-3 group">
      <label className="block text-sm font-bold text-gray-800 tracking-wide uppercase">
        {label}
        <span className="ml-1 text-red-500">*</span>
      </label>
      
      <div className="relative">
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-2xl transition-all duration-700 ${
          error 
            ? 'bg-gradient-to-r from-red-500/20 via-red-600/20 to-red-500/20 blur-sm scale-105' 
            : isFocused 
              ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 blur-sm scale-105' 
              : isValid
                ? 'bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 blur-sm scale-105'
            : 'bg-transparent'
        }`}></div>
        
        {/* Input container */}
        <div className={`relative flex items-center backdrop-blur-xl border-2 rounded-2xl px-5 py-4 transition-all duration-300 ${
          error 
            ? 'border-red-400/60 bg-red-50/80 shadow-red-200/50 shadow-lg' 
            : isFocused 
              ? 'border-blue-400/60 bg-blue-50/30 shadow-blue-200/50 shadow-xl' 
              : isValid
                ? 'border-emerald-400/60 bg-emerald-50/30 shadow-emerald-200/50 shadow-lg'
                : 'border-gray-200/60 bg-white/90 hover:border-gray-300/80 hover:bg-white/95'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
          
          {/* Icon with enhanced animations */}
          <div className={`transition-all duration-300 ${
            error
              ? 'text-red-500 scale-105' 
              : isFocused 
                ? 'text-blue-600 scale-110 rotate-3' 
                : isValid
                  ? 'text-emerald-600 scale-105'
              : 'text-gray-400 group-hover:text-gray-600'
          }`}>
            <Icon className="w-5 h-5" />
          </div>
          
          {/* Input field */}
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : 'username'}
            className="flex-1 ml-4 bg-transparent outline-none text-gray-900 placeholder-gray-500 text-sm font-medium"
          />
          
          {/* Right side elements */}
          <div className="flex items-center gap-2 ml-3">
          {/* Password toggle */}
          {type === 'password' && (
            <button
              type="button"
              onClick={onTogglePassword}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 transition-all duration-200 group"
                disabled={disabled}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 group-hover:scale-110 transition-transform" />
                ) : (
                  <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                )}
            </button>
          )}
          
          {/* Success indicator */}
            {isValid && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg animate-bounce-in">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
            
            {/* Error indicator */}
            {error && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-lg animate-shake">
                <AlertCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Error message with enhanced styling */}
      {error && (
        <div className="flex items-start gap-3 text-sm text-red-700 animate-slide-down bg-red-50/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-red-200/50 shadow-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
          <span className="font-medium leading-relaxed">{error}</span>
        </div>
      )}
    </div>
  );
}

// Ultra-modern Button Component
function ModernButton({ 
  children, 
  onClick, 
  disabled, 
  variant = 'primary', 
  leftIcon, 
  rightIcon, 
  fullWidth, 
  size = 'lg',
  loading = false 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);
  
  const sizeClasses = {
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg"
  };
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white shadow-xl hover:shadow-2xl",
    secondary: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-800 text-white shadow-xl hover:shadow-2xl",
    outline: "border-2 border-gray-300/60 hover:border-gray-400/80 bg-white/80 hover:bg-white/95 text-gray-700 shadow-lg hover:shadow-xl backdrop-blur-xl",
    ghost: "text-gray-600 hover:text-gray-800 hover:bg-gray-100/60 backdrop-blur-sm"
  };
  
  const handleClick = (e) => {
    if (disabled || loading) return;
    
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    onClick && onClick(e);
  };
  
  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden font-bold transition-all duration-300 rounded-2xl ${
        disabled || loading
          ? 'opacity-50 cursor-not-allowed' 
          : 'transform hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-1'
      } ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} flex items-center justify-center gap-3 tracking-wide uppercase text-xs group`}
    >
      {/* Animated background overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent transition-transform duration-1000 ${
        isHovered ? 'translate-x-0' : '-translate-x-full'
      }`}></div>
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40
          }}
        />
      ))}
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-3">
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : leftIcon ? (
          <span className="transform transition-transform duration-300 group-hover:scale-110">
            {leftIcon}
          </span>
        ) : null}
        
        <span className="relative">
          {children}
          {!loading && (
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
          )}
        </span>
        
        {!loading && rightIcon && (
          <span className="transform transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-1">
            {rightIcon}
          </span>
        )}
      </div>
      
      {/* Glow effect */}
      {isHovered && !disabled && !loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl animate-pulse"></div>
      )}
    </button>
  );
}

// Enhanced Feature Card Component
function FeatureCard({ icon: Icon, title, description, gradient = "from-blue-500 to-purple-600" }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}></div>
      
      <div className="relative flex items-start gap-4 p-6 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 transition-all duration-300 group-hover:bg-white/80 group-hover:shadow-xl group-hover:scale-[1.02]">
        {/* Icon container */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-gray-900 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-xs leading-relaxed group-hover:text-gray-700 transition-colors">
            {description}
          </p>
        </div>
        
        {/* Arrow indicator */}
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

// Stats Badge Component
function StatsBadge({ icon: Icon, text, gradient = "from-blue-500 to-purple-600" }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 group hover:bg-white/30 transition-all duration-300">
      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-3 h-3 text-white" />
      </div>
      <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
        {text}
      </span>
    </div>
  );
}

// Enhanced Login Component
function ModernLogin() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { signIn, signInWithGoogleAuth } = auth || {};
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Check if auth context is available
  if (!auth) {
    console.error('Auth context not available');
    return <div>Loading...</div>;
  }

  useEffect(() => {
    setMounted(true);
    
    // Load remembered user data
    const remembered = localStorage.getItem('rememberMe');
    const rememberedUser = localStorage.getItem('rememberedUser');
    
    if (remembered === 'true' && rememberedUser) {
      setRememberMe(true);
      setFormData(prev => ({ ...prev, email: rememberedUser }));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (!result.success) {
        throw new Error(result.error || 'Sign in failed');
      }

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('rememberedUser', formData.email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('rememberedUser');
      }

      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      
        showNotification({
        color: 'green',
        title: 'Welcome back!',
        message: `Signed in as ${result.user.email}`
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Sign in failed',
        message: error.message || 'Invalid email or password'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!signInWithGoogleAuth) {
      showNotification({
        color: 'red',
        title: 'Sign in failed',
        message: 'Google sign-in is not available. Please try again.'
      });
      return;
    }

    setGoogleLoading(true);
    try {
      const result = await signInWithGoogleAuth();
      
      if (!result.success) {
        throw new Error(result.error || 'Google sign-in failed');
      }
      
      // Show success notification
        showNotification({
        color: 'green',
        title: 'Welcome back!',
        message: `Signed in as ${result.user.email}`
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Sign in failed',
        message: error.message || 'Google sign-in failed. Please try again.'
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = () => {
    showNotification({
      color: 'blue',
      title: 'Password Reset',
      message: 'Password reset functionality will be implemented soon. Please contact support.'
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation Toggle at Top Left */}
      <div className="fixed top-6 left-6 z-[9998]">
        <div className="bg-white/90 backdrop-blur-2xl rounded-2xl p-2 shadow-2xl border border-white/50">
          <div className="flex gap-1">
                <button
              onClick={() => navigate('/register')}
              className="relative px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transform scale-105"
                >
              Sign Up
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600/20 to-teal-600/20 animate-pulse"></div>
                </button>
              </div>
            </div>
          </div>

      {/* Ultra-modern animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-40 w-96 h-96 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-float-random"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${Math.random() * 10 + 5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-16 lg:gap-24">
            
            {/* Left side - Enhanced Features */}
            <div className="hidden lg:flex flex-col space-y-8 flex-1 max-w-lg">
              {/* Stats badges */}
              <div className="flex flex-wrap gap-3 animate-fade-in">
                <StatsBadge 
                  icon={Star}
                  text="Trusted by 50,000+ users"
                  gradient="from-yellow-500 to-orange-500"
                />
                <StatsBadge 
                  icon={Award}
                  text="5-star rated platform"
                  gradient="from-purple-500 to-pink-500"
                />
                <StatsBadge 
                  icon={TrendingUp}
                  text="99.9% uptime"
                  gradient="from-emerald-500 to-teal-500"
                />
              </div>
              
              {/* Main heading */}
              <div className="space-y-6 animate-fade-in-up">
                <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                Welcome back to
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LamaEstate
                </span>
                </h1>
              
                <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                  Your modern real estate platform that connects you with the best properties and investment opportunities worldwide.
              </p>
            </div>
            
              {/* Feature cards */}
              <div className="space-y-4 animate-fade-in-up-delay">
                <FeatureCard 
                icon={Shield}
                  title="Bank-level Security"
                  description="Your data is protected with enterprise-grade encryption and security protocols"
                  gradient="from-blue-500 to-cyan-500"
                />
                <FeatureCard 
                  icon={Zap}
                  title="Lightning Fast"
                  description="Experience blazing-fast property searches and real-time market updates"
                  gradient="from-purple-500 to-pink-500"
                />
                <FeatureCard 
                icon={Building2}
                  title="Premium Properties"
                  description="Access exclusive listings and comprehensive market analytics"
                  gradient="from-emerald-500 to-teal-500"
              />
            </div>
          </div>

            {/* Right side - Login Form */}
            <div className="w-full max-w-md lg:max-w-lg">
              {/* Brand header */}
            <div className="text-center mb-8 animate-fade-in">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl mb-6 shadow-2xl relative group">
                  <Building2 className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent"></div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/0 to-purple-400/20 group-hover:from-blue-400/20 group-hover:to-purple-400/40 transition-all duration-300"></div>
              </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
                <p className="text-gray-600 text-lg">Welcome back to your account</p>
            </div>

              {/* Login form card */}
              <div className="backdrop-blur-2xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-8 lg:p-10 animate-slide-up">
              <form className="space-y-6" onSubmit={handleSubmit}>
                  <ModernInput
                  label="Email"
                  placeholder="Enter your email"
                  icon={Mail}
                  value={formData.email}
                  onChange={(value) => setFormData({ ...formData, email: value })}
                  error={errors.email}
                    disabled={isSubmitting}
                />

                  <ModernInput
                  label="Password"
                    placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  icon={Lock}
                  value={formData.password}
                  onChange={(value) => setFormData({ ...formData, password: value })}
                  error={errors.password}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  />

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-md focus:ring-blue-500 focus:ring-2 transition-all duration-200" 
                        disabled={isSubmitting}
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        Remember me
                  </span>
                    </label>
                    <button 
                      type="button" 
                      onClick={handleForgotPassword}
                      className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200 disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      Forgot password?
                    </button>
                </div>

                  <ModernButton
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                    loading={isSubmitting}
                    variant="primary"
                  fullWidth
                    size="xl"
                    rightIcon={!isSubmitting ? <ArrowRight className="w-5 h-5" /> : null}
                >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </ModernButton>
              </form>

              {/* Divider */}
              <div className="my-8 relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300/50"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-6 bg-white/80 text-gray-500 font-bold text-sm uppercase tracking-wider backdrop-blur-sm">
                      or continue with
                    </span>
                </div>
              </div>

                {/* Google sign in */}
                <ModernButton
                onClick={handleGoogleSignIn}
                  disabled={googleLoading || isSubmitting}
                  loading={googleLoading}
                variant="outline"
                fullWidth
                  size="xl"
                  leftIcon={!googleLoading ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  ) : null}
              >
                  {googleLoading ? 'Signing in...' : 'Sign in with Google'}
                </ModernButton>

                {/* Sign up link */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200/50">
                  <p className="text-gray-600 text-sm mb-2">Don't have an account?</p>
                <button
                    onClick={() => navigate('/register')}
                    className="text-blue-600 hover:text-blue-700 font-bold text-sm hover:underline transition-colors disabled:opacity-50"
                    disabled={isSubmitting || googleLoading}
                >
                    Create your account →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up-delay {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float-random {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-20px) translateX(10px) rotate(90deg); }
          50% { transform: translateY(-10px) translateX(-10px) rotate(180deg); }
          75% { transform: translateY(-30px) translateX(5px) rotate(270deg); }
        }
        
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out 0.2s both; }
        .animate-fade-in-up-delay { animation: fade-in-up-delay 1s ease-out 0.4s both; }
        .animate-slide-up { animation: slide-up 1s ease-out 0.3s both; }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .animate-bounce-in { animation: bounce-in 0.5s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-float-random { animation: float-random 8s ease-in-out infinite; }
        .animate-ripple { animation: ripple 0.6s linear; }
        
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
      `}</style>
    </div>
  );
}

export default ModernLogin;