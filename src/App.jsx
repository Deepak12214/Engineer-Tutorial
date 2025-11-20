import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import ReadingPage from './pages/ReadingPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/learn/:courseId/:sectionId/:topicId" element={<ReadingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;