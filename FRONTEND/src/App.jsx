import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import DashboardLayout from "./layouts/DashboardLayout";

const App = () => {
  return (
    <div>
      {/* Routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />} >
            {/* <Route index element={} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
