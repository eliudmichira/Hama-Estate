import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { SocketContextProvider } from './context/SocketContext';
import { ThemeProvider } from './context/ThemeContext';
import AnalyticsProvider from './components/AnalyticsProvider';
import PageLoader from './components/Preloader';
import MobileNavigation from './components/EnhancedMobileNavigation';
import PWAInstallPrompt from './components/EnhancedPWAInstallPrompt';
import { Layout, RequireAuth } from './routes/layout/layout';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components for better performance
const HomePage = React.lazy(() => import('./routes/homePage/HomePage'));
const MobileResponsiveWrapper = React.lazy(() => import('./components/MobileResponsiveWrapper'));
const ListPage = React.lazy(() => import('./routes/listPage/listPage_fixed_useLocation'));
const PropertyDetails = React.lazy(() => import('./routes/propertyDetails/propertyDetails'));
const Login = React.lazy(() => import('./routes/login/login'));
const Register = React.lazy(() => import('./routes/register/register'));
const Contact = React.lazy(() => import('./routes/contact/contact'));
const AboutPage = React.lazy(() => import('./routes/about/AboutPage'));
const Dashboard = React.lazy(() => import('./routes/dashboard/dashboard'));
const AccountDashboard = React.lazy(() => import('./routes/accountDashboard/AccountDashboard'));
const AddProperty = React.lazy(() => import('./routes/properties/AddProperty'));
const Agents = React.lazy(() => import('./routes/agents/Agents'));
const AdminPanel = React.lazy(() => import('./routes/admin/AdminPanel'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

// Custom Enhanced PageLoader for App.jsx
const EnhancedPageLoader = ({ text = 'Welcome to Makao Homes' }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0c19]">
    <div className="text-center space-y-8 max-w-md mx-auto px-6">
      {/* Minimalist Logo Container */}
      <div className="relative mx-auto w-32 h-32">
        {/* Simple spinning ring */}
        <div className="w-32 h-32 rounded-full border-2 border-[#51faaa]/20 border-t-[#51faaa] animate-spin" style={{ animationDuration: '2s' }} />
        
        {/* Center logo */}
        <div className="absolute inset-8 w-16 h-16 rounded-full bg-[#51faaa] flex items-center justify-center shadow-lg">
          <div className="text-[#0a0c19] font-bold text-2xl">M</div>
        </div>
      </div>
      
      {/* Clean Typography */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          {text}
        </h1>
        <p className="text-lg text-[#dbd5a4] font-medium">
          Finding your perfect home
        </p>
      </div>
      
      {/* Minimal loading dots */}
      <div className="flex justify-center space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full bg-[#51faaa] animate-pulse`}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <SocketContextProvider>
              <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <AnalyticsProvider />
                
                <Suspense fallback={<EnhancedPageLoader text="Welcome to Hama Estate" />}>
                  <Routes>
                    {/* Mobile route - no layout, no footer */}
                    <Route path="/" element={<MobileResponsiveWrapper />} />
                    
                    {/* Desktop routes with layout */}
                    <Route path="/desktop" element={<Layout />}>
                      <Route index element={<HomePage />} />
                      <Route path="about" element={<AboutPage />} />
                      <Route path="contact" element={<Contact />} />
                      <Route path="agents" element={<Agents />} />
                    </Route>
                    
                    {/* Other routes that don't need layout */}
                    <Route path="/properties" element={<ListPage />} />
                    <Route path="/property/:id" element={<PropertyDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    <Route path="/dashboard/*" element={<RequireAuth />}>
                      <Route index element={<Dashboard />} />
                    </Route>
                    
                    <Route path="/account" element={<RequireAuth />}>
                      <Route index element={<AccountDashboard />} />
                    </Route>
                    
                    <Route path="/properties/add" element={<RequireAuth />}>
                      <Route index element={<AddProperty />} />
                    </Route>
                    
                    <Route path="/admin/*" element={<RequireAuth />}>
                      <Route index element={<AdminPanel />} />
                    </Route>
                  </Routes>
                </Suspense>

                {/* Mobile-specific components */}
                <MobileNavigation />
                <PWAInstallPrompt />
              </Router>
            </SocketContextProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;