import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import BaseLayout from "./views/BaseLayout";
import GenrePage from "./views/GenrePage";
import AddUser from "./views/AddUser";
import AddMovie from "./views/AddMovie";
import EditMovie from "./views/EditMovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/edit-movie/:id" element={<EditMovie />} />
          <Route path="/genres" element={<GenrePage />} />
          <Route path="/add-user" element={<AddUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
