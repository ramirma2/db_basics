import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar/NavBar";
import ClassesPage from "./pages/ClassesPage";
import MembersPage from "./pages/MembersPage";
import InstructorsPage from "./pages/InstructorsPage";
import SchedulesPage from "./pages/SchedulesPage";
import UpdateClassPage from "./pages/UpdateClassPage";
import UpdateMemberPage from "./pages/UpdateMemberPage";
import UpdateInstructorPage from "./pages/UpdateInstructorPage";
import UpdateSchedulePage from "./pages/UpdateSchedulePage";
import ScheduleClassPage from "./pages/ScheduleClassPage";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/instructors" element={<InstructorsPage />} />
        <Route path="/schedules" element={<SchedulesPage />} />
        <Route path="/update-class" element={<UpdateClassPage />} />
        <Route path="/update-member" element={<UpdateMemberPage />} />
        <Route path="/update-instructor" element={<UpdateInstructorPage />} />
        <Route path="/update-schedule" element={<UpdateSchedulePage />} />
        <Route path="/schedule-class" element={<ScheduleClassPage />} />


      </Routes>
    </div>
  );
}

export default App;
