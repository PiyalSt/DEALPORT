import React from "react";
import { BrowserRouter } from "react-router";

const App = () => {
  return (
    <div>
      {/* Routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
