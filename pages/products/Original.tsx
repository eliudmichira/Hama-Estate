import React from 'react';
import ProductDetail from '../../components/ui/ProductDetail';
import type { ProductDetailProps } from '../../components/ui/ProductDetail';
import { Shield, Leaf, Activity } from 'lucide-react';

// Import local images
import strawberryBottle from '../../assets/bogani strawberry 1 litre.jpg';
import brandYogurt from '../../assets/brand yorughut.jpg';
import topDownCup from '../../assets/top down cup image.jpg';
import redCupWithBerries from '../../assets/red cup with strawberries beside it.jpg';

const originalProduct: ProductDetailProps['product'] = {
  id: 'original-probiotic',
  name: 'Original Probiotic Yogurt',
  tagline: 'Pure, creamy goodness packed with live cultures',
  description: 'Our signature probiotic yogurt is crafted using traditional methods and the finest local milk. Each serving delivers billions of live cultures and a rich, creamy taste that\'s perfectly balanced - not too tart, not too sweet.',
  price: 250.00,
  sizes: ['250ml', '500ml', '1L'],
  images: [
    strawberryBottle,
    brandYogurt, 
    topDownCup,
    redCupWithBerries
  ],
  benefits: [
    {
      icon: <Shield size={24} />,
      title: 'Immune Support',
      description: 'Strengthens your natural defenses with beneficial probiotics'
    },
    {
      icon: <Leaf size={24} />,
      title: 'All Natural',
      description: '100% natural ingredients, no artificial additives'
    },
    {
      icon: <Activity size={24} />,
      title: 'Gut Health',
      description: 'Promotes healthy digestion and nutrient absorption'
    }
  ],
  nutritionFacts: {
    servingSize: '100g',
    calories: 120,
    protein: 8,
    carbs: 9,
    fat: 5,
    probiotics: '1 billion CFU per serving'
  },
  ingredients: [
    'Fresh Local Milk',
    'Live Bacterial Cultures',
    'Streptococcus Thermophilus',
    'Lactobacillus Bulgaricus',
    'Bifidobacterium',
    'Lactobacillus Acidophilus'
  ]
};

const OriginalProduct: React.FC = () => {
  return <ProductDetail product={originalProduct} />;
};

export default OriginalProduct; 