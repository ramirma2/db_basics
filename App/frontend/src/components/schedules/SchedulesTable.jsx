import ScheduleSingle from './ScheduleSingle';


function SchedulesTable({ schedules, onEdit, onDelete, onScheduleClass, getMembersEnrolled }) {


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
                    <th>Total enrolled</th>
                    <th>Status</th>
                    <th>Edit Schedule</th>
                    <th>Sign Up</th>
                    <th>Enrolled list</th>
                </tr>

            </thead>
            <tbody>
                {schedules.map((sch, i) => <ScheduleSingle 
                                                schedule={sch} 
                                                key={i} 
                                                onEdit={onEdit}
                                                onScheduleClass={onScheduleClass}
                                                getMembersEnrolled={getMembersEnrolled}/>)}
            </tbody>
        </table>

    )
}

export default SchedulesTable;