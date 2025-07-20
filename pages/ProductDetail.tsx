import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// This is a redirect component for legacy product detail routes
const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // Redirect to the products page
    navigate('/products', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Redirecting...</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This product page has moved. Taking you to our products page.
        </p>
      </div>
    </div>
  );
};

export default ProductDetail; 