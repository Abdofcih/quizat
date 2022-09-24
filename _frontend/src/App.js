import "./App.css";
import {
  Landing,
  Register,
  NotFound,
  SharedLayout,
  Stats,
  Profile,
  Protected
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <SharedLayout />
            </Protected>
          }
        >
          <Route index element={<Stats />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/welcome" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;