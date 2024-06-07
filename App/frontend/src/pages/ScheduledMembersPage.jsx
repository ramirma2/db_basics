import {useState} from 'react';
import ScheduledMembersTable from '../components/ScheduledMembersTable';


function ScheduledMembersPage({scheduledMembers, currSchedule}) {


    return (
        <section>
            <div>
                <div className="member-classes-header">
                    <p>Enrollment list for:</p>
                    <h2>{currSchedule.class_name} </h2>
                    <h4>Scheduled on: {new Date(currSchedule.date).toLocaleDateString().split(',')[0]}, at {currSchedule.start_time.substring(0,5)} </h4>
                    <p className='small-text'>If needed, enrollments can be deleted from the individual member enrollment page</p>
                </div>

                <ScheduledMembersTable 
                    scheduledMembers={scheduledMembers} />

            </div>

        </section>
    )
}

export default ScheduledMembersPage;