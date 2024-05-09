import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar/NavBar";
import ClassesPage from "./pages/ClassesPage";
import MembersPage from "./pages/MembersPage";
import InstructorsPage from "./pages/InstructorsPage";
import SchedulesPage from "./pages/SchedulesPage";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/instructors" element={<InstructorsPage />} />
        <Route path="/schedules" element={<SchedulesPage />} />

      </Routes>
    </>
  );
}

export default App;
