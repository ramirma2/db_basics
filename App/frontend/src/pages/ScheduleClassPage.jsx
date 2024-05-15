import { useState } from 'react';

function ScheduleClassPage() {
    const [currClassName, setClassName] = useState("");
    const [date, setDate] = useState("");
    const [dayOfTheWeek, setDayOfTheWeek] = useState("");
    const [startTime, setStartTime] = useState("");
    const [member_email, setMemberEmail] = useState("");


    return (
        <form>
            <label>Class:</label>
            <input type="text" value={currClassName}
                onChange={e => setClassName(e.target.value)} />
            <label>Date:</label>
            <input type="date" value={date}
                onChange={e => setDate(e.target.value)} />
            <label>Day of the Week:</label>
            <input type="text" value={dayOfTheWeek}
                onChange={e => setDayOfTheWeek(e.target.value)} />
            <label>Start Time:</label>
            <input type="datetime" value={startTime}
                onChange={e => setStartTime(e.target.value)} />
            <label>Member email:</label>
            <input type="text" value={member_email}
                onChange={e => setMemberEmail(e.target.value)} />
            <button
                onClick={e => {
                    e.preventDefault();
                }}
            >Sign Up</button>
        </form>
    )
}

export default ScheduleClassPage;