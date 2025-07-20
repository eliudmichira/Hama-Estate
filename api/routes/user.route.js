import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const app = express();
const router = express.Router()

router.get("/", getUsers);
router.get("/:id", verifyToken, getUser);
router.get("/profilePosts", verifyToken, (req, res) => {
  // Mock response for profile posts
  res.json({
    data: [
      {
        id: "1",
        title: "Modern Downtown Apartment",
        price: 2500,
        img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
        address: "123 Main St",
        bedroom: 2,
        bathroom: 2,
        latitude: 40.7128,
        longitude: -74.0060
      },
      {
        id: "2", 
        title: "Luxury Family Home",
        price: 750000,
        img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
        address: "456 Oak Ave",
        bedroom: 4,
        bathroom: 3,
        latitude: 40.7589,
        longitude: -73.9851
      }
    ]
  });
});
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

// In-memory storage for user preferences (in production, use a database)
const userPreferences = new Map();

// Get user preferences
router.get("/:userId/preferences", async (req, res) => {
  try {
    const { userId } = req.params;
    const preferences = userPreferences.get(userId) || {
      favorites: [],
      savedSearches: [],
      preferences: {
        notifications: true,
        emailAlerts: true,
        priceRange: { min: 0, max: 1000000 },
        preferredAreas: [],
        homeTypes: []
      }
    };
    
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: "Failed to get user preferences" });
  }
});

// Update user preferences
router.put("/:userId/preferences", async (req, res) => {
  try {
    const { userId } = req.params;
    const { favorites, savedSearches, preferences } = req.body;
    
    const currentPreferences = userPreferences.get(userId) || {
      favorites: [],
      savedSearches: [],
      preferences: {
        notifications: true,
        emailAlerts: true,
        priceRange: { min: 0, max: 1000000 },
        preferredAreas: [],
        homeTypes: []
      }
    };
    
    const updatedPreferences = {
      favorites: favorites || currentPreferences.favorites,
      savedSearches: savedSearches || currentPreferences.savedSearches,
      preferences: preferences || currentPreferences.preferences
    };
    
    userPreferences.set(userId, updatedPreferences);
    
    res.json({ success: true, message: "Preferences updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user preferences" });
  }
});

// Add to favorites
router.post("/:userId/favorites", async (req, res) => {
  try {
    const { userId } = req.params;
    const property = req.body;
    
    const currentPreferences = userPreferences.get(userId) || {
      favorites: [],
      savedSearches: [],
      preferences: {}
    };
    
    const isAlreadyFavorite = currentPreferences.favorites.some(fav => fav.id === property.id);
    if (!isAlreadyFavorite) {
      const newFavorite = {
        ...property,
        addedAt: new Date().toISOString(),
        userId: userId
      };
      currentPreferences.favorites.push(newFavorite);
      userPreferences.set(userId, currentPreferences);
    }
    
    res.json({ success: true, favorites: currentPreferences.favorites });
  } catch (error) {
    res.status(500).json({ error: "Failed to add to favorites" });
  }
});

// Remove from favorites
router.delete("/:userId/favorites/:propertyId", async (req, res) => {
  try {
    const { userId, propertyId } = req.params;
    
    const currentPreferences = userPreferences.get(userId);
    if (currentPreferences) {
      currentPreferences.favorites = currentPreferences.favorites.filter(
        fav => fav.id !== propertyId
      );
      userPreferences.set(userId, currentPreferences);
    }
    
    res.json({ success: true, favorites: currentPreferences?.favorites || [] });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove from favorites" });
  }
});

// Save search
router.post("/:userId/searches", async (req, res) => {
  try {
    const { userId } = req.params;
    const searchCriteria = req.body;
    
    const currentPreferences = userPreferences.get(userId) || {
      favorites: [],
      savedSearches: [],
      preferences: {}
    };
    
    const newSearch = {
      id: Date.now().toString(),
      ...searchCriteria,
      createdAt: new Date().toISOString(),
      userId: userId
    };
    
    currentPreferences.savedSearches = [newSearch, ...currentPreferences.savedSearches.slice(0, 9)];
    userPreferences.set(userId, currentPreferences);
    
    res.json({ success: true, savedSearches: currentPreferences.savedSearches });
  } catch (error) {
    res.status(500).json({ error: "Failed to save search" });
  }
});

// Remove saved search
router.delete("/:userId/searches/:searchId", async (req, res) => {
  try {
    const { userId, searchId } = req.params;
    
    const currentPreferences = userPreferences.get(userId);
    if (currentPreferences) {
      currentPreferences.savedSearches = currentPreferences.savedSearches.filter(
        search => search.id !== searchId
      );
      userPreferences.set(userId, currentPreferences);
    }
    
    res.json({ success: true, savedSearches: currentPreferences?.savedSearches || [] });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove saved search" });
  }
});

export default router;