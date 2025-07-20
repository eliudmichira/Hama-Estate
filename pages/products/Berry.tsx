import React from 'react';
import ProductDetail from '../../components/ui/ProductDetail';
import type { ProductDetailProps } from '../../components/ui/ProductDetail';
import { Shield, Leaf, Activity } from 'lucide-react';

// Import local images
import berryRedCup from '../../assets/berry red cup image.jpg';
import strawberryCup from '../../assets/strawberry cup woth arms marketing image.png';
import bottlesDisplay from '../../assets/bogani big  all bottles picture with flavours.jpg';
import cupMarketing from '../../assets/The most preferred probiotic yogurt comes in 150ml cups .jpg';

const berryProduct: ProductDetailProps['product'] = {
  id: 'berry-boost',
  name: 'Berry Boost Probiotic Yogurt',
  tagline: 'A burst of antioxidant-rich berries in every spoonful',
  description: 'Our Berry Boost yogurt combines the goodness of probiotics with a vibrant blend of locally sourced berries. This antioxidant-rich blend delivers both incredible taste and powerful health benefits in every serving.',
  price: 300.00,
  sizes: ['250ml', '500ml', '1L'],
  images: [
    berryRedCup,
    strawberryCup,
    bottlesDisplay,
    cupMarketing
  ],
  benefits: [
    {
      icon: <Shield size={24} />,
      title: 'Antioxidant Rich',
      description: 'Packed with natural antioxidants from real berries'
    },
    {
      icon: <Leaf size={24} />,
      title: 'Local Berries',
      description: 'Made with fresh, locally sourced berries'
    },
    {
      icon: <Activity size={24} />,
      title: 'Double Benefits',
      description: 'Probiotics plus berry antioxidants for optimal health'
    }
  ],
  nutritionFacts: {
    servingSize: '100g',
    calories: 125,
    protein: 8,
    carbs: 12,
    fat: 4,
    probiotics: '1 billion CFU per serving'
  },
  ingredients: [
    'Fresh Local Milk',
    'Mixed Berry Blend (Strawberries, Blueberries, Raspberries)',
    'Live Bacterial Cultures',
    'Streptococcus Thermophilus',
    'Lactobacillus Bulgaricus',
    'Bifidobacterium',
    'Lactobacillus Acidophilus'
  ]
};

const BerryProduct: React.FC = () => {
  return <ProductDetail product={berryProduct} />;
};

export default BerryProduct; 