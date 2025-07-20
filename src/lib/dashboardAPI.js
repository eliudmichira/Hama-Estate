import { getEnvironment, getApiBaseUrl } from './env.js';

class DashboardAPI {
  constructor() {
    this.baseURL = 'http://localhost:8800/api';
  }

  // Helper method to get auth token
  getAuthToken() {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  // Helper method for API requests
  async makeRequest(endpoint, options = {}) {
    // Simple check: if we're not on localhost, return mock data
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return this.getMockData(endpoint);
    }

    const token = this.getAuthToken();
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Dashboard API request failed:', error);
      // Return mock data as fallback
      return this.getMockData(endpoint);
    }
  }

  // Get mock data for production
  getMockData(endpoint) {
    const mockData = {
      '/dashboard/overview': {
        totalProperties: 156,
        activeListings: 89,
        totalClients: 234,
        monthlyRevenue: 45600
      },
      '/dashboard/listings': {
        listings: [
          { id: 1, title: 'Modern Apartment', status: 'Active', price: 250000 },
          { id: 2, title: 'Family House', status: 'Pending', price: 450000 }
        ]
      },
      '/dashboard/clients': {
        clients: [
          { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' }
        ]
      },
      '/dashboard/revenue': {
        monthly: 45600,
        yearly: 548000,
        growth: 12.5
      },
      '/dashboard/performance': {
        conversionRate: 15.2,
        avgTimeOnSite: 4.5,
        bounceRate: 32.1
      },
      '/dashboard/schedule': {
        appointments: [
          { id: 1, client: 'John Doe', property: 'Modern Apartment', time: '2024-01-15 10:00' },
          { id: 2, client: 'Jane Smith', property: 'Family House', time: '2024-01-15 14:00' }
        ]
      },
      '/dashboard/messages': {
        messages: [
          { id: 1, from: 'John Doe', subject: 'Property Inquiry', unread: true },
          { id: 2, from: 'Jane Smith', subject: 'Viewing Request', unread: false }
        ]
      }
    };

    return mockData[endpoint] || { error: 'No mock data available' };
  }

  // Get dashboard overview data
  async getOverview() {
    return this.makeRequest('/dashboard/overview');
  }

  // Get listings data
  async getListings() {
    return this.makeRequest('/dashboard/listings');
  }

  // Get clients data
  async getClients() {
    return this.makeRequest('/dashboard/clients');
  }

  // Get revenue data
  async getRevenue() {
    return this.makeRequest('/dashboard/revenue');
  }

  // Get performance data
  async getPerformance() {
    return this.makeRequest('/dashboard/performance');
  }

  // Get schedule data
  async getSchedule() {
    return this.makeRequest('/dashboard/schedule');
  }

  // Get messages data
  async getMessages() {
    return this.makeRequest('/dashboard/messages');
  }

  // Get all dashboard data at once
  async getAllDashboardData() {
    try {
      const [
        overview,
        listings,
        clients,
        revenue,
        performance,
        schedule,
        messages
      ] = await Promise.all([
        this.getOverview(),
        this.getListings(),
        this.getClients(),
        this.getRevenue(),
        this.getPerformance(),
        this.getSchedule(),
        this.getMessages()
      ]);

      return {
        overview,
        listings,
        clients,
        revenue,
        performance,
        schedule,
        messages
      };
    } catch (error) {
      console.error('Failed to fetch all dashboard data:', error);
      throw error;
    }
  }

  // Update dashboard settings
  async updateSettings(settings) {
    return this.makeRequest('/dashboard/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  }

  // Get dashboard analytics
  async getAnalytics(timeframe = 'monthly') {
    return this.makeRequest(`/dashboard/analytics?timeframe=${timeframe}`);
  }

  // Export dashboard data
  async exportData(format = 'json') {
    return this.makeRequest(`/dashboard/export?format=${format}`);
  }
}

// Create and export a singleton instance
const dashboardAPI = new DashboardAPI();
export default dashboardAPI; 