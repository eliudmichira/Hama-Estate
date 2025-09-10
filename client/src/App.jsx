import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './routes/layout/layout';
import ErrorBoundary from './components/ErrorBoundary';
import { testFirebaseConnection } from './lib/firebase';

// Lazy load components for better performance
const HomePage = lazy(() => import('./routes/homePage/HomePage'));
const RentaKenyaPage = lazy(() => import('./routes/rentakenya/PropertyOwnerPortal'));
const Contact = lazy(() => import('./routes/contact/contact'));
const Agents = lazy(() => import('./routes/agents/Agents'));
const MobileResponsiveWrapper = lazy(() => import('./components/MobileResponsiveWrapper'));

// Legal pages
const Privacy = lazy(() => import('../pages/Privacy'));
const Terms = lazy(() => import('../pages/Terms'));
const Cookies = lazy(() => import('../pages/Cookies'));

// Mobile-specific pages - using desktop components for now to avoid Router context issues
const MobilePropertySearch = lazy(() => import('./routes/listPage/listPage_fixed_useLocation'));
const MobilePropertyDetails = lazy(() => import('./routes/propertyDetails/propertyDetails'));
const MobileAuth = lazy(() => import('./routes/login/login'));
const MobileDashboard = lazy(() => import('./routes/dashboard/dashboard'));

// Desktop pages
const PropertyDetails = lazy(() => import('./routes/propertyDetails/propertyDetails'));
const ListPage = lazy(() => import('./routes/listPage/listPage_fixed_useLocation'));
const Login = lazy(() => import('./routes/login/login'));
const Register = lazy(() => import('./routes/register/register'));
const Dashboard = lazy(() => import('./routes/dashboard/dashboard'));
const AdminPanel = lazy(() => import('./routes/admin/AdminPanel'));
const AgentVerificationPage = lazy(() => import('./routes/agent-verification/AgentVerificationPage'));
const AddProperty = lazy(() => import('./routes/properties/AddProperty'));
const TrialLogin = lazy(() => import('./routes/trial-login/TrialLogin'));
const TrialDashboard = lazy(() => import('./routes/trial-dashboard/TrialDashboard'));
const PropertyManagement = lazy(() => import('./routes/trial-dashboard/PropertyManagement'));
const TenantManagement = lazy(() => import('./routes/trial-dashboard/TenantManagement'));
const RentCollection = lazy(() => import('./routes/trial-dashboard/RentCollection'));
const MaintenanceManagement = lazy(() => import('./routes/trial-dashboard/MaintenanceManagement'));
const FinancialReports = lazy(() => import('./routes/trial-dashboard/FinancialReports'));
const DocumentStorage = lazy(() => import('./routes/trial-dashboard/DocumentStorage'));
const PaymentRecording = lazy(() => import('./routes/trial-dashboard/PaymentRecording'));

// Tenant Portal
const TenantLogin = lazy(() => import('./routes/tenant-portal/TenantLogin'));
const TenantDashboard = lazy(() => import('./routes/tenant-portal/TenantDashboard'));

function App() {
  // Test Firebase connection on app start
  useEffect(() => {
    const testConnection = async () => {
      const result = await testFirebaseConnection();
      if (result.success) {
        console.log('🎉 Firebase is connected and working!');
      } else {
        console.error('💥 Firebase connection failed:', result.error);
      }
    };
    
    testConnection();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#51faaa] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Welcome to Hama Estate</p>
            </div>
          </div>
        }>
          <Routes>
            {/* Mobile route - no layout, no footer */}
            <Route path="/" element={<MobileResponsiveWrapper />} />
            
            {/* Mobile-specific routes */}
            <Route path="/search" element={<MobilePropertySearch />} />
            <Route path="/property/:id" element={<MobilePropertyDetails />} />
            <Route path="/auth" element={<MobileAuth />} />
            <Route path="/dashboard" element={<MobileDashboard />} />
            
            {/* Desktop routes WITH layout (navbar + footer) */}
            <Route path="/desktop" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="rentakenya" element={<RentaKenyaPage />} />
              <Route path="contact" element={<Contact />} />
              <Route path="agents" element={<Agents />} />
            </Route>
            
            {/* Legal pages WITH layout */}
            <Route path="/privacy" element={<Layout />}>
              <Route index element={<Privacy />} />
            </Route>
            <Route path="/terms" element={<Layout />}>
              <Route index element={<Terms />} />
            </Route>
            <Route path="/cookies" element={<Layout />}>
              <Route index element={<Cookies />} />
            </Route>
            
            {/* Desktop routes WITHOUT layout (standalone pages) */}
            <Route path="/desktop/properties" element={<ListPage />} />
            <Route path="/properties" element={<ListPage />} />
            <Route path="/properties/add" element={<AddProperty />} />
            <Route path="/desktop/properties/add" element={<AddProperty />} />
            <Route path="/desktop/property/:id" element={<PropertyDetails />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/desktop/login" element={<Login />} />
            <Route path="/desktop/register" element={<Register />} />
            <Route path="/desktop/dashboard" element={<Dashboard />} />
            <Route path="/agent-verification" element={<AgentVerificationPage />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/desktop/admin" element={<AdminPanel />} />
            
            {/* Trial routes */}
            <Route path="/trial-login" element={<TrialLogin />} />
            <Route path="/trial-dashboard" element={<TrialDashboard />} />
            <Route path="/trial-dashboard/properties" element={<PropertyManagement />} />
            <Route path="/trial-dashboard/tenants" element={<TenantManagement />} />
            <Route path="/trial-dashboard/rent-collection" element={<RentCollection />} />
            <Route path="/trial-dashboard/maintenance" element={<MaintenanceManagement />} />
            <Route path="/trial-dashboard/reports" element={<FinancialReports />} />
            <Route path="/trial-dashboard/documents" element={<DocumentStorage />} />
            <Route path="/trial-dashboard/payments" element={<PaymentRecording />} />
            
            {/* Tenant Portal routes */}
            <Route path="/tenant-login" element={<TenantLogin />} />
            <Route path="/tenant-dashboard" element={<TenantDashboard />} />
            
            {/* Catch all route - redirect to mobile home */}
            <Route path="*" element={<MobileResponsiveWrapper />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;