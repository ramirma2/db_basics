import { useState } from 'react';
import { MdEdit } from "react-icons/md";
import SchedulesTable from "../components/schedules/SchedulesTable";

function SchedulesPage({ schedules, instructors }) {

    const [currClassName, setClassName] = useState("");
    const [date, setDate] = useState("");
    const [dayOfTheWeek, setDayOfTheWeek] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [instructorName, setInstructorName] = useState("");
    const [status, setStatus] = useState("");

    return (
        <section>
            <div>
                <h2>Manage our classes schedule</h2>

                <SchedulesTable schedules={schedules} />

            </div>


            <form>
                <label>Class Name:</label>
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
                <label>End Time:</label>
                <input type="datetime" value={endTime}
                    onChange={e => setEndTime(e.target.value)} />
                <label>Instructor:</label>
                <select
                    onChange={e => setInstructorName(e.target.value)}>
                    {instructors.map((inst, i) => <option key={i}>{inst.preferred_name}</option>)}
                </select>
                <button
                    onClick={e => {
                        e.preventDefault();
                    }}
                >Add to Schedule</button>
            </form>
        </section>
    )

}

export default SchedulesPage;