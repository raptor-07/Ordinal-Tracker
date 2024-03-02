import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#6a67c9",
      },
      secondary: {
        main: "#f50057",
        light: "#BEBCFB",
      },
      background: {
        default: "#000000",
        paper: "#040404",
      },
    },
    typography: {
      fontFamily: "Kode Mono, monospace",
      body: {
        fontSize: "1.2rem",
        fontWeight: 400,
      },
    },
    shape: {
      borderRadius: 4,
    },
    overrides: {
      MuiAppBar: {
        colorInherit: {
          backgroundColor: "#689f38",
          color: "#fff",
        },
      },
    },
    props: {
      MuiAppBar: {
        color: "inherit",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}

export default App;
