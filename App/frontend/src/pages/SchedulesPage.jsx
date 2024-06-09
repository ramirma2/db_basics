import { useState } from 'react';
import SchedulesTable from "../components/schedules/SchedulesTable";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SchedulesPage({ classes, schedules, instructors, getSchedules, setClassToSchedule, setScheduledMembers, setCurrSchedule }) {

    const history = useNavigate();
    const [currClassName, setClassName] = useState("-- select a class to schedule --");
    const [ classId, setClassId] = useState();
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [instructorName, setInstructorName] = useState("-- select instructor --");
    const [status, setStatus] = useState("");
    const url_main = import.meta.env.VITE_API_URL


    const onEdit = async scheduleToEdit => {
        const sch = await getSchedule(scheduleToEdit.schedule_id);
        setCurrSchedule(sch[0]);
        history("/update-schedule");
    }

    const getSchedule = async (schedule_id) => {
        try {
            const url = url_main + `schedules/${schedule_id}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.log('Error getting the schedule requested:', error);
        }
    }

    const onScheduleClass = async (scheduleToSchedule ) => {
        const sch = await getSchedule(scheduleToSchedule.schedule_id);
        await getMembersEnrolled(scheduleToSchedule)
        setClassToSchedule(sch[0]);
        history("/schedule-class");
    }

    const addSchedule = async () => {
        const isValid = await validate();
        if(isValid){
            const class_id = classes.filter((clss, i)=> clss.name == currClassName).map(clss => clss.class_id);
            const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            const day_of_the_week = weekdays[new Date(date).getDay()];
            const attributes = {class_id:class_id[0], date, day_of_the_week, start_time: startTime, end_time: endTime, instructor: instructorName };
            
            try {
                const url = url_main + 'schedules';
                const response = await axios.post(url, attributes);
                if (response.status == 200) {
                    resetInputs();
                    alert("Schedule Added");
                } else {
                    alert("There was a problem adding a new schedule");
                }

            } catch (error) {
                console.log("Error adding a new schedule");
            }
            getSchedules();
        }else{
            alert("All values are required")
        }
    }


    const getMembersEnrolled = async (schedule) => {
        try{
          const url = import.meta.env.VITE_API_URL + `schedules/${schedule.schedule_id}/members-enrolled`;
          const response = await axios.get(url);
          setScheduledMembers(response.data);
      
        }catch(error){
          console.log("Error getting the list requested:", error)
        }
        
      }

    const setCurrScheduleForScheduledMemebers = async (schedule) =>{
        await getMembersEnrolled(schedule)
        setCurrSchedule(schedule)
        history('/scheduled-members')
    }
      


    const resetInputs = () => {
        setClassName("-- select a class to schedule --");
        setDate('');
        setStartTime('');
        setEndTime('');
        setInstructorName("-- select instructor --");
        setStatus('');
    }

    const validate = async () =>{
        if(currClassName=="-- select a class to schedule --" || instructorName =="-- select instructor --" ) {
            return false
        }
        if ( date && startTime && endTime){
            return true
        }else{
            return false
        }
    }

    return (
        <section>
            <div>
                <h2>Manage our classes schedule</h2>

                <SchedulesTable
                    schedules={schedules}
                    onEdit={onEdit} 
                    onScheduleClass={onScheduleClass}
                    setCurrScheduleForScheduledMemebers={setCurrScheduleForScheduledMemebers}/>

            </div>


            <form>
            <label>Class Name:</label>
                <select
                onChange= {e=> {setClassName(e.target.value)}}>
                    <option disabled selected value>-- select a class to schedule --</option>
                    {classes.map((clss, i)=> <option key={i} >{clss.name}</option>)}

                </select>
                <label>Date:</label>
                <input type="date" value={date}
                    onChange={e => setDate(e.target.value)} />

                <label>Start Time:</label>
                <input type="time" value={startTime}
                    onChange={e => setStartTime(e.target.value)} />
                <label>End Time:</label>
                <input type="time" value={endTime}
                    onChange={e => setEndTime(e.target.value)} />
                <label>Instructor:</label>
                <select
                    onChange={e => setInstructorName(e.target.value)}>
                     <option disabled selected value> -- select instructor -- </option>
                    {instructors.map((inst, i) => <option key={i}>{inst.preferred_name}</option>)}
                </select>
                <button
                    onClick={e => {
                        e.preventDefault();
                        addSchedule();
                    }}
                >Add to Schedule</button>
            </form>
        </section>
    )

}

export default SchedulesPage;