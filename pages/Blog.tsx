import { useState } from 'react';import { motion, AnimatePresence } from 'framer-motion';import {   Search,   Calendar,   Clock,   Tag,   ChevronRight,   ArrowRight,   Share2,   Heart,   MessageSquare,   Bookmark,  ArrowUpRight,  Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

// Define interface for BlogPost
interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorImage: string;
  slug: string;
  content: string;
}

// Define interface for ArticleCard props
interface ArticleCardProps {
  image: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorImage: string;
  slug: string;
}

// Mock data for blog posts
const mockBlogPosts: BlogPost[] = [
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    title: "5 Ways Probiotics Can Improve Your Immune System",
    excerpt: "Recent studies show that regular consumption of probiotics can strengthen your body's natural defenses. Here's how they work.",
    category: "Wellness",
    date: "May 10, 2025",
    readTime: "7 min read",
    author: "Sarah Kimani",
    authorRole: "Health Writer",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    slug: "probiotics-immune-system",
    content: `
      <p>Probiotics are live microorganisms that, when consumed in adequate amounts, provide health benefits to the host. Here are five ways they can boost your immune system:</p>
      <ol>
        <li><strong>Enhance Gut Barrier:</strong> Probiotics help maintain the integrity of the gut lining, preventing harmful pathogens from entering the bloodstream.</li>
        <li><strong>Stimulate Immune Cells:</strong> They activate immune cells such as macrophages and T lymphocytes, which are crucial for fighting infections.</li>
        <li><strong>Balance Microbiota:</strong> A healthy balance of gut bacteria supports overall immune function and reduces inflammation.</li>
        <li><strong>Reduce Allergies:</strong> Some probiotic strains have been shown to decrease the incidence of allergies and eczema in children.</li>
        <li><strong>Shorten Illness Duration:</strong> Regular probiotic intake can reduce the duration and severity of common colds and respiratory infections.</li>
      </ol>
      <p>Incorporating probiotic-rich foods like yogurt into your daily diet is a simple way to support your immune health.</p>
    `
  },
  {
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    title: "Yogurt Parfait: 3 Delicious Recipes for Breakfast",
    excerpt: "Start your day with these nutritious and delicious yogurt parfait recipes that take less than 5 minutes to prepare.",
    category: "Recipes",
    date: "May 8, 2025",
    readTime: "5 min read",
    author: "Chef Daniel Odhiambo",
    authorRole: "Culinary Expert",
    authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
    slug: "yogurt-parfait-recipes",
    content: `
      <p>Yogurt parfaits are a quick, healthy, and customizable breakfast option. Here are three recipes to try:</p>
      <h4>1. Classic Berry Parfait</h4>
      <ul>
        <li>1 cup probiotic yogurt</li>
        <li>1/2 cup mixed berries (strawberries, blueberries, raspberries)</li>
        <li>1/4 cup granola</li>
      </ul>
      <p>Layer yogurt, berries, and granola in a glass. Repeat and enjoy!</p>
      <h4>2. Tropical Sunrise Parfait</h4>
      <ul>
        <li>1 cup vanilla yogurt</li>
        <li>1/2 cup diced mango & pineapple</li>
        <li>2 tbsp shredded coconut</li>
      </ul>
      <p>Layer all ingredients and top with coconut for a tropical twist.</p>
      <h4>3. Nutty Banana Parfait</h4>
      <ul>
        <li>1 cup plain yogurt</li>
        <li>1 banana, sliced</li>
        <li>2 tbsp chopped walnuts</li>
        <li>1 tsp honey</li>
      </ul>
      <p>Layer yogurt, banana, and walnuts. Drizzle with honey before serving.</p>
    `
  },
  {
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    title: "The Link Between Gut Health and Mental Wellbeing",
    excerpt: "Emerging research shows a strong connection between gut bacteria and brain function. Learn about the gut-brain axis.",
    category: "Gut Health",
    date: "May 5, 2025",
    readTime: "9 min read",
    author: "Dr. Faith Njoroge",
    authorRole: "Neurobiologist",
    authorImage: "https://randomuser.me/api/portraits/women/65.jpg",
    slug: "gut-health-mental-wellbeing",
    content: `
      <p>The gut-brain axis is a complex communication network linking your gut and brain. Here's how gut health impacts mental wellbeing:</p>
      <ul>
        <li><strong>Neurotransmitter Production:</strong> Gut bacteria produce neurotransmitters like serotonin, which influence mood and anxiety.</li>
        <li><strong>Inflammation Control:</strong> A healthy gut reduces inflammation, which is linked to depression and cognitive decline.</li>
        <li><strong>Stress Response:</strong> Probiotics can help regulate the body's response to stress by modulating cortisol levels.</li>
      </ul>
      <p>Supporting your gut with probiotics may improve not only digestion but also your mental health.</p>
    `
  },
  {
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80",
    title: "Behind the Scenes: How We Source Our Milk",
    excerpt: "Take a journey with us to the highlands of Kenya where we source the freshest milk for our probiotic yogurt products.",
    category: "Community",
    date: "May 3, 2025",
    readTime: "6 min read",
    author: "Joseph Waweru",
    authorRole: "Supply Chain Manager",
    authorImage: "https://randomuser.me/api/portraits/men/41.jpg",
    slug: "milk-sourcing-story",
    content: `
      <p>Our commitment to quality starts at the source. We partner with local farmers in the Kenyan highlands to ensure our milk is fresh, ethical, and sustainable.</p>
      <ul>
        <li>Direct relationships with smallholder farmers</li>
        <li>Strict quality control and regular farm visits</li>
        <li>Fair pricing and community support initiatives</li>
      </ul>
      <p>Every cup of Bogani yogurt supports local communities and delivers the best nutrition to your family.</p>
    `
  },
  {
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    title: "Understanding Lactose Intolerance: Myths and Facts",
    excerpt: "Many people with lactose intolerance can still enjoy certain dairy products. We separate fact from fiction.",
    category: "Nutrition",
    date: "April 29, 2025",
    readTime: "8 min read",
    author: "Dr. James Mwangi",
    authorRole: "Nutritionist & Research Lead",
    authorImage: "https://randomuser.me/api/portraits/men/33.jpg",
    slug: "lactose-intolerance-myths",
    content: `
      <p>Lactose intolerance doesn't mean you have to give up dairy. Here are some common myths and the real facts:</p>
      <ul>
        <li><strong>Myth:</strong> All dairy causes discomfort. <strong>Fact:</strong> Many can tolerate yogurt and hard cheeses.</li>
        <li><strong>Myth:</strong> Lactose intolerance is an allergy. <strong>Fact:</strong> It's a digestive issue, not an immune response.</li>
        <li><strong>Myth:</strong> Only children are affected. <strong>Fact:</strong> It can develop at any age.</li>
      </ul>
      <p>Try probiotic yogurt for a gut-friendly, nutritious option even if you're lactose intolerant.</p>
    `
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    title: "Simple Swaps for a Healthier Diet This Summer",
    excerpt: "Small changes can make a big difference in your nutrition. Here are some easy food swaps that improve your health.",
    category: "Wellness",
    date: "April 25, 2025",
    readTime: "6 min read",
    author: "Sarah Kimani",
    authorRole: "Health Writer",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    slug: "healthier-diet-swaps",
    content: `
      <p>Upgrade your diet with these simple swaps:</p>
      <ul>
        <li>Choose Greek yogurt over sour cream for more protein and probiotics.</li>
        <li>Swap sugary drinks for infused water or kefir.</li>
        <li>Use whole grains instead of refined flours in baking and cooking.</li>
      </ul>
      <p>Small, consistent changes add up to big health benefits over time!</p>
    `
  },
  {
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    title: "The Ultimate Guide to Gut Health: Understanding Your Microbiome",
    excerpt: "Your gut is home to trillions of bacteria that play a crucial role in your overall health. In this comprehensive guide, we explore the fascinating world of gut bacteria and how they influence everything from digestion to immunity and even mental health.",
    category: "Gut Health",
    date: "May 15, 2025",
    readTime: "10 min read",
    author: "Dr. James Mwangi",
    authorRole: "Nutritionist & Research Lead",
    authorImage: "https://randomuser.me/api/portraits/men/33.jpg",
    slug: "ultimate-guide-to-gut-health",
    content: `
      <p>The human gut is a complex ecosystem teeming with trillions of bacteria, fungi, and other microorganisms. This community, known as the microbiome, is essential for digestion, immunity, and even mental health.</p>
      <h4>What is the Microbiome?</h4>
      <p>The microbiome consists of beneficial and sometimes harmful microbes. A balanced microbiome supports nutrient absorption, vitamin production, and protection against pathogens.</p>
      <h4>How to Support Your Gut Health</h4>
      <ul>
        <li>Eat a diverse range of fiber-rich fruits and vegetables.</li>
        <li>Include fermented foods like yogurt, kefir, and sauerkraut.</li>
        <li>Limit processed foods and added sugars.</li>
        <li>Stay hydrated and manage stress.</li>
      </ul>
      <p>By nurturing your microbiome, you can improve digestion, boost immunity, and support overall wellbeing.</p>
    `
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    title: "Fermented Foods: The Secret to a Happy Gut",
    excerpt: "Discover why fermented foods like yogurt, kimchi, and kefir are essential for gut health and how to add them to your diet.",
    category: "Nutrition",
    date: "April 20, 2025",
    readTime: "6 min read",
    author: "Chef Daniel Odhiambo",
    authorRole: "Culinary Expert",
    authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
    slug: "fermented-foods-happy-gut",
    content: `
      <p>Fermented foods are rich in probiotics, which help balance your gut microbiota. Try adding these to your meals:</p>
      <ul>
        <li>Yogurt and kefir</li>
        <li>Kimchi and sauerkraut</li>
        <li>Miso and tempeh</li>
      </ul>
      <p>Regularly eating fermented foods can improve digestion, boost immunity, and even enhance mood.</p>
    `
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    title: "How to Read Yogurt Labels Like a Pro",
    excerpt: "Not all yogurts are created equal. Learn what to look for on labels to choose the healthiest options for you and your family.",
    category: "Wellness",
    date: "April 15, 2025",
    readTime: "5 min read",
    author: "Sarah Kimani",
    authorRole: "Health Writer",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    slug: "read-yogurt-labels",
    content: `
      <p>When shopping for yogurt, check for these key features:</p>
      <ul>
        <li><strong>Live & Active Cultures:</strong> Look for yogurts with live probiotics for maximum health benefits.</li>
        <li><strong>Low Added Sugar:</strong> Choose plain or lightly sweetened varieties.</li>
        <li><strong>High Protein:</strong> Greek yogurt is a great option for extra protein.</li>
      </ul>
      <p>Reading labels helps you make informed choices for your health and your family's wellbeing.</p>
    `
  },
  {
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    title: "Kids & Probiotics: What Parents Should Know",
    excerpt: "Are probiotics safe and beneficial for children? We break down the science and offer tips for parents.",
    category: "Community",
    date: "April 10, 2025",
    readTime: "7 min read",
    author: "Dr. Faith Njoroge",
    authorRole: "Neurobiologist",
    authorImage: "https://randomuser.me/api/portraits/women/65.jpg",
    slug: "kids-probiotics-guide",
    content: `
      <p>Probiotics can be safe and beneficial for children when chosen carefully. Here's what parents should know:</p>
      <ul>
        <li>Choose age-appropriate probiotic strains.</li>
        <li>Start with small amounts and monitor for any reactions.</li>
        <li>Consult your pediatrician before starting supplements.</li>
      </ul>
      <p>Including probiotic-rich foods in your child's diet can support their digestive and immune health.</p>
    `
  },
  {
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    title: "Yogurt vs. Kefir: Which Is Better for You?",
    excerpt: "Both yogurt and kefir are probiotic-rich, but which one should you choose? We compare their benefits and uses.",
    category: "Nutrition",
    date: "April 5, 2025",
    readTime: "6 min read",
    author: "Joseph Waweru",
    authorRole: "Supply Chain Manager",
    authorImage: "https://randomuser.me/api/portraits/men/41.jpg",
    slug: "yogurt-vs-kefir",
    content: `
      <p>Yogurt and kefir are both excellent sources of probiotics, but they have some differences:</p>
      <ul>
        <li><strong>Texture:</strong> Yogurt is thicker, while kefir is drinkable.</li>
        <li><strong>Probiotic Diversity:</strong> Kefir contains more strains of beneficial bacteria.</li>
        <li><strong>Flavor:</strong> Yogurt is milder, kefir is tangier.</li>
      </ul>
      <p>Try both and see which one you prefer for your gut health journey!</p>
    `
  }
];

