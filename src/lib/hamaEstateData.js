// Hama Estate - Real Estate Data Service
// Kenyan Property Market Data

// Property Data
export const hamaProperties = [
  {
    id: 1,
    title: "Luxury Villa in Karen",
    type: "Villa",
    price: 85000000,
    monthlyRent: 450000,
    images: [
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg"
    ],
    bedroom: 5,
    bathroom: 4,
    size: 450,
    latitude: -1.3191,
    longitude: 36.7272,
    city: "Nairobi",
    neighborhood: "Karen",
    address: "Karen Road, Karen",
    school: "Banda School - 1.2km",
    bus: "Matatu Stage - 500m",
    restaurant: "Tamarind Restaurant - 800m",
    description: "Stunning luxury villa in the prestigious Karen neighborhood. Features modern amenities, spacious gardens, and premium finishes throughout.",
    status: "For Sale",
    views: 2847,
    inquiries: 156,
    conversion: 5.5,
    agent: {
      name: "Sarah Kimani",
      email: "sarah@hamaestate.com",
      phone: "+254 700 123 456",
      avatar: "SK"
    },
    features: ["Swimming Pool", "Garden", "Security", "Parking", "Servant Quarters"],
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Modern Apartment in Westlands",
    type: "Apartment",
    price: 25000000,
    monthlyRent: 180000,
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg"
    ],
    bedroom: 3,
    bathroom: 2,
    size: 120,
    latitude: -1.2541,
    longitude: 36.8136,
    city: "Nairobi",
    neighborhood: "Westlands",
    address: "Woodvale Grove, Westlands",
    school: "Braeburn School - 2km",
    bus: "Westlands Hub - 300m",
    restaurant: "Artcaffe - 200m",
    description: "Contemporary apartment in the heart of Westlands with city views and modern amenities.",
    status: "For Rent",
    views: 2341,
    inquiries: 132,
    conversion: 5.6,
    agent: {
      name: "David Ochieng",
      email: "david@hamaestate.com",
      phone: "+254 700 234 567",
      avatar: "DO"
    },
    features: ["Balcony", "Gym", "Security", "Parking", "Elevator"],
    createdAt: "2024-01-20"
  },
  {
    id: 3,
    title: "Family Home in Lavington",
    type: "House",
    price: 65000000,
    monthlyRent: 350000,
    images: [
      "https://images.pexels.com/photos/1643385/pexels-photo-1643385.jpeg",
      "https://images.pexels.com/photos/1643386/pexels-photo-1643386.jpeg"
    ],
    bedroom: 4,
    bathroom: 3,
    size: 280,
    latitude: -1.3151,
    longitude: 36.8156,
    city: "Nairobi",
    neighborhood: "Lavington",
    address: "James Gichuru Road, Lavington",
    school: "Brookhouse School - 1.5km",
    bus: "Lavington Mall - 400m",
    restaurant: "Java House - 300m",
    description: "Beautiful family home in the quiet Lavington neighborhood, perfect for families.",
    status: "For Sale",
    views: 1923,
    inquiries: 98,
    conversion: 5.1,
    agent: {
      name: "Grace Wanjiku",
      email: "grace@hamaestate.com",
      phone: "+254 700 345 678",
      avatar: "GW"
    },
    features: ["Garden", "Security", "Parking", "Study Room", "Fireplace"],
    createdAt: "2024-01-10"
  },
  {
    id: 4,
    title: "Studio in Kilimani",
    type: "Studio",
    price: 8500000,
    monthlyRent: 65000,
    images: [
      "https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg"
    ],
    bedroom: 1,
    bathroom: 1,
    size: 45,
    latitude: -1.3081,
    longitude: 36.8156,
    city: "Nairobi",
    neighborhood: "Kilimani",
    address: "Argwings Kodhek Road, Kilimani",
    school: "ISK - 2km",
    bus: "Kilimani Junction - 200m",
    restaurant: "Tribe Hotel - 500m",
    description: "Cozy studio apartment in the vibrant Kilimani area, perfect for young professionals.",
    status: "For Rent",
    views: 1654,
    inquiries: 87,
    conversion: 5.3,
    agent: {
      name: "Michael Otieno",
      email: "michael@hamaestate.com",
      phone: "+254 700 456 789",
      avatar: "MO"
    },
    features: ["Furnished", "Security", "Parking", "Internet"],
    createdAt: "2024-01-25"
  },
  {
    id: 5,
    title: "Townhouse in Runda",
    type: "Townhouse",
    price: 45000000,
    monthlyRent: 280000,
    images: [
      "https://images.pexels.com/photos/1643387/pexels-photo-1643387.jpeg"
    ],
    bedroom: 3,
    bathroom: 2,
    size: 180,
    latitude: -1.2201,
    longitude: 36.8156,
    city: "Nairobi",
    neighborhood: "Runda",
    address: "Runda Estate, Runda",
    school: "Braeburn Garden Estate - 1km",
    bus: "Runda Roundabout - 800m",
    restaurant: "Runda Mall - 1.2km",
    description: "Elegant townhouse in the exclusive Runda estate with modern amenities.",
    status: "For Sale",
    views: 1432,
    inquiries: 76,
    conversion: 5.3,
    agent: {
      name: "Faith Muthoni",
      email: "faith@hamaestate.com",
      phone: "+254 700 567 890",
      avatar: "FM"
    },
    features: ["Garden", "Security", "Parking", "Community Pool"],
    createdAt: "2024-01-18"
  }
];

