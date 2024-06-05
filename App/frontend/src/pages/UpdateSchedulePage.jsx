import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function UpdateSchedulePage({classes, scheduleToEdit, instructors, getSchedules}){
    // const [currClassName, setClassName]=useState(scheduleToEdit.class_name);
    const [currClassName, setClassName]=useState();
    const [date, setDate]=useState(scheduleToEdit.date);
    const [dayOfTheWeek, setDayOfTheWeek]=useState(scheduleToEdit.day_of_the_week);
    const [startTime, setStartTime]=useState(scheduleToEdit.start_time);
    const [endTime, setEndTime]=useState(scheduleToEdit.end_time);
    const [instructorName, setInstructorName]=useState(scheduleToEdit.instructor);
    const [status, setStatus]=useState(scheduleToEdit.status);
    const history = useNavigate();

    const editSchedule = async()=> {
        if (isInputValid()){
        const class_id = classes.filter((clss, i)=> clss.name == currClassName).map(clss => clss.class_id)
        const updates = {class_id, date, day_of_the_week: dayOfTheWeek, start_time: startTime, end_time: endTime, instructor: instructorName, status}
        try{
            const url = import.meta.env.VITE_API_URL + `schedules/${scheduleToEdit.schedule_id}`
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
        onChange= {e=> setClassName(e.target.value)}>
            {classes.map((clss, i)=> <option>{clss.name}</option>)}

        </select>
        <input type="text" value={currClassName} 
        onChange={e=> setClassName(e.target.value)} />
        <label>Date:</label>
        <input type="date" value={date} 
        onChange={e=> setDate(e.target.value)} />
        <label>Day of the Week:</label>
        <input type="text" value={dayOfTheWeek} 
        onChange={e=> setDayOfTheWeek(e.target.value)} />
        <label>Start Time:</label>
        <input type="time" value={startTime} 
        onChange={e=> setStartTime(e.target.value)} />
        <label>End Time:</label>
        <input type="time" value={endTime} 
        onChange={e=> setEndTime(e.target.value)} />
        <label>Instructor:</label>
        <select
        onChange= {e=> setInstructorName(e.target.value)}>
            {instructors.map((inst, i)=> <option>{inst.preferred_name}</option>)}

        </select>
        <label>Class Status:</label>
        <select
        onChange= {e=> setStatus(e.target.value)}>
            <option>Open</option>
            <option>Cancelled</option>
            <option>Full</option>
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