const BlogPage = () => {
  // State for filters and search
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Categories - can be fetched from an API in a real app
  const categories = ['All', 'Gut Health', 'Recipes', 'Wellness', 'Nutrition', 'Community'];
  
  // Animated hero reference
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Filter posts based on category and search
  const filterPosts = (posts: BlogPost[]): BlogPost[] => {
    return posts
      .filter(post => activeCategory === 'All' || post.category === activeCategory)
      .filter(post => 
        searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden" ref={heroRef}>
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 z-0">
          <motion.div 
            className="absolute top-40 right-20 w-96 h-96 rounded-full bg-primaryRed/5 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-20 left-40 w-80 h-80 rounded-full bg-accentGreen/5 blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNEMzAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC0xMmMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTEyIDEyYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMTIgMGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bS0yNCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC0xMmMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTAgMTJjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyeiIvPjwvZz48L2c+PC9zdmc+')]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-primaryRed/10 text-primaryRed font-medium text-sm">
                Bogani Blog
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            >
              Insights for <span className="text-primaryRed">Healthier</span> Living
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-gray-600 dark:text-gray-300"
            >
              Explore articles on gut health, wellness tips, and the science behind our probiotic yogurt.
            </motion.p>
          </div>

          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl p-4 md:p-6 border border-white/30 dark:border-gray-700/30">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-white/60 dark:bg-gray-700/60 rounded-lg border-0 focus:ring-2 focus:ring-primaryRed text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 overflow-hidden z-0">
          <svg viewBox="0 0 1440 320" className="absolute top-0 -left-40 w-[150%] opacity-5">
            <path 
              fill="#D50000" 
              d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white inline-block">Featured Article</h2>
            <div className="h-1 w-24 bg-primaryRed mt-2 rounded-full"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/30 dark:border-gray-700/30">
            <div className="lg:w-1/2 relative overflow-hidden h-64 lg:h-auto">
              <img 
                src="/src/assets/blog/featured-article.jpg" 
                alt="The Ultimate Guide to Gut Health" 
                className="absolute w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="px-3 py-1 bg-primaryRed text-white text-xs font-bold rounded-full w-fit">Featured</span>
              </div>
            </div>

            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-accentGreen/10 text-accentGreen text-xs font-bold rounded-full">Gut Health</span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar size={14} className="mr-1" />
                    May 15, 2025
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Clock size={14} className="mr-1" />
                    10 min read
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Ultimate Guide to Gut Health: Understanding Your Microbiome</h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your gut is home to trillions of bacteria that play a crucial role in your overall health. In this comprehensive guide, we explore the fascinating world of gut bacteria and how they influence everything from digestion to immunity and even mental health.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src="/src/assets/blog/authors/dr-mwangi.jpg" 
                    alt="Dr. James Mwangi" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 mr-3"
                  />
                  <div>
                    <span className="block font-medium text-gray-900 dark:text-white text-sm">Dr. James Mwangi</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Nutritionist & Research Lead</span>
                  </div>
                </div>

                <Link to="/blog/ultimate-guide-to-gut-health" className="inline-flex items-center text-primaryRed hover:text-berry transition-colors font-medium text-sm">
                  Read Article
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white inline-block">Latest Articles</h2>
              <div className="h-1 w-20 bg-primaryRed mt-2 rounded-full"></div>
            </div>

            {/* Mobile Filters Toggle */}
            <button 
              className="mt-4 md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-white"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center space-x-2 mt-4 md:mt-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-primaryRed text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mb-8 overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 py-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? 'bg-primaryRed text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Filter and display blog posts */}
            {filterPosts(mockBlogPosts).map((post) => (
              <ArticleCard 
                key={post.slug}
                image={post.image}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                date={post.date}
                readTime={post.readTime}
                author={post.author}
                authorRole={post.authorRole}
                authorImage={post.authorImage}
                slug={post.slug}
              />
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-900 dark:text-white font-medium">
              Load More Articles
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white inline-block">Popular Topics</h2>
            <div className="h-1 w-20 bg-primaryRed mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Gut Health', icon: 'microbiome.svg', color: 'bg-primaryRed/10 text-primaryRed' },
              { name: 'Recipes', icon: 'recipe.svg', color: 'bg-accentGreen/10 text-accentGreen' },
              { name: 'Wellness', icon: 'wellness.svg', color: 'bg-berry/10 text-berry' },
              { name: 'Nutrition', icon: 'nutrition.svg', color: 'bg-blue-500/10 text-blue-500' },
              { name: 'Science', icon: 'science.svg', color: 'bg-amber-500/10 text-amber-500' },
              { name: 'Community', icon: 'community.svg', color: 'bg-teal-500/10 text-teal-500' }
            ].map((topic, index) => (
              <motion.div
                key={topic.name}
                className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/blog/category/${topic.name.toLowerCase()}`} className="block p-6">
                  <div className={`w-12 h-12 rounded-full ${topic.color} flex items-center justify-center mb-4`}>
                    <img src={`/src/assets/blog/icons/${topic.icon}`} alt={topic.name} className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{topic.name}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">View articles</span>
                  
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={16} className="text-gray-400 dark:text-gray-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-primaryRed to-berry text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full opacity-10"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated on Health & Wellness</h2>
              <p className="text-white/80 text-lg mb-6">
                Get the latest articles, recipes, and wellness tips delivered to your inbox.
              </p>
              <div className="flex items-stretch max-w-md">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none text-gray-800"
                />
                <button className="bg-accentGreen hover:bg-accentGreen/90 transition-colors px-6 py-3 rounded-r-lg font-medium">
                  Subscribe
                </button>
              </div>
              <p className="text-white/60 text-sm mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
                <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageSquare size={20} className="text-white" />
                  </div>
                  <p className="text-white font-medium">Monthly Digest</p>
                </div>
                <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Heart size={20} className="text-white" />
                  </div>
                  <p className="text-white font-medium">Health Tips</p>
                </div>
                <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Tag size={20} className="text-white" />
                  </div>
                  <p className="text-white font-medium">Exclusive Offers</p>
                </div>
                <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bookmark size={20} className="text-white" />
                  </div>
                  <p className="text-white font-medium">New Recipes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Article Card Component
const ArticleCard = ({ 
  image, 
  title, 
  excerpt, 
  category, 
  date, 
  readTime, 
  author, 
  authorRole, 
  authorImage, 
  slug 
}: ArticleCardProps) => {
  const [cardRef, cardInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/30 dark:border-gray-700/30 group h-full flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Bookmark size={16} />
              </button>
              <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
            category === 'Gut Health' ? 'bg-primaryRed text-white' :
            category === 'Recipes' ? 'bg-accentGreen text-white' :
            category === 'Wellness' ? 'bg-berry text-white' :
            category === 'Nutrition' ? 'bg-blue-500 text-white' :
            category === 'Community' ? 'bg-amber-500 text-white' :
            'bg-gray-500 text-white'
          }`}>
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            {readTime}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
          <Link to={`/blog/${slug}`} className="hover:text-primaryRed transition-colors">
            {title}
          </Link>
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 flex-1">
          {excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <img 
              src={authorImage} 
              alt={author} 
              className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-700 mr-3"
            />
            <div>
              <span className="block font-medium text-gray-900 dark:text-white text-sm">{author}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{authorRole}</span>
            </div>
          </div>

          <Link to={`/blog/${slug}`} className="text-primaryRed hover:text-berry transition-colors">
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Export mockBlogPosts for use in the post page
export { mockBlogPosts };

export default BlogPage;