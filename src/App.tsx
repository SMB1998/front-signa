import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ContainerBrand } from "./components/BrandRegister/ContainerBrand";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e7344c",
    },
    secondary: {
      main: "#e7344c",
    },
  },
});

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ContainerBrand />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
