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
      textColorWhite: string;
      textColorBlack: string;
    };
  }
}
