import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function UpdateSchedulePage({classes, currSchedule, instructors, getSchedules}){
    const [currClassName, setClassName]=useState(currSchedule.class_name);
    const [date, setDate]=useState(currSchedule.date.split('T')[0]);
    const [dayOfTheWeek, setDayOfTheWeek]=useState(currSchedule.day_of_the_week ? currSchedule.day_of_the_week : "Monday");
    const [startTime, setStartTime]=useState(currSchedule.start_time);
    const [endTime, setEndTime]=useState(currSchedule.end_time);
    const [instructorName, setInstructorName]=useState(currSchedule.instructor);
    const [status, setStatus]=useState(currSchedule.status);
    const history = useNavigate();

    const editSchedule = async()=> {
        if (isInputValid()){
        const class_id = classes.filter((clss, i)=> clss.name == currClassName).map(clss => clss.class_id)
        const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const day_of_the_week = weekdays[new Date(date).getDay()];
        const updates = {class_id, date, day_of_the_week, start_time: startTime, end_time: endTime, instructor: instructorName, status}
        try{
            const url = import.meta.env.VITE_API_URL + `schedules/${currSchedule.schedule_id}`
            const response = await axios.put(url, updates);
            if (response.status == 200){
                alert('Successfully updated schedule')
            }else{
                alert('The was a problem updating the schedule requested.')
            }

        }catch(error){
            console.log("Error updating the schedule requested:", error)
        }
        getSchedules()
        history("/schedules")
        }else{
            return  
        }
    }

    const isInputValid = ()=>{
        if (currClassName == ''){

            
            showAlert('Class name');
            return false;
        }
        if(date== ''){
            showAlert('Date')
            return false;
        }
        if(dayOfTheWeek==''){
            showAlert('Day of the Week');
            return false;
        }
        if(startTime==''){
            showAlert('Start Time');
            return false;
        }
        if(endTime==''){
            showAlert('End Time');
            return false;
        }
        if(instructorName==''){
            showAlert('Instructor Name');
            return false;
        }

        else{
            return true
        }
    }

    const showAlert = (inputValue) =>{
        alert(`${inputValue} is required`)
    }  

    return(
        <form>
        <label>Class Name:</label>
        <select
        onChange= {e=> setClassName(e.target.value)}
        defaultValue={currClassName}>
            {classes.map((clss, i)=> <option>{clss.name}</option>)}

        </select>
 
        <label>Date:</label>
        <input type="date" value={date} 
        onChange={e=> setDate(e.target.value)} />

        <label>Start Time:</label>
        <input type="time" value={startTime} 
        onChange={e=> setStartTime(e.target.value)} />
        <label>End Time:</label>
        <input type="time" value={endTime} 
        onChange={e=> setEndTime(e.target.value)} />
        <label>Instructor:</label>
        <select
        onChange= {e=> setInstructorName(e.target.value)}
        defaultValue={instructorName}>
            {instructors.map((inst, i)=> <option>{inst.preferred_name}</option>)}

        </select>
        <label>Class Status:</label>
        <select
        onChange= {e=> setStatus(e.target.value)}
        defaultValue={status}>
            <option>open</option>
            <option>canceled</option>
            <option>full</option>
        </select>
        <button
            onClick={e=>{
                e.preventDefault();
                editSchedule();
            }}
        >Update Schedule</button>
    </form>
    )
}

export default UpdateSchedulePage;