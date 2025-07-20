import React from 'react';
import ProductDetail from '../../components/ui/ProductDetail';
import type { ProductDetailProps } from '../../components/ui/ProductDetail';
import { Shield, Leaf, Activity } from 'lucide-react';

// Import local images
import vanillaBottle from '../../assets/bogani vanila 1litre.jpg';
import vanillaFruits from '../../assets/vanilla with fruits beside the cup.jpg';
import vanillaPlain from '../../assets/vanilla.jpg';
import vanillaStrawberry from '../../assets/vanilla and straw berry.jpg';

const vanillaProduct: ProductDetailProps['product'] = {
  id: 'vanilla-bean',
  name: 'Vanilla Bean Probiotic Yogurt',
  tagline: 'Rich Madagascar vanilla meets creamy probiotic goodness',
  description: 'Indulge in the perfect harmony of premium Madagascar vanilla beans and our signature probiotic yogurt. Each spoonful delivers a luxurious taste experience while maintaining all the health benefits you love.',
  price: 280.00,
  sizes: ['250ml', '500ml', '1L'],
  images: [
    vanillaBottle,
    vanillaFruits,
    vanillaPlain,
    vanillaStrawberry
  ],
  benefits: [
    {
      icon: <Shield size={24} />,
      title: 'Natural Flavor',
      description: 'Real Madagascar vanilla beans for authentic taste'
    },
    {
      icon: <Leaf size={24} />,
      title: 'Clean Label',
      description: 'No artificial flavors, colors, or preservatives'
    },
    {
      icon: <Activity size={24} />,
      title: 'Digestive Health',
      description: 'Packed with beneficial probiotics for gut health'
    }
  ],
  nutritionFacts: {
    servingSize: '100g',
    calories: 130,
    protein: 8,
    carbs: 11,
    fat: 5,
    probiotics: '1 billion CFU per serving'
  },
  ingredients: [
    'Fresh Local Milk',
    'Madagascar Vanilla Beans',
    'Live Bacterial Cultures',
    'Streptococcus Thermophilus',
    'Lactobacillus Bulgaricus',
    'Bifidobacterium',
    'Lactobacillus Acidophilus'
  ]
};

const VanillaProduct: React.FC = () => {
  return <ProductDetail product={vanillaProduct} />;
};

export default VanillaProduct; 