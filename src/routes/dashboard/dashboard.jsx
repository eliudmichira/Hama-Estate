import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Home, 
  MessageCircle, 
  Settings, 
  Plus, 
  Bell, 
  User, 
  Eye, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Search,
  Filter,
  Download,
  BarChart3,
  Users as UsersIcon,
  MapPin,
  Star
} from 'lucide-react';
import OverviewSection from './sections/OverviewSection';
import PropertiesSection from './sections/PropertiesSection';
import MessagesSection from './sections/MessagesSection';
import SettingsSection from './sections/SettingsSection';

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: 'Mich Michira',
    email: 'mich@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  // Enhanced stats with real-time data
  const [stats, setStats] = useState({
    totalProperties: 247,
    totalViews: 15678,
    totalMessages: 3,
    totalRevenue: 2850000,
    activeListings: 189,
    avgRating: 4.8,
    thisMonth: 28,
    conversionRate: 8.2
  });

  // Chart data for overview
  const [chartData, setChartData] = useState([
    { name: 'Mon', revenue: 45000, views: 1200 },
    { name: 'Tue', revenue: 52000, views: 1400 },
    { name: 'Wed', revenue: 48000, views: 1100 },
    { name: 'Thu', revenue: 61000, views: 1800 },
    { name: 'Fri', revenue: 55000, views: 1600 },
    { name: 'Sat', revenue: 67000, views: 2000 },
    { name: 'Sun', revenue: 58000, views: 1700 }
  ]);

  const chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const section = searchParams.get('section') || 'overview';
    setActiveSection(section);
  }, [searchParams]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSearchParams({ section });
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'add-property':
        handleSectionChange('properties');
        // In a real app, you might want to trigger the add property modal
        break;
      case 'view-messages':
        handleSectionChange('messages');
        break;
      case 'notifications':
        // Toggle notifications panel or navigate to notifications
        break;
      case 'export-data':
        // Trigger data export
        const data = {
          stats,
          userData,
          timestamp: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        break;
      default:
        break;
    }
  };

  const sections = [
    {
      id: 'overview',
      name: 'Overview',
      icon: Home,
      description: 'Dashboard overview and analytics'
    },
    {
      id: 'properties',
      name: 'Properties',
      icon: MapPin,
      description: 'Manage your property listings'
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: MessageCircle,
      description: 'View and respond to inquiries'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      description: 'Account and app preferences'
    }
  ];

  const quickActions = [
    {
      id: 'add-property',
      name: 'Add Property',
      icon: Plus,
      description: 'List a new rental property',
      color: 'blue'
    },
    {
      id: 'view-messages',
      name: 'View Messages',
      icon: MessageCircle,
      description: 'Check customer inquiries',
      color: 'green'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: Bell,
      description: 'Manage notifications',
      color: 'purple'
    },
    {
      id: 'export-data',
      name: 'Export Data',
      icon: Download,
      description: 'Download reports',
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50',
      green: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50',
      purple: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50',
      orange: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/50'
    };
    return colors[color] || colors.blue;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Hama Estate Dashboard
            </h1>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>•</span>
                <span>Property Management</span>
          </div>
        </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{userData.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Properties</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProperties.toLocaleString()}</p>
        </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Views</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalViews.toLocaleString()}</p>
                  </div>
                  </div>
                </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Messages</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalMessages}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">KSh {(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                </div>
                </div>
                </div>
                </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Navigation</h3>
              
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
              <button 
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <div>
                        <p className="font-medium">{section.name}</p>
                        <p className="text-xs opacity-75">{section.description}</p>
                </div>
              </button>
                  );
                })}
              </nav>

              <div className="mt-8">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
              <button 
                        key={action.id}
                        onClick={() => handleQuickAction(action.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${getColorClasses(action.color)}`}
                      >
                        <Icon className="w-4 h-4" />
                        <div>
                          <p className="font-medium">{action.name}</p>
                          <p className="text-xs opacity-75">{action.description}</p>
                </div>
              </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === 'overview' && (
              <OverviewSection stats={stats} chartData={chartData} chartLabels={chartLabels} />
            )}
            {activeSection === 'properties' && <PropertiesSection />}
            {activeSection === 'messages' && <MessagesSection />}
            {activeSection === 'settings' && <SettingsSection />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 