import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Privacy from "./components/Privacy";
import CreateProperty from "./pages/CreateProperty";
import UpdateProperty from "./pages/UpdateProperty";
import Property from "./pages/Property";

export default function App() {
  return (
    <div className="bg-black">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/property/:propertyId" element={<Property />} />
          <Route element={<Privacy />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-property" element={<CreateProperty />} />
            <Route
              path="/update-property/:propertyId"
              element={<UpdateProperty />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
