import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useSearchParams } from 'react-router-dom';
import { 
  Users, 
  Shield, 
  BarChart3, 
  FileText, 
  Settings, 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  Edit, 
  Trash2, 
  Plus,
  TrendingUp,
  TrendingDown,
  UserCheck,
  UserX,
  Home,
  Star,
  AlertCircle,
  Calendar,
  DollarSign,
  Activity,
  Globe,
  Bell,
  Palette,
  Database
} from 'lucide-react';

// Admin Sections
import UserManagement from './sections/UserManagement';
import PropertyModeration from './sections/PropertyModeration';
import AnalyticsDashboard from './sections/AnalyticsDashboard';
import ContentManagement from './sections/ContentManagement';
import SettingsPanel from './sections/SettingsPanel';

const AdminPanel = () => {
  const { currentUser, getUserRole } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get section from URL params or default to analytics
  const sectionFromUrl = searchParams.get('section');
  const [activeSection, setActiveSection] = useState(sectionFromUrl || 'analytics');

  // Update URL when section changes
  useEffect(() => {
    if (activeSection !== sectionFromUrl) {
      setSearchParams({ section: activeSection });
    }
  }, [activeSection, sectionFromUrl, setSearchParams]);

  // Debug admin access
  const userRole = getUserRole ? getUserRole() : 'user';
  // Check if user is admin
  if (!currentUser || userRole !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const sections = [
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'Site usage statistics and insights'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      description: 'Manage users, roles, and permissions'
    },
    {
      id: 'moderation',
      label: 'Property Moderation',
      icon: Shield,
      description: 'Approve, reject, and manage listings'
    },
    {
      id: 'content',
      label: 'Content Management',
      icon: FileText,
      description: 'Manage featured properties and content'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'Site configuration and preferences'
    }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'users':
        return <UserManagement />;
      case 'moderation':
        return <PropertyModeration />;
      case 'content':
        return <ContentManagement />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Admin Panel
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your real estate platform and monitor performance
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">1,234</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">567</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">89</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              {/* Navigation */}
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{section.label}</div>
                      <div className="text-xs opacity-75">{section.description}</div>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Featured Property
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <AlertCircle className="w-4 h-4" />
                    View Reports
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Bell className="w-4 h-4" />
                    Manage Notifications
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 