// User Data
export const hamaUsers = [
  {
    id: 1,
    name: "Mich Michira",
    email: "mich@hamaestate.com",
    role: "admin",
    avatar: "MM",
    phone: "+254 700 000 001",
    joinDate: "2023-01-15",
    lastLogin: "2024-01-30T10:30:00Z",
    propertiesCount: 5,
    savedPropertiesCount: 12
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    avatar: "JD",
    phone: "+254 700 000 002",
    joinDate: "2024-01-10",
    lastLogin: "2024-01-30T09:15:00Z",
    propertiesCount: 0,
    savedPropertiesCount: 3
  },
  {
    id: 3,
    name: "Sarah Mwangi",
    email: "sarah@example.com",
    role: "user",
    avatar: "SM",
    phone: "+254 700 000 003",
    joinDate: "2024-01-25",
    lastLogin: "2024-01-30T08:45:00Z",
    propertiesCount: 0,
    savedPropertiesCount: 7
  },
  {
    id: 4,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "user",
    avatar: "MJ",
    phone: "+254 700 000 004",
    joinDate: "2024-01-20",
    lastLogin: "2024-01-30T07:30:00Z",
    propertiesCount: 0,
    savedPropertiesCount: 5
  },
  {
    id: 5,
    name: "Lisa Kamau",
    email: "lisa@example.com",
    role: "user",
    avatar: "LK",
    phone: "+254 700 000 005",
    joinDate: "2024-01-22",
    lastLogin: "2024-01-30T06:20:00Z",
    propertiesCount: 0,
    savedPropertiesCount: 2
  }
];

// Analytics Data
export const hamaAnalytics = {
  stats: {
    totalRevenue: 12500000,
    totalProperties: 247,
    totalUsers: 1842,
    totalViews: 15678,
    avgPropertyPrice: 8500000,
    conversionRate: 5.4,
    activeListings: 189,
    soldThisMonth: 23
  },
  
  monthlyData: {
    revenue: [1200000, 1900000, 1500000, 2500000, 2200000, 3000000, 2800000],
    properties: [25, 32, 28, 40, 35, 45, 42],
    views: [450, 520, 480, 600, 580, 720, 680],
    inquiries: [45, 62, 58, 75, 69, 82, 78]
  },
  
  topProperties: [
    { name: 'Luxury Villa in Karen', views: 2847, inquiries: 156, conversion: 5.5 },
    { name: 'Modern Apartment in Westlands', views: 2341, inquiries: 132, conversion: 5.6 },
    { name: 'Family Home in Lavington', views: 1923, inquiries: 98, conversion: 5.1 },
    { name: 'Studio in Kilimani', views: 1654, inquiries: 87, conversion: 5.3 },
    { name: 'Townhouse in Runda', views: 1432, inquiries: 76, conversion: 5.3 }
  ],
  
  locationData: [
    { name: 'Westlands', value: 28, color: '#3B82F6' },
    { name: 'Karen', value: 24, color: '#10B981' },
    { name: 'Kilimani', value: 18, color: '#F59E0B' },
    { name: 'Lavington', value: 16, color: '#EF4444' },
    { name: 'Others', value: 14, color: '#8B5CF6' }
  ],
  
  recentActivity: [
    { 
      id: 1, 
      type: 'property_viewed', 
      property: 'Luxury Villa in Karen', 
      time: '2 minutes ago', 
      user: 'john@example.com', 
      avatar: 'JD' 
    },
    { 
      id: 2, 
      type: 'property_added', 
      property: 'Modern Apartment in Westlands', 
      time: '15 minutes ago', 
      user: 'mich@hamaestate.com', 
      avatar: 'MM' 
    },
    { 
      id: 3, 
      type: 'user_registered', 
      user: 'sarah@example.com', 
      time: '1 hour ago', 
      avatar: 'SM' 
    },
    { 
      id: 4, 
      type: 'property_favorited', 
      property: 'Family Home in Lavington', 
      time: '2 hours ago', 
      user: 'mike@example.com', 
      avatar: 'MJ' 
    },
    { 
      id: 5, 
      type: 'contact_request', 
      property: 'Studio in Kilimani', 
      time: '3 hours ago', 
      user: 'lisa@example.com', 
      avatar: 'LK' 
    }
  ]
};

// API Functions
export const hamaEstateAPI = {
  // Get all properties
  getProperties: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(hamaProperties), 500);
    });
  },
  
  // Get property by ID
  getProperty: (id) => {
    return new Promise((resolve) => {
      const property = hamaProperties.find(p => p.id === id);
      setTimeout(() => resolve(property), 300);
    });
  },
  
  // Get all users
  getUsers: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(hamaUsers), 500);
    });
  },
  
  // Get analytics data
  getAnalytics: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(hamaAnalytics), 800);
    });
  },
  
  // Get dashboard stats
  getDashboardStats: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(hamaAnalytics.stats), 300);
    });
  },
  
  // Get recent activity
  getRecentActivity: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(hamaAnalytics.recentActivity), 400);
    });
  },
  
  // Get top properties
  getTopProperties: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(hamaAnalytics.topProperties), 400);
    });
  },
  
  // Get location distribution
  getLocationData: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(hamaAnalytics.locationData), 300);
    });
  },
  
  // Get monthly data
  getMonthlyData: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(hamaAnalytics.monthlyData), 400);
    });
  }
};

export default hamaEstateAPI; 