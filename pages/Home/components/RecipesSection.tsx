import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import SectionHeading from '../../../components/ui/SectionHeading'; // Ensure this path is correct

// Image imports - these correspond to image4, image5, image6 aliases in Home.tsx
import recipeImg1 from '../../../assets/bogani  profile with order now  number.jpg';
import recipeImg2 from '../../../assets/bogani big  all bottles picture with flavours.jpg';
import recipeImg3 from '../../../assets/bogani in super markets and shops.jpg';

// Define Recipe interface
export interface Recipe {
  title: string;
  description: string;
  image: string;
  prepTime: string;
  category: string;
  difficulty: string;
}

// Define RecipeCardProps interface
export interface RecipeCardProps {
  recipe: Recipe;
  isVisible?: boolean;
}

// Define RecipeCard component
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isVisible = true }) => {
  return (
    <motion.div
      className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 h-full transform transition-transform"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.5, delay: 0.2 }} // Stagger animation slightly
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          {recipe.category}
        </div>
      </div>
      <div className="p-5 flex flex-col h-[calc(100%-12rem)]"> {/* Ensure class matches Home.tsx for consistency if needed */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <Clock className="w-3 h-3 mr-1" /> {recipe.prepTime}
          </span>
          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
            {recipe.difficulty}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-emerald-700 dark:text-emerald-400">{recipe.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">{recipe.description}</p>
        <a href="#" className="text-emerald-600 dark:text-emerald-400 font-medium text-sm mt-auto inline-flex items-center hover:text-emerald-700 dark:hover:text-emerald-300">
          View Recipe <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </motion.div>
  );
};

// Sample recipes data
const recipesData: Recipe[] = [
  {
    title: "Berry Breakfast Bowl",
    description: "Start your day with our protein-packed yogurt bowl topped with fresh berries, honey, and granola.",
    image: recipeImg1,
    prepTime: "5 min",
    category: "Breakfast",
    difficulty: "Easy"
  },
  {
    title: "Cucumber Yogurt Dip",
    description: "A refreshing tzatziki-inspired dip perfect for vegetables, pita bread, or as a sauce for grilled meats.",
    image: recipeImg2,
    prepTime: "10 min",
    category: "Appetizer",
    difficulty: "Easy"
  },
  {
    title: "Mango Lassi Smoothie",
    description: "A tropical smoothie made with our yogurt, fresh mango, and a hint of cardamom for an energy boost.",
    image: recipeImg3,
    prepTime: "7 min",
    category: "Beverage",
    difficulty: "Easy"
  }
];

interface RecipesSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
  visibleSections: string[];
}

const RecipesSection: React.FC<RecipesSectionProps> = ({
  sectionRef,
  visibleSections,
}) => {
  return (
    <section
      ref={sectionRef}
      id="recipes"
      className="py-24 bg-gray-100 dark:bg-slate-950" // Class from original Home.tsx for this section
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Delicious Recipes with Bogani"
          subtitle="Unlock new flavors and healthy meals with our versatile probiotic yogurt."
          isVisible={visibleSections.includes('recipes')}
          highlightWord="Recipes"
          className="text-center"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {recipesData.map((recipe, index) => (
            <RecipeCard
              key={recipe.title}
              recipe={recipe}
              isVisible={visibleSections.includes('recipes')} // Pass isVisible for card animation
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipesSection;
