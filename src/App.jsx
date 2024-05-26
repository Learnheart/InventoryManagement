import "./App.css";
import LoginPage from "./Components/Authentication/LoginPage";
import Report from "./Pages/Homepage/Report";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import RegistrationPage from "./Components/Authentication/RegistrationPage";

// root component
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth/signin" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/public/transaction-report" element={<Report />} />
          </Route>
          <Route path="/auth/signup" element={<RegistrationPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
