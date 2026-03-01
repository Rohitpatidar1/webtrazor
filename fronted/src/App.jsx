import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ThemeContextProvider from "./context/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import Services from "./components/Services";
import Projects from "./components/Project";
import ServicePurchase from "./components/ServicePurchase";
import Contact from "./components/Contact";
import About from "./components/About";
import ServiceDetails from "./pages/ServiceDetails";
import ProjectDetails2 from "./components/ProjectDetails2";

import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminFeedback from "./pages/admin/AdminFeedback";
import AdminBuildRequests from "./pages/admin/AdminBuildRequests";
import ServiceRequests from "./pages/admin/ServiceRequests";
import ServiceProviders from "./pages/admin/ServiceProviders";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedRoute from "./pages/admin/ProtectedRoute";

function App() {
  return (
    <ThemeContextProvider>
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <Navbar />

          <Routes>
            {/* MAIN WEBSITE */}
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/buyservices" element={<ServicePurchase />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/:serviceId" element={<ServiceDetails />} />
            <Route path="/projects/:id" element={<ProjectDetails2 />} />

            {/* ADMIN LOGIN */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* ADMIN PROTECTED ROUTES */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="feedback" element={<AdminFeedback />} />
              <Route path="build-requests" element={<AdminBuildRequests />} />
              <Route path="service-requests" element={<ServiceRequests />} />
              <Route path="service-providers" element={<ServiceProviders />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>

          <Footer />
        </Router>
      </HelmetProvider>
    </ThemeContextProvider>
  );
}

export default App;
