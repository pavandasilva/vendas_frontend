import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string,
    colors: {
      primary: string,
      secondary: string,
      background: string,
      backgroundLight: string,
      primaryText: string;
      secondaryText: string;
      border: string;
      borderLight: string;
      info: string,
      danger: string,
      sucess: string,
      warning: string,
      buttonPrimary: string
    }
  }
}
