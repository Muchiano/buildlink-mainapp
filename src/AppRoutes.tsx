
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./components/auth/AuthPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminResourcesPage from "@/pages/AdminResources";
import AdminAnalyticsPage from "@/pages/AdminAnalytics";
import AdminRoute from "@/components/auth/AdminRoute";
import PublicProfile from "@/pages/PublicProfile";

const AppRoutes = () => (
  <Routes>
    <Route path="/auth" element={<AuthPage />} />
    <Route 
      path="/" 
      element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } 
    />
    <Route
      path="/admin-resources"
      element={
        <AdminRoute>
          <AdminResourcesPage />
        </AdminRoute>
      }
    />
    <Route
      path="/admin-analytics"
      element={
        <AdminRoute>
          <AdminAnalyticsPage />
        </AdminRoute>
      }
    />
    <Route
      path="/profile/:profileId"
      element={
        <ProtectedRoute>
          <PublicProfile />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
