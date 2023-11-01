// https://mui.com/material-ui/about-the-lab/#typescript
import type {} from "@mui/lab/themeAugmentation";

import { CSSProperties } from "preact/compat";
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

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    selected: true;
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

declare module "@mui/material/styles" {
  interface TypographyVariants {
    label: CSSProperties;
    subtitle2: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    label?: CSSProperties;
    subtitle2?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    label: true;
    subtitle2: true;
  }
}

const paletteAndTypography = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 980, // Custom
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    background: {
      default: "#E9F5FF",
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
      contrastText: "#D70000",
      light: "#FFEBE6",
      main: "#D70000",
    },
    errorTint: {
      main: "#FFEBE6",
    },
    info: {
      main: "#515159",
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
    allVariants: {
      color: "#515159",
      fontWeight: 400,
    },
    h1: {
      fontSize: "2.25rem", // 36/16
      margin: "2rem 0rem",
    },
    h2: {
      fontSize: "1.25rem", // 20/16
      fontWeight: 500,
      margin: "1rem 0rem",
    },
    h3: {
      fontSize: "1.125rem", // 18/16
    },
    h4: {
      fontSize: "1rem", // 16/16
      fontWeight: 500,
    },
    h5: {
      fontSize: "0.875rem", // 14/16
      fontWeight: 500,
      lineHeight: "1.357", // 19/14
    },
    h6: {
      fontSize: "0.625rem", // 10/16
      fontWeight: 500,
      textTransform: "uppercase",
    },
    caption: {
      fontSize: "0.5rem", // 8/16
      color: "#414141",
    },
    body1: {
      fontSize: "1rem", // 16/16
    },
    body2: {
      fontSize: "0.875rem", // 14/16
    },
    subtitle1: {
      color: "#AEAEBF",
      fontSize: "0.625rem", // 10/16,
      lineHeight: 2,
    },
    subtitle2: {
      color: "#AEAEBF",
      fontSize: "0.75rem", // 12/16,
      lineHeight: 2,
    },
    label: {
      fontFamily: ["Open Sans", "sans-serif"].join(","), // Bug
      fontSize: "0.75rem", // 12/16
      lineHeight: 2,
    },
  },
});

const saltise = createTheme(paletteAndTypography, {
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          " .MuiIconButton-root": {
            padding: "4px",
          },
        },
        standardError: {
          backgroundColor: paletteAndTypography.palette.errorTint.main,
          color: paletteAndTypography.palette.error.main,
        },
        standardInfo: {
          backgroundColor: paletteAndTypography.palette.secondary1.main,
          color: paletteAndTypography.palette.info.main,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: paletteAndTypography.palette.background.paper,
          color: paletteAndTypography.palette.primary.main,
          paddingLeft: 2,
          " .MuiAvatar-root": {
            height: 30,
            width: 30,
            "&:hover": {
              backgroundColor: "#1743B320",
            },
          },
          " .MuiIconButton-root": {
            marginLeft: "15px",
            marginRight: "15px",
            color: paletteAndTypography.palette.primary.main,
            "&:hover": {
              backgroundColor: "#1743B320",
            },
          },
          " .MuiList-root": {
            padding: "10px 0px",
          },
          " .MuiListItemIcon-root": {
            minWidth: "0px",
            marginRight: "10px",
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
          "&:disabled": {
            backgroundColor: "#E9EBF2",
            " .MuiTypography-root": {
              color: "#AEAEBF",
            },
          },
        },
        contained: {
          " .MuiTypography-root": {
            color: paletteAndTypography.palette.background.paper,
          },
        },
        outlined: {
          border: "solid 1px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          boxShadow: "none",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          height: "26px",
          justifyContent: "space-between",
          padding: "20px",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "0px 20px",
          " &:last-child": {
            paddingBottom: 10,
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderColor: paletteAndTypography.palette.primary.main,
          color: paletteAndTypography.palette.primary.main,
          fontSize: "16px",
        },
      },
      variants: [
        {
          props: { variant: "selected" },
          style: {
            backgroundColor: paletteAndTypography.palette.primary.main,
            color: paletteAndTypography.palette.background.paper,
          },
        },
      ],
    },
    MuiCssBaseline: {
      // Use CssBaseline to inject global overrides of non-mui elements
      styleOverrides: (t: any) => {
        return {
          h1: {
            ...t.typography.h1,
          },
          h2: {
            ...t.typography.h2,
          },
          h3: {
            ...t.typography.h3,
          },
          p: {
            ...t.typography.body1,
          },
          ".mui-container": {
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: t.breakpoints.values.md,
            padding: "0px 24px",
            width: "100%",
          },
        };
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          maxWidth: "780px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: paletteAndTypography.typography.h1.fontSize,
          fontWeight: paletteAndTypography.typography.h1.fontWeight,
          textTransform: "unset",
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
          color: paletteAndTypography.palette.background.paper,
        },
        root: {
          " img.logo": {
            height: 40,
            marginLeft: 8,
            marginRight: 10,
            width: 40,
          },
          " span.cardo": {
            fontFamily: "Cardo",
          },
          " span.montserrat": {
            fontFamily: "Montserrat",
          },
          " .MuiListItemButton-root": {
            borderRadius: 10,
            marginBottom: 2,
            padding: "4px 16px",
            "&.Mui-selected": { backgroundColor: "rgb(255, 255, 255, 0.1)" },
            "&:hover": {
              backgroundColor: "rgb(255, 255, 255, 0.1)",
            },
          },
          " .MuiListItemIcon-root": {
            color: paletteAndTypography.palette.background.paper,
          },
          " .MuiTypography-root": {
            color: paletteAndTypography.palette.background.paper,
          },
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        fontSizeSmall: {
          fontSize: "16px",
        },
        fontSizeMedium: {
          fontSize: "20px!important",
        },
        fontSizeLarge: {
          fontSize: "24px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: paletteAndTypography.palette.primary1.main,
          },
          "& .MuiListItemText-root": {
            lineHeight: "1.2rem",
            color: paletteAndTypography.palette.secondary4.main,
            fontSize: paletteAndTypography.typography.body2.fontSize,
          },
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          " .MuiPaper-root": {
            backgroundColor: paletteAndTypography.palette.primary5.main,
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeSmall: {
          fontSize: "16px",
        },
        fontSizeMedium: {
          fontSize: "20px",
        },
        fontSizeLarge: {
          fontSize: "24px",
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: "#E9EBF2",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color: "#0D2666",
        },
        tooltip: {
          backgroundColor: "#0D2666",
          fontSize: "014px",
        },
      },
    },
  },
});

export const formTheme = createTheme(saltise, {
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "20px",
          "& .MuiDivider-root": {
            margin: "20px -20px",
            backgroundColor: saltise.palette.secondary1.main,
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
          padding: "0px",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: saltise.palette.secondary2.main,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: saltise.palette.secondary4.main,
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
          marginRight: "10px",

          "& .MuiSvgIcon-root": {
            fontSize: "24px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          color: "#AEAEBF",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#AEAEBF",
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
  },
});

export default saltise;
