// src/App.jsx
import React, { useEffect } from "react";
import { HashRouter  as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // <-- เพิ่ม
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import { ThemeProvider } from "./theme";

function App() {
  useEffect(() => {
    const setLayoutVars = () => {
      const hdr = document.querySelector("header");
      const container = document.querySelector(".app-center-container");
      const headerHeight = hdr ? hdr.offsetHeight : 72;
      document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);

      if (container) {
        const half = Math.round(container.offsetWidth / 2);
        document.documentElement.style.setProperty("--content-half", `${half}px`);
      } else {
        document.documentElement.style.setProperty("--content-half", `576px`);
      }
    };

    setLayoutVars();
    window.addEventListener("resize", setLayoutVars);
    window.addEventListener("load", setLayoutVars);

    return () => {
      window.removeEventListener("resize", setLayoutVars);
      window.removeEventListener("load", setLayoutVars);
    };
  }, []);

  return (
    <ThemeProvider>
      <HelmetProvider>
        <Router>
          <div className="flex flex-col min-h-screen text-gray-900 dark:text-gray-200">
            <Header />

            <div className="page-outer relative flex-1 flex justify-center">
              <div className="app-center-container max-w-7xl w-full bg-gray-50 dark:bg-gray-895 px-4 py-6">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blogs/:slug" element={<BlogDetail />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                </Routes>
              </div>
            </div>

            <Footer />
          </div>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
