import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/HomePage';
import AppLayout from './AppLayout';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import About from './pages/About';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import SuggestionPage from './pages/SuggestionPage';
import { BookProvider } from './context/bookContext';
function App() {
  return (
    <div>
      <BookProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/home" element={<LandingPage />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/suggestions/:suggestion"
                element={<SuggestionPage />}
              />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="*" element={<p>Not Found oops</p>} />
          </Routes>
        </Router>
      </BookProvider>
    </div>
  );
}

export default App;
