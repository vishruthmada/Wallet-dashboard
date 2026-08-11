import { Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import { ROUTES } from "../constants/routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<DashboardPage />} />
    </Routes>
  );
};

export default AppRoutes;
