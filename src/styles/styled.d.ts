import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: Theme;

    colors: {
      primary: string;
      secondary: string;

      primaryBackground: string;
      secondaryBackground: string;
      inputBackground: string;

      shadow: string;
      placeholder: string;

      selectedButton: string;

      primaryText: string;
      secondaryText: string;
      ternaryText: string;

      link: string;

      switchOff: string;
    };
  }
}
