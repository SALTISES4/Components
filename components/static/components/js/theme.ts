import { CSSProperties } from "preact/compat";
import { createTheme } from "@mui/material/styles";

// https://mui.com/material-ui/customization/typography/#variants
declare module "@mui/material/styles" {
  // eslint-disable-next-line no-unused-vars
  interface TypographyVariants {
    tag: CSSProperties;
  }
  // eslint-disable-next-line no-unused-vars
  interface TypographyVariantsOptions {
    tag?: CSSProperties;
  }

  interface Palette {
    secondary1: Palette["primary"];
    secondary2: Palette["primary"];
    secondary3: Palette["primary"];
    secondary4: Palette["primary"];
    neutral: Palette["primary"];
    darkGrey: Palette["primary"];
    primaryBlue: Palette["primary"];
    red: Palette["primary"];
    orange: Palette["primary"];
    yellow: Palette["primary"];
    green: Palette["primary"];
    purple: Palette["primary"];
    paleRed: Palette["primary"];
    paleOrange: Palette["primary"];
    paleYellow: Palette["primary"];
    paleGreen: Palette["primary"];
    palePurple: Palette["primary"];
  }
  interface PaletteOptions {
    secondary1: PaletteOptions["primary"];
    secondary2: PaletteOptions["primary"];
    secondary3: PaletteOptions["primary"];
    secondary4: PaletteOptions["primary"];
    neutral: PaletteOptions["primary"];
    darkGrey: PaletteOptions["primary"];
    primaryBlue: PaletteOptions["primary"];
    red: PaletteOptions["primary"];
    orange: PaletteOptions["primary"];
    yellow: PaletteOptions["primary"];
    green: PaletteOptions["primary"];
    purple: PaletteOptions["primary"];
    paleRed: PaletteOptions["primary"];
    paleOrange: PaletteOptions["primary"];
    paleYellow: PaletteOptions["primary"];
    paleGreen: PaletteOptions["primary"];
    palePurple: PaletteOptions["primary"];
  }
}
declare module "@mui/material/Typography" {
  // eslint-disable-next-line no-unused-vars
  interface TypographyPropsVariantOverrides {
    tag: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primaryBlue: true;
    secondary4: true;
  }
}
declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    primaryBlue: true;
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    secondary4: true;
    primaryBlue: true;
    green: true;
    yellow: true;
    orange: true;
    red: true;
  }
}

const saltise = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    primary: {
      main: "#1743B3",
    },
    secondary1: {
      main: "#E9EBF2",
    },
    secondary2: {
      main: "#AEAEBF",
    },
    secondary3: {
      main: "#696973",
    },
    secondary4: {
      main: "#515159",
    },
    neutral: {
      main: "#90929B",
    },
    darkGrey: {
      main: "#414141",
    },
    primaryBlue: {
      main: "#1743B3",
    },
    red: {
      main: "#D70000",
    },
    orange: {
      main: "#F09326",
    },
    yellow: {
      main: "#FFC911",
    },
    green: {
      main: "#2BA789",
    },
    purple: {
      main: "#872CFF",
    },
    paleRed: {
      main: "#FFEBE6",
    },
    paleYellow: {
      main: "#FFF2C4",
    },
    paleOrange: {
      main: "#FFEBD4",
    },
    paleGreen: {
      main: "#E7FFF6",
    },
    palePurple: {
      main: "#F2E9FF",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontSize: "36px",
      fontWeight: 400,
      lineHeight: "49px",
      marginTop: "30px",
      marginBottom: "30px",
      color: "#515159",
    },
    h2: {
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: "28px",
      color: "#515159",
      marginTop: "50px",
    },
    h3: {
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "28px",
      color: "#515159",
    },
    h4: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
      color: "#515159",
    },
    h5: {
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: "19px",
      color: "#515159",
    },
    h6: {
      fontSize: "10px",
      fontWeight: 400,
      lineHeight: "22px",
      color: "#90929B",
    },
    tag: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "16px",
      fontFamily: ["Open Sans", "sans-serif"].join(","),
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000B26",
          color: "#fff",
          paddingLeft: 2,
          " img.logo": {
            height: 40,
            marginRight: 10,
          },
          " .MuiAvatar-root": {
            height: 30,
            width: 30,
          },
          " .MuiIconButton-root": {
            marginLeft: "15px",
            marginRight: "15px",
            color: "#fff",
          },
          " .MuiList-root": {
            padding: "10px 0px",
          },
          " .MuiListItemButton-root": {
            padding: "3px 17px",
            color: "rgb(185 208 228)",
            "&:hover": {
              backgroundColor: "#E9F5FF",
            },
          },
          " .MuiListItemIcon-root": {
            minWidth: "0px",
            marginRight: "10px",
          },
          " span.cardo": {
            fontFamily: "Cardo",
          },
          " span.montserrat": {
            fontFamily: "Montserrat",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        sizeSmall: {
          padding: "5px",
          " .MuiTypography-root": {
            fontSize: "12px",
            lineHeight: "16px",
          },
        },
        sizeMedium: {
          padding: "9px 30px",
          " .MuiTypography-root": {
            fontSize: "16px",
            lineHeight: "22px",
          },
        },
        root: {
          boxShadow: "none",
          borderRadius: "4px",
          textTransform: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          " .MuiTypography-root": {
            color: "#fff",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "20px 20px",
          borderRadius: "10px",
          boxShadow: "none",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "10px 0px 10px 0px",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
        title: {
          fontSize: "16px",
          fontWeight: "600",
          lineHeight: "28px",
          color: "#515159",
        },
        subheader: {
          fontSize: "10px",
          lineHeight: "20px",
          color: "#90929B",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgb(255, 255, 255, 0.1)",
        },
        vertical: {
          borderWidth: "0px",
          backgroundColor: "#EDF5FC",
          width: "3px",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          padding: "20px 10px",
          backgroundColor: "#0D2666",
          color: "#fff",
        },
        root: {
          " .MuiListItemButton-root": {
            borderRadius: 10,
            padding: "4px 16px",
            "&:hover": {
              backgroundColor: "rgb(255, 255, 255, 0.1)",
            },
          },
          " .MuiListItemIcon-root": {
            color: "#fff",
          },
          " .MuiTypography-root": {
            color: "#fff",
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#1743B3",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeSmall: {
          fontSize: "14px",
        },
        fontSizeMedium: {
          fontSize: "20px",
        },
        fontSizeLarge: {
          fontSize: "24px",
        },
      },
    },
  },
});

export const formTheme = createTheme(saltise, {
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "0px",
          "& .MuiTypography-root": {
            color: "#515159",
            fontSize: "12px",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#515159",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "4px 0px",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "0px",
          marginRight: "6px",

          "& .MuiSvgIcon-root": {
            fontSize: "28px",
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontSize: "18px",
          fontWeight: "600",
          lineHeight: "28px",
        },
        subheader: {
          fontSize: "10px",
          lineHeight: "20px",
          color: "#90929B",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          color: "#AEAEBF",
          "&:hover": {
            color: "#515159",
          },
          "&:active": {
            color: "#515159",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#E9EBF2",
          margin: "20px -20px",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          marginRight: "10px",
          padding: "0px",
          "& .MuiSvgIcon-root": {
            fontSize: "24px",
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: "0px",
          marginRight: "20px",
        },
        label: {
          fontSize: "14px",
          lineHeight: "19px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "& .MuiTypography-root": {
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "22px",
            marginBottom: "12px",
          },
        },
      },
    },
  },
});

export default saltise;
