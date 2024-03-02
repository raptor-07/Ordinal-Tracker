import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import TypeWriter from "./components/TypeWriter";
import Box from "@mui/material/Box";
import CustomButton from "./components/CustomButton";
import { useEffect, useState } from "react";

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

  

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            height: "100vh",
            padding: "10%",
            flexDirection: "column",
          }}
        >
          <TypeWriter text="Ordinal Alerts in Real Time!" delay={100} />
          {showButton && <CustomButton />}
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
