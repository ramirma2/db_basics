import { useState } from 'react';
import ScheduledMembersPage from './ScheduledMembersPage';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function ScheduleClassPage({classToSchedule, members, getSchedules}) {
    const [currClassName, setClassName] = useState(classToSchedule.class_name);
    const [date, setDate] = useState(new Date(classToSchedule.date).toLocaleDateString().split(',')[0]);
    const [dayOfTheWeek, setDayOfTheWeek] = useState(classToSchedule.day_of_the_week);
    const [startTime, setStartTime] = useState(classToSchedule.start_time.substring(0,5));
    const [member_email, setMemberEmail] = useState();

    const history = useNavigate();


    const scheduleMember = async ()=>{
        const data = {schedule_id: classToSchedule.schedule_id, members_enrolled:classToSchedule.members_enrolled };
        
        const member_id = members.filter((mem, i) => mem.email == member_email).map(mem => mem.member_id);
        try{
            const url = import.meta.env.VITE_API_URL + `members/${member_id}/sign-up-schedules`
            const response = await axios.post(url, data)
            if (response.status == 200){
                alert('Successfully added member to schedule')
            }else{
                alert('The was a problem adding member to the schedule requested.')
            }
        }catch(error){
            console.log("Error updating the schedule requested:", error);

        }
        getSchedules()
        history('/schedules')
    }

    return (
        <section>
            <div className="class-schedule-info">
                <h3>{currClassName}</h3>
                <p>On: {dayOfTheWeek}, {date}</p>
                <p>Starts at: {startTime}</p>
            </div>
            <form className='class-schedule-form'>

                <label>Select member's email to schedule':</label>
                    <select
                    onChange= {e=> {setMemberEmail(e.target.value)}}>
                        <option disabled selected value> -- select a member by email -- </option>
                        {members.map((mem, i)=> <option key={i} >{mem.email}</option>)}

                    </select>

                <button
                    onClick={e => {
                        e.preventDefault();
                        scheduleMember();
                    }}
                >Sign Up</button>
            </form>

        </section>
    )
}

export default ScheduleClassPage;