// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      backgroundDark: string;
      backgroundLight: string;
      textColorWhite: string;
      textColorBlack: string;
      textColorGrey: string;
      error: string;
    };
  }
}
