import "./App.css";
import { useState, useEffect } from "react";
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
import MemberClassesPage from "./pages/MemberClassesPage";
import ScheduledMembersPage from "./pages/ScheduledMembersPage";
import axios from 'axios';




function App() {

  const [classToEdit, setClassToEdit]= useState([]);
  const [instructorToEdit, setInstructorToEdit] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  const[schedules, setSchedules] = useState([]);
  const [memberToEdit, setMemberToEdit] = useState([]);
  const [scheduleToEdit, setScheduleToEdit] = useState([]);

  const url_main = import.meta.env.VITE_API_URL


  const getClasses = async () => {
    try {
        const url = import.meta.env.VITE_API_URL + 'classes';
        const response = await axios.get(url);
        setClasses(response.data);
    } catch (error) {
        console.error('Error getting the classes data:', error);
    }
}

const getMembers = async () => {
  try {
      const url = import.meta.env.VITE_API_URL + 'members';
      const response = await axios.get(url);
      setMembers(response.data);
  } catch (error) {
      console.error('Error getting the members data:', error);
  }
}

const getSchedules = async () => {
    try {
      const url = import.meta.env.VITE_API_URL + 'schedules';
      const response = await axios.get(url);
      setSchedules(response.data);
  } catch (error) {
      console.error('Error getting the schedules data:', error);
  }
}


const getInstructors = async () =>{
  try{
      const url = import.meta.env.VITE_API_URL + 'instructors'; 
      const response = await axios.get(url);
      const response_with_classes = await getEachClass(response.data);
      setInstructors(response_with_classes);
  }catch(error) {
      console.log("Error getting the instructors data:", error)
  }
}


const getEachClass = async (instructors) => {
  let classes =  await Promise.all(
      instructors.map(async(inst, i)=>{
          return getInstructorClasses(inst.instructor_id)
      })
  )
  const instructors_updated = instructors.map((inst, i)=>{
      return {...inst, classes: classes[i]}
  })

  
  return instructors_updated;
}

const getInstructorClasses = async (instructor_id) => {
  try{
      const url = url_main + `instructors/${instructor_id}/classes`;
      const response = await axios.get(url);
      return response.data;
  }catch(error){
      console.log("Error getting the instructor's data requested:",error);
  }
}

useEffect(() => {
  getClasses();
  getMembers();
  getSchedules();
  getInstructors();
}, [])


  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/classes" element={<ClassesPage 
                                            classes={classes} 
                                            getClasses={getClasses}
                                            setClassToEdit={setClassToEdit}/>} />
        <Route path="/members" element={<MembersPage 
                                            members={members}
                                            getMembers={getMembers} 
                                            setMemberToEdit={setMemberToEdit}/>} />
        <Route path="/instructors" element={<InstructorsPage 
                                            instructors={instructors} 
                                            getInstructors={getInstructors}
                                            getInstructorClasses={getInstructorClasses}
                                            setInstructorToEdit={setInstructorToEdit}/>} />
        <Route path="/schedules" element={<SchedulesPage 
                                            classes ={classes}
                                            schedules={schedules} 
                                            getSchedules={getSchedules}
                                            instructors={instructors}
                                            setScheduleToEdit={setScheduleToEdit}
                                             />} />
        <Route path="/update-class" element={<UpdateClassPage 
                                              classToEdit={classToEdit}
                                              getClasses={getClasses}/>} />
        <Route path="/update-member" element={<UpdateMemberPage
                                                memberToEdit={memberToEdit} 
                                                getMembers={getMembers}/>} />
        <Route path="/update-instructor" element={<UpdateInstructorPage 
                                                    classes={classes}
                                                    instructorToEdit={instructorToEdit}
                                                    getInstructors={getInstructors} />}/>
        <Route path="/update-schedule" element={<UpdateSchedulePage
                                                    scheduleToEdit={scheduleToEdit}
                                                    getSchedules = {getSchedules}
                                                    instructors={instructors}
                                                    classes={classes} />} />
        <Route path="/schedule-class" element={<ScheduleClassPage />} />
        <Route path="/member-classes" element={<MemberClassesPage  />} />
        <Route path="/scheduled-members" element={<ScheduledMembersPage />} />


      </Routes>
    </div>
  );
}

export default App;
