import {useState} from 'react';

function SchedulesPage(){

    const [className, setClassName]=useState("");
    const [date, setDate]=useState("");
    const [dayOfTheWeek, setDayOfTheWeek]=useState("");
    const [startTime, setStartTime]=useState("");
    const [endTime, setEndTime]=useState("");
    const [instructorName, setInstructorName]=useState("");
    const [status, setStatus]=useState("");

    return(
        <section>
            <div>
                <h2>Manage our classes schedule</h2>


                <table className="schedule-list">
                    <tr>
                        <th>Class Name</th>
                        <th>Date</th>
                        <th>Day of the Week</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Instructor</th>
                        <th>Current Status</th>
                        <th>Edit Schedule</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>

            
            <form>
                <label>Class Name:</label>
                <input type="text" value={className} 
                onChange={e=> setClassName(e.target.value)} />
                <label>Date:</label>
                <input type="date" value={date} 
                onChange={e=> setDate(e.target.value)} />
                <label>Day of the Week:</label>
                <input type="text" value={dayOfTheWeek} 
                onChange={e=> setDayOfTheWeek(e.target.value)} />
                <label>Start Time:</label>
                <input type="datetime" value={startTime} 
                onChange={e=> setStartTime(e.target.value)} />
                <label>End Time:</label>
                <input type="datetime" value={endTime} 
                onChange={e=> setEndTime(e.target.value)} />
                <label>Instructor:</label>
                <select
                onChange= {e=> setInstructorName(e.target.value)}>
                    <option>Johnny</option>
                    <option>Lucas</option>
                    <option>Jess</option>
                    <option>Kailee</option>
                </select>
                <button
                    onClick={e=>{
                        e.preventDefault();
                    }}
                >Schedule Class</button>
            </form>
        </section>
    )

}

export default SchedulesPage;