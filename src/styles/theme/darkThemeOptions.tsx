import { ThemeOptions } from "@mui/material/styles";

const darkThemeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 1024,
      sm: 1024,
      md: 1024,
      lg: 1024,
      xl: 1024,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#567842",
    },
    secondary: {
      main: "#22272b",
      contrastText: "#bfbfbf",
    },
    success: {
      main: "#6c9b45",
    },
    background: {
      paper: "#22272b",
      default: "#171c20",
    },
    text: {
      primary: "#bfbfbf",
      secondary: "#7d7d7d",
    },
    divider: "#2d3236",
  },
  typography: { fontSize: 14 },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({}),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: ({ ownerState, theme }) => ({
          borderColor: theme.palette.divider,
        }),

        root: ({ ownerState, theme }) => ({
          backgroundColor: theme.palette.background.paper,
          ...(ownerState?.error === false
            ? {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
              }
            : {}),
        }),
      },
    },
  },
};

export default darkThemeOptions;
