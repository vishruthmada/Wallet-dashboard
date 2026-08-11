import { Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/Dashboard/DashboardPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
};

export default AppRoutes;
