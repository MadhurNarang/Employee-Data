import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CreateEmployeePage from "./pages/CreateEmployeePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/addemployee" element={<CreateEmployeePage />} />
    </Routes>
  )
};

export default App;
