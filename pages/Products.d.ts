import React from "react";
interface ProductSize {
    size: string;
    price: number;
}
interface ProductNutrition {
    calories: number;
    protein: string;
    fat: string;
    carbs: string;
    probiotics: string;
}
export interface Product {
    id: number;
    name: string;
    type: string;
    category: string;
    flavor: string;
    image: string;
    images?: string[];
    colorCode: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    description: string;
    longDescription?: string;
    sizes: ProductSize[];
    benefits: string[];
    nutrition: ProductNutrition;
    featured: boolean;
    new: boolean;
    bestseller?: boolean;
    organic?: boolean;
    glutenFree?: boolean;
    vegan?: boolean;
    lowSugar?: boolean;
    highProtein?: boolean;
    inStock?: boolean;
    stockCount?: number;
    tags?: string[];
    ingredients?: string[];
    allergens?: string[];
}
export declare const productsData: Product[];
export default function Products(): React.ReactNode;
export {};
