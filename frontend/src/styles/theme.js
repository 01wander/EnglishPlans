export const theme = {
  colors: {
    primary: '#3498db',
    primaryDark: '#2980b9',
    secondary: '#e74c3c',
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
      light: '#666666'
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8f9fa',
      hover: '#fff3f0',
      tab: {
        active: '#3498db',
        inactive: '#f0f2f5',
        hoverActive: '#2980b9',
        hoverInactive: '#e4e7eb'
      }
    },
    border: {
      light: '#e9ecef',
      default: '#ddd'
    }
  },
  
  typography: {
    fontSize: {
      xs: '0.9rem',
      sm: '1rem',
      md: '1.1rem',
      lg: '1.2rem',
      xl: '1.4rem',
      xxl: '1.8rem',
      xxxl: '2.5rem',
      emoji: '4rem'
    },
    lineHeight: {
      normal: 1.4,
      relaxed: 1.5,
      loose: 1.6
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  
  spacing: {
    xs: '5px',
    sm: '8px',
    md: '10px',
    lg: '15px',
    xl: '20px',
    xxl: '30px'
  },
  
  borderRadius: {
    sm: '8px',
    md: '10px',
    lg: '15px',
    xl: '20px',
    pill: '20px'
  },
  
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
    md: '0 4px 15px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 25px rgba(0, 0, 0, 0.15)'
  },
  
  breakpoints: {
    mobile: '650px',
    tablet: '1024px',
    desktop: '1200px'
  },
  
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.2s ease',
    slow: 'all 0.4s ease'
  },
  
  container: {
    maxWidth: '1200px',
    padding: '20px'
  },
  
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500
  }
}; 