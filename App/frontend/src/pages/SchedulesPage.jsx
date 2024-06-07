import { useState } from 'react';
import SchedulesTable from "../components/schedules/SchedulesTable";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SchedulesPage({ classes, schedules, instructors, getSchedules, setClassToSchedule, setScheduledMembers, setCurrSchedule }) {

    const history = useNavigate();
    const [currClassName, setClassName] = useState(classes[0].name);
    const [ classId, setClassId] = useState();
    const [date, setDate] = useState("");
    const [dayOfTheWeek, setDayOfTheWeek] = useState("Monday");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [instructorName, setInstructorName] = useState(instructors[0].preferred_name);
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

        setClassToSchedule(sch[0]);
        history("/schedule-class");
    }

    const addSchedule = async () => {
        const class_id = classes.filter((clss, i)=> clss.name == currClassName).map(clss => clss.class_id)
        const attributes = {class_id, date, day_of_the_week: dayOfTheWeek, start_time: startTime, end_time: endTime, instructor: instructorName };
        
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
    }

    const getMembersEnrolled = async (schedule) => {
        try{
          const url = import.meta.env.VITE_API_URL + `schedules/${schedule.schedule_id}/members-enrolled`;
          const response = await axios.get(url);
          setScheduledMembers(response.data);
          setCurrSchedule(schedule)
          history('/scheduled-members')
      
        }catch(error){
          console.log("Error getting the list requested:", error)
        }
        
      }
      


    const resetInputs = () => {
        setClassName('');
        setDate('');
        setDayOfTheWeek('');
        setStartTime('');
        setEndTime('');
        setInstructorName('');
        setStatus('');
    }

    return (
        <section>
            <div>
                <h2>Manage our classes schedule</h2>

                <SchedulesTable
                    schedules={schedules}
                    onEdit={onEdit} 
                    onScheduleClass={onScheduleClass}
                    getMembersEnrolled={getMembersEnrolled}/>

            </div>


            <form>
            <label>Class Name:</label>
                <select
                onChange= {e=> {setClassName(e.target.value)}}>
                    {classes.map((clss, i)=> <option key={i} >{clss.name}</option>)}

                </select>
                <label>Date:</label>
                <input type="date" value={date}
                    onChange={e => setDate(e.target.value)} />
                <label>Day of the Week:</label>
                <select
                onChange= {e=> {setDayOfTheWeek(e.target.value)}}>
                    <option >Monday</option>
                    <option >Tuesday</option>
                    <option >Wednesday</option>
                    <option >Thursday</option>
                    <option >Friday</option>
                    <option >Saturday</option>
                    <option >Sunday</option>
                </select>
                <label>Start Time:</label>
                <input type="time" value={startTime}
                    onChange={e => setStartTime(e.target.value)} />
                <label>End Time:</label>
                <input type="time" value={endTime}
                    onChange={e => setEndTime(e.target.value)} />
                <label>Instructor:</label>
                <select
                    onChange={e => setInstructorName(e.target.value)}>
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