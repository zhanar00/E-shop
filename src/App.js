import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
      <Provider store={store}>
        <Router>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              <AppRoutes />
            </main>
          </div>
        </Router>
      </Provider>
  );
};

export default App;
