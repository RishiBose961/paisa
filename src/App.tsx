import { Route, Routes } from "react-router"
import Home from "./Home"
import LoginPage from "./pages/Auth/LoginPage"
import RegisterPage from "./pages/Auth/RegisterPage"
import PrivateRoute from "./components/PrivateRoute"

const App = () => {
  return (
    <div>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        
        </Route>
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App