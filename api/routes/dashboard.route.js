import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// GET /api/dashboard/overview - Get dashboard overview data
router.get("/overview", verifyToken, (req, res) => {
  try {
    const overviewData = {
      agent: {
        name: "Alex Thompson",
        title: "Senior Agent",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        performance: "12%"
      },
      kpis: [
        {
          title: "Total Properties",
          value: 247,
          change: 23,
          changeType: "increase",
          period: "this month",
          icon: "🏠",
          color: "blue"
        },
        {
          title: "Total Revenue",
          value: 2400000,
          change: 18,
          changeType: "increase",
          period: "YTD Performance",
          icon: "💰",
          color: "green"
        },
        {
          title: "Active Clients",
          value: 1843,
          change: 156,
          changeType: "increase",
          period: "this month",
          icon: "👥",
          color: "purple"
        },
        {
          title: "Avg. Sale Price",
          value: 458000,
          change: 3,
          changeType: "increase",
          period: "Market trending up",
          icon: "📈",
          color: "orange"
        }
      ],
      revenueChart: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Revenue",
            data: [45000, 52000, 48000, 61000, 55000, 72000],
            borderColor: "#3B82F6",
            backgroundColor: "rgba(59, 130, 246, 0.1)"
          },
          {
            label: "Expenses",
            data: [28000, 32000, 29000, 35000, 31000, 42000],
            borderColor: "#EF4444",
            backgroundColor: "rgba(239, 68, 68, 0.1)"
          },
          {
            label: "Profit",
            data: [17000, 20000, 19000, 26000, 24000, 30000],
            borderColor: "#10B981",
            backgroundColor: "rgba(16, 185, 129, 0.1)"
          }
        ]
      },
      propertyPortfolio: [
        { type: "Single Family", percentage: 45, count: 111 },
        { type: "Condo", percentage: 30, count: 74 },
        { type: "Multi-Family", percentage: 15, count: 37 },
        { type: "Commercial", percentage: 10, count: 25 }
      ],
      marketTrends: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        prices: [420000, 435000, 428000, 445000, 452000, 458000],
        volume: [45, 52, 48, 61, 55, 72]
      },
      occupancyRate: 87,
      performance: {
        salesTarget: 82,
        avgDaysOnMarket: 23,
        clientSatisfaction: 4.8
      }
    };

    res.json(overviewData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch overview data" });
  }
});

// GET /api/dashboard/listings - Get listings data
router.get("/listings", verifyToken, (req, res) => {
  try {
    const listingsData = {
      total: 247,
      active: 189,
      pending: 34,
      sold: 24,
      properties: [
        {
          id: "1",
          title: "Modern Downtown Loft",
          status: "For Sale",
          price: 650000,
          pricePerSqft: 520,
          address: "Downtown District",
          bedrooms: 2,
          bathrooms: 2,
          sqft: 1250,
          agent: "Sarah Johnson",
          image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
          daysOnMarket: 15,
          views: 245,
          saved: 18
        },
        {
          id: "2",
          title: "Suburban Family Home",
          status: "Pending",
          price: 850000,
          pricePerSqft: 425,
          address: "Oak Valley",
          bedrooms: 4,
          bathrooms: 3,
          sqft: 2000,
          agent: "Mike Chen",
          image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
          daysOnMarket: 8,
          views: 189,
          saved: 12
        },
        {
          id: "3",
          title: "Luxury Waterfront Villa",
          status: "For Sale",
          price: 1200000,
          pricePerSqft: 600,
          address: "Seaside Heights",
          bedrooms: 5,
          bathrooms: 4,
          sqft: 2000,
          agent: "Emma Williams",
          image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
          daysOnMarket: 22,
          views: 312,
          saved: 25
        }
      ],
      stats: {
        avgPrice: 458000,
        avgDaysOnMarket: 23,
        totalViews: 15678,
        totalSaved: 1245
      }
    };

    res.json(listingsData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch listings data" });
  }
});

// GET /api/dashboard/clients - Get clients data
router.get("/clients", verifyToken, (req, res) => {
  try {
    const clientsData = {
      total: 1843,
      newThisMonth: 156,
      active: 1247,
      inactive: 596,
      clients: [
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "+1 (555) 123-4567",
          status: "Active",
          lastContact: "2024-01-15",
          propertiesViewed: 8,
          savedProperties: 3,
          budget: 500000,
          preferences: ["Single Family", "3+ beds", "Garage"],
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane.smith@email.com",
          phone: "+1 (555) 987-6543",
          status: "Active",
          lastContact: "2024-01-14",
          propertiesViewed: 12,
          savedProperties: 5,
          budget: 750000,
          preferences: ["Condo", "Downtown", "Modern"],
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3e5?w=150"
        },
        {
          id: "3",
          name: "Robert Brown",
          email: "robert.brown@email.com",
          phone: "+1 (555) 456-7890",
          status: "Inactive",
          lastContact: "2024-01-10",
          propertiesViewed: 3,
          savedProperties: 1,
          budget: 300000,
          preferences: ["Townhouse", "2+ beds", "Garden"],
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
        }
      ],
      stats: {
        avgBudget: 485000,
        avgPropertiesViewed: 7.6,
        responseRate: 78,
        satisfactionScore: 4.8
      }
    };

    res.json(clientsData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch clients data" });
  }
});

// GET /api/dashboard/revenue - Get revenue data
router.get("/revenue", verifyToken, (req, res) => {
  try {
    const revenueData = {
      totalRevenue: 2400000,
      totalExpenses: 1200000,
      netProfit: 1200000,
      profitMargin: 50,
      monthlyData: [
        { month: "Jan", revenue: 45000, expenses: 28000, profit: 17000 },
        { month: "Feb", revenue: 52000, expenses: 32000, profit: 20000 },
        { month: "Mar", revenue: 48000, expenses: 29000, profit: 19000 },
        { month: "Apr", revenue: 61000, expenses: 35000, profit: 26000 },
        { month: "May", revenue: 55000, expenses: 31000, profit: 24000 },
        { month: "Jun", revenue: 72000, expenses: 42000, profit: 30000 }
      ],
      revenueByType: [
        { type: "Sales Commission", amount: 1800000, percentage: 75 },
        { type: "Rental Management", amount: 480000, percentage: 20 },
        { type: "Consulting", amount: 120000, percentage: 5 }
      ],
      topProperties: [
        {
          id: "1",
          title: "Luxury Waterfront Villa",
          revenue: 72000,
          commission: 21600,
          soldDate: "2024-01-15"
        },
        {
          id: "2",
          title: "Downtown Penthouse",
          revenue: 65000,
          commission: 19500,
          soldDate: "2024-01-10"
        },
        {
          id: "3",
          title: "Suburban Family Home",
          revenue: 58000,
          commission: 17400,
          soldDate: "2024-01-08"
        }
      ]
    };

    res.json(revenueData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch revenue data" });
  }
});

// GET /api/dashboard/performance - Get performance data
router.get("/performance", verifyToken, (req, res) => {
  try {
    const performanceData = {
      salesTarget: 82,
      avgDaysOnMarket: 23,
      clientSatisfaction: 4.8,
      responseTime: "2.3 hours",
      conversionRate: 12.5,
      monthlyPerformance: [
        { month: "Jan", sales: 8, target: 10, achievement: 80 },
        { month: "Feb", sales: 12, target: 10, achievement: 120 },
        { month: "Mar", sales: 9, target: 10, achievement: 90 },
        { month: "Apr", sales: 11, target: 10, achievement: 110 },
        { month: "May", sales: 10, target: 10, achievement: 100 },
        { month: "Jun", sales: 13, target: 10, achievement: 130 }
      ],
      propertyPerformance: [
        { type: "Single Family", avgDays: 18, avgPrice: 485000, volume: 45 },
        { type: "Condo", avgDays: 25, avgPrice: 320000, volume: 30 },
        { type: "Multi-Family", avgDays: 35, avgPrice: 680000, volume: 15 },
        { type: "Commercial", avgDays: 45, avgPrice: 1200000, volume: 10 }
      ],
      agentMetrics: {
        totalDeals: 156,
        avgDealValue: 458000,
        clientRetention: 78,
        referralRate: 23
      }
    };

    res.json(performanceData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch performance data" });
  }
});

// GET /api/dashboard/schedule - Get today's schedule
router.get("/schedule", verifyToken, (req, res) => {
  try {
    const scheduleData = {
      today: [
        {
          id: "1",
          type: "Property Showing",
          title: "Downtown Loft",
          client: "John Doe",
          time: "10:00 AM",
          duration: "1 hour",
          status: "Confirmed"
        },
        {
          id: "2",
          type: "Inspection",
          title: "Oak Valley Home",
          client: "Jane Smith",
          time: "2:00 PM",
          duration: "2 hours",
          status: "Confirmed"
        },
        {
          id: "3",
          type: "Client Meeting",
          title: "Investment Options",
          client: "Robert Brown",
          time: "4:30 PM",
          duration: "1 hour",
          status: "Confirmed"
        }
      ],
      upcoming: [
        {
          id: "4",
          type: "Property Showing",
          title: "Seaside Villa",
          client: "Alice Johnson",
          time: "2024-01-16 11:00 AM",
          duration: "1 hour",
          status: "Confirmed"
        }
      ]
    };

    res.json(scheduleData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch schedule data" });
  }
});

// GET /api/dashboard/messages - Get recent messages
router.get("/messages", verifyToken, (req, res) => {
  try {
    const messagesData = {
      unread: 3,
      messages: [
        {
          id: "1",
          from: "John Doe",
          subject: "Interested in the downtown loft",
          preview: "Hi, I'm very interested in the downtown loft property. When can we schedule a viewing?",
          time: "10 min ago",
          unread: true,
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
        },
        {
          id: "2",
          from: "Jane Smith",
          subject: "Viewing schedule",
          preview: "When can we schedule a viewing for the Oak Valley property?",
          time: "1 hour ago",
          unread: true,
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3e5?w=150"
        },
        {
          id: "3",
          from: "Robert Brown",
          subject: "Thank you for the tour",
          preview: "Thank you for showing us the property today. We'll discuss and get back to you.",
          time: "3 hours ago",
          unread: true,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
        }
      ]
    };

    res.json(messagesData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages data" });
  }
});

export default router; 