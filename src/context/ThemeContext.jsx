import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Theme configuration
const themes = {
  light: {
    name: 'light',
    displayName: 'Light',
    icon: '☀️',
    colors: {
      background: '#ffffff',
      surface: '#f9fafb',
      card: '#ffffff',
      primary: '#059669',
      secondary: '#7c3aed',
      text: '#111827',
      textSecondary: '#4b5563',
      textTertiary: '#9ca3af',
      border: '#e5e7eb',
    }
  },
  dark: {
    name: 'dark',
    displayName: 'Dark',
    icon: '🌙',
    colors: {
      background: '#111827', // gray-900 - Main dark background
      surface: '#1f2937', // gray-800 - Secondary dark background
      card: '#1f2937', // gray-800 - Card background
      primary: '#10b981',
      secondary: '#8b5cf6',
      text: '#ffffff', // Primary text color
      textSecondary: '#f3f4f6', // gray-100 - Secondary text color
      textTertiary: '#e5e7eb', // gray-200 - Tertiary text color
      border: '#374151', // gray-700 - Primary border color
    }
  },
  auto: {
    name: 'auto',
    displayName: 'System',
    icon: '🖥️',
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children, defaultTheme = 'dark' }) {
  // Initialize theme from localStorage or use default
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme && themes[savedTheme] ? savedTheme : defaultTheme;
  });
  
  // Track system preference
  const [systemTheme, setSystemTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );
  
  // Get the effective theme (considering 'auto' mode)
  const effectiveTheme = theme === 'auto' ? systemTheme : theme;
  
  // Get current theme configuration
  const currentTheme = themes[effectiveTheme] || themes.dark;

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'light';
      // If 'auto', switch to opposite of current effective theme
      return effectiveTheme === 'dark' ? 'light' : 'dark';
    });
  }, [effectiveTheme]);
  
  // Set specific theme
  const setSpecificTheme = useCallback((newTheme) => {
    if (themes[newTheme]) {
      setTheme(newTheme);
    }
  }, []);
  
  // Cycle through all themes
  const cycleTheme = useCallback(() => {
    const themeOrder = ['light', 'dark', 'auto'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    // Apply effective theme
    if (effectiveTheme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.add('light');
      body.classList.add('light');
    }
    
    // Set meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', currentTheme.colors.background);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = currentTheme.colors.background;
      document.head.appendChild(meta);
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('themeChange', { 
      detail: { theme, effectiveTheme, colors: currentTheme.colors } 
    }));
  }, [theme, effectiveTheme, currentTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);
  
  // Keyboard shortcut for theme toggle
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + Shift + T to toggle theme
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleTheme]);

  const value = {
    theme,
    setTheme: setSpecificTheme,
    toggleTheme,
    cycleTheme,
    effectiveTheme,
    systemTheme,
    themes,
    currentTheme,
    isDark: effectiveTheme === 'dark',
    isLight: effectiveTheme === 'light',
    isAuto: theme === 'auto',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Theme toggle button component
export function ThemeToggle({ className = '', showLabel = false }) {
  const { theme, cycleTheme, themes } = useTheme();
  const currentTheme = themes[theme];
  
  return (
    <button
      onClick={cycleTheme}
      className={`p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${className}`}
      aria-label="Toggle theme"
      title={`Current theme: ${currentTheme.displayName}`}
    >
      <span className="text-xl">{currentTheme.icon}</span>
      {showLabel && (
        <span className="ml-2 text-sm font-medium">{currentTheme.displayName}</span>
      )}
    </button>
  );
}

// HOC to inject theme props
export function withTheme(Component) {
  return function ThemedComponent(props) {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
}

// Utility to get CSS variable value
export function getThemeVariable(variableName) {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName);
}

// Utility to set CSS variable value
export function setThemeVariable(variableName, value) {
  document.documentElement.style.setProperty(variableName, value);
}

// Export theme colors for direct use
export const themeColors = themes;