import { useSelector } from "react-redux"
import { Link, Route, Routes } from "react-router"
import { ModeToggle } from "./components/mode-toggle"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./Home"
import LoginPage from "./pages/Auth/LoginPage"
import RegisterPage from "./pages/Auth/RegisterPage"
import GetCredit from "./pages/Credit/GetCredit"
import GetDebit from "./pages/Debit/GetDebit"
import AnalyticsPage from "./pages/Analytics/AnalyticsPage"

const App = () => {
  const { user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        user: { token: string; _id: string; name: string; avatar: string; email: string };
      };
    }) => state.auth
  );

  return (
    <div className="flex mt-4 flex-col items-center justify-center">
      <div className="flex justify-between items-center gap-5 mb-5">
        <div className="flex items-center gap-5">
          <Link to="/">Hi, {user?.name || "User"}</Link>
          <ModeToggle />
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/credit" element={<GetCredit />} />
          <Route path="/debit" element={<GetDebit />} />
          <Route path="/analytics" element={<AnalyticsPage />} />

        </Route>
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App