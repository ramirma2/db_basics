import ScheduleSingle from './ScheduleSingle';


function SchedulesTable({ schedules }) {

    const mySchedules = [
        { schedule_id: 1, class_name: "Strength", date: '2024-05-01', start_time: '6:00am', end_time: '6:50am', day_of_the_week: 'M', instructor: 'Johnny', at_capacity: "False", status: 'open' },
        { schedule_id: 2, class_name: "Strength 1", date: '2024-05-01', start_time: '9:00am', end_time: '9:50am', day_of_the_week: 'M', instructor: 'Johnny', at_capacity: "False", status: 'open' }
    ]

    return (
        <table className="schedule-list">
            <thead>
                <tr>
                    <th>Class Name</th>
                    <th>Date</th>
                    <th>Day of the Week</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Instructor</th>
                    <th>Full?</th>
                    <th>Status</th>
                    <th>Edit Schedule</th>
                    <th>Sign Up</th>
                    <th>Enrolled list</th>
                </tr>

            </thead>
            <tbody>
                {schedules.map((sch, i) => <ScheduleSingle schedule={sch} key={i} />)}
            </tbody>
        </table>

    )
}

export default SchedulesTable;