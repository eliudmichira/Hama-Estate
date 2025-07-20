import express from "express";

const router = express.Router();

// GET /api/posts - Get all posts
router.get("/", (req, res) => {
    // For now, return mock data until database is set up
    const mockPosts = [
        {
            id: "1",
            title: "Modern Downtown Apartment",
            price: 2500,
            img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
            address: "123 Main St",
            city: "New York",
            bedroom: 2,
            bathroom: 2,
            type: "rent",
            property: "apartment",
            latitude: 40.7128,
            longitude: -74.0060
        },
        {
            id: "2", 
            title: "Luxury Family Home",
            price: 750000,
            img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
            address: "456 Oak Ave",
            city: "Los Angeles",
            bedroom: 4,
            bathroom: 3,
            type: "buy",
            property: "house",
            latitude: 34.0522,
            longitude: -118.2437
        },
        {
            id: "3",
            title: "Cozy Studio in City Center",
            price: 1800,
            img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
            address: "789 Pine St",
            city: "Chicago",
            bedroom: 1,
            bathroom: 1,
            type: "rent",
            property: "apartment",
            latitude: 41.8781,
            longitude: -87.6298
        }
    ];
    
    res.json(mockPosts);
});

// GET /api/posts/:id - Get single post
router.get("/:id", (req, res) => {
    const { id } = req.params;
    // Mock single post data with all required fields
    const mockPost = {
        id: id,
        title: "Modern Downtown Apartment",
        price: 2500,
        img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
        ],
        address: "123 Main St",
        city: "New York",
        bedroom: 2,
        bathroom: 2,
        type: "rent",
        property: "apartment",
        latitude: 40.7128,
        longitude: -74.0060,
        isSaved: false,
        user: {
            id: "1",
            username: "John Doe",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
        },
        postDetail: {
            desc: "Beautiful modern apartment in the heart of downtown with amazing city views. This stunning 2-bedroom, 2-bathroom apartment features high ceilings, large windows, and premium finishes throughout. The open-concept living area flows seamlessly into the gourmet kitchen with stainless steel appliances and granite countertops. Both bedrooms are generously sized with ample closet space. The master suite includes an en-suite bathroom with dual vanities and a walk-in shower. Building amenities include a fitness center, rooftop terrace, 24/7 doorman, and parking garage. Located in a prime downtown location with easy access to shopping, dining, and public transportation.",
            utilities: "owner",
            pet: "Allowed",
            income: 7500,
            size: "1,200 sq ft",
            school: 800,
            bus: 500,
            restaurant: 1000
        }
    };
    
    res.json(mockPost);
});

// POST /api/posts - Create new post
router.post("/", (req, res) => {
    const { postData, postDetail } = req.body;
    // Mock response for creating a post
    const newPost = {
        id: Date.now().toString(),
        ...postData,
        ...postDetail,
        createdAt: new Date().toISOString()
    };
    
    res.status(201).json(newPost);
});

router.get("/test", (req, res) =>{
    res.send("router works")
});

router.post("/test", (req, res) =>{
   res.send("router dont  works")
});

export default router;