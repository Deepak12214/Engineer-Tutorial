import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import ReadingPage from "./pages/ReadingPage";
import BlogDetails from "./pages/BlogDetails";
import BlogList from "./pages/BlogList";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div
        className="
          min-h-screen
          bg-bg-main
          text-text-primary
          transition-colors
        "
      >
        <Header />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/learn/:courseId/:sectionId/:topicId"
            element={<ReadingPage />}
          />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
