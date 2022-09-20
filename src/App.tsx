import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFB34D"
    }
  }
})

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
          <ToastContainer
            position="top-right"
            closeOnClick
            draggable
            pauseOnHover
            autoClose={5000}
          />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
