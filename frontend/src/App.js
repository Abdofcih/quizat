import "./App.css";
import {
  Landing,
  Register,
  NotFound,
  SharedLayout,
  Stats,
  Protected
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        </Route>
        <Route path="/welcome" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
