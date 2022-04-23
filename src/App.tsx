import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
