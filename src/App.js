import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import UserLayout from "./layouts/UserLayout/UserLayout";
import ProtectedRoute from "./routers/ProtectedRoute/ProtectedRoute";
import Home from "./modules/Home/Home";
import SignUp from "./modules/Auth/Pages/SignUp/SignUp";
import SignIn from "./modules/Auth/Pages/SignIn/SignIn";
import Details from "./modules/Details/Details";
import UserProvider from "./contexts/UserContext/UserContext";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext/ShoppingCartContext";
import UserInfo from "./modules/UserInfo/UserInfo";
import RegistedCourse from "./modules/RegistedCourse/RegistedCourse";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

function App() {
  return (
    <UserProvider>
      <ShoppingCartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="course/:courseID" element={<Details />} />
              <Route path="userInfo" element={<UserInfo />}></Route>
              <Route
                path="registedCourse"
                element={
                  <ProtectedRoute>
                    <RegistedCourse />ß
                  </ProtectedRoute>
                }
              ></Route>

              {/* Public routes */}
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>

            {/* Admin Routes need protected */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ShoppingCartProvider>
    </UserProvider>
  );
}

export default App;
