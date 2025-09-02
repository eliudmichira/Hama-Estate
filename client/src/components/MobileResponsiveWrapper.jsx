import React from 'react';
import { Navigate } from 'react-router-dom';
import HomeMobile from '../../pages/HomeMobile';
import { useMobileDetection } from '../hooks/useMobileDetection';

const MobileResponsiveWrapper = () => {
  const { isMobile, isMounted } = useMobileDetection(768);

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  // Show mobile version on mobile devices, desktop version on larger screens
  if (isMobile) {
    return <HomeMobile />;
  }

  // Desktop users get redirected to desktop route
  return <Navigate to="/desktop" replace />;
};

export default MobileResponsiveWrapper;
