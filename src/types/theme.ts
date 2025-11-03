export type Theme = {
  id: string;
  name: string;
  colors: {
    bg: string;
    bgSecondary: string;
    text: string;
    textSecondary: string;
    accent: string;
    border: string;
  };
  typography: {
    fontFamily: string;
    fontWeight: {
      normal: number;
      medium: number;
      bold: number;
    };
    fontSize: {
      base: string;
      sm: string;
      lg: string;
      xl: string;
    };
  };
  backgrounds: string[]; // paths to background images
};
