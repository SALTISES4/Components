//import { CSSProperties } from "preact/compat";
import { createTheme } from "@mui/material/styles";

// https://mui.com/material-ui/customization/typography/#variants
declare module "@mui/material/styles" {
  // eslint-disable-next-line no-unused-vars
  /* interface TypographyVariants {
    tag: CSSProperties;
  }
  // eslint-disable-next-line no-unused-vars
  interface TypographyVariantsOptions {
    tag?: CSSProperties;
  }*/

  interface Palette {
    primary1: Palette["primary"];
    primary2: Palette["primary"];
    primary4: Palette["primary"];
    primary5: Palette["primary"];
    secondary1: Palette["primary"];
    secondary2: Palette["primary"];
    secondary4: Palette["primary"];
    secondary5: Palette["primary"];
    overlayLight: Palette["primary"];
    overlayDark: Palette["primary"];
    successTint: Palette["primary"];
    warningTint: Palette["primary"];
    errorTint: Palette["primary"];
    new: Palette["primary"];
    newTint: Palette["primary"];
    orange: Palette["primary"];
    orangeTint: Palette["primary"];
    inactive: Palette["primary"];
    inactiveTint: Palette["primary"];
    neutral: Palette["primary"];
    darkGrey: Palette["primary"];
  }
  interface PaletteOptions {
    primary1: PaletteOptions["primary"];
    primary2: PaletteOptions["primary"];
    primary4: PaletteOptions["primary"];
    primary5: PaletteOptions["primary"];
    secondary1: PaletteOptions["primary"];
    secondary2: PaletteOptions["primary"];
    secondary4: PaletteOptions["primary"];
    secondary5: PaletteOptions["primary"];
    overlayLight: PaletteOptions["primary"];
    overlayDark: PaletteOptions["primary"];
    successTint: PaletteOptions["primary"];
    warningTint: PaletteOptions["primary"];
    errorTint: PaletteOptions["primary"];
    new: PaletteOptions["primary"];
    newTint: PaletteOptions["primary"];
    orange: PaletteOptions["primary"];
    orangeTint: PaletteOptions["primary"];
    inactive: PaletteOptions["primary"];
    inactiveTint: PaletteOptions["primary"];
    neutral: PaletteOptions["primary"];
    darkGrey: PaletteOptions["primary"];
  }
}
/*declare module "@mui/material/Typography" {
  // eslint-disable-next-line no-unused-vars
  interface TypographyPropsVariantOverrides {
    tag: true;
  }
}*/

declare module "@mui/material/Avatar" {
  interface AvatarPropsColorOverrides {
    secondary1: true;
    secondary4: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    secondary4: true;
  }
}
declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {}
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    secondary4: true;
  }
}

const saltise = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    //primaryBlue
    primary: {
      main: "#1743B3",
    },
    primary1: {
      main: "#E9F5FF",
    },
    primary2: {
      main: "#6691FF",
    },
    primary4: {
      main: "#0D2666",
    },
    primary5: {
      main: "#000B26",
    },
    secondary: {
      main: "#696973",
    },
    secondary1: {
      main: "#E9EBF2",
    },
    secondary2: {
      main: "#AEAEBF",
    },
    secondary4: {
      main: "#515159",
    },
    secondary5: {
      main: "#2E2E33",
    },
    overlayDark: {
      main: "#E9F5FF",
    },
    overlayLight: {
      main: "#F4F4F480",
    },
    success: {
      main: "#2BA789",
    },
    successTint: {
      main: "#E7FFF6",
    },
    warning: {
      main: "#FFC911",
    },
    warningTint: {
      main: "#FFF2C4",
    },
    error: {
      main: "#D70000",
    },
    errorTint: {
      main: "#FFEBE6",
    },
    new: {
      main: "#872CFF",
    },
    newTint: {
      main: "#F2E9FF",
    },
    orange: {
      main: "#F09326",
    },
    orangeTint: {
      main: "#FFEBD4",
    },
    inactive: {
      main: "#AEAEBF",
    },
    inactiveTint: {
      main: "#E9EBF2",
    },
    neutral: {
      main: "#90929B", //neutral
    },
    darkGrey: {
      main: "#414141",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: 12,
    allVariants: {
      color: "#515159",
      fontWeight: 400,
    },
    h1: {
      fontSize: "36px",
      lineHeight: "49px",
      marginTop: "30px",
      marginBottom: "30px",
    },
    h2: {
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "28px",
      marginTop: "50px",
    },
    h3: {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "28px",
    },
    h4: {
      fontSize: "14px",
      lineHeight: "20px",
    },
    h5: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "19px",
    },
    caption: {
      fontSize: "10px",
      lineHeight: "22px",
      color: "#90929B",
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
          fontWeight: 500,
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "4px",
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
            fontSize: "32px",
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontSize: "18px",
          fontWeight: 500,
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
