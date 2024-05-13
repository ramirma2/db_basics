import {useState} from 'react';
import ScheduledMembersTable from '../components/ScheduledMembersTable';


function ScheduledMembersPage() {

    const class_details={class_name:"Strength 1", class_date:'2024-05-01', class_start_time:'6:00 am'}


    return (
        <section>
            <div>
                <div className="member-classes-header">
                    <p>Enrollment list for:</p>
                    <h2>{class_details.class_name} </h2>
                    <h4>Scheduled on: {class_details.class_date}, {class_details.class_start_time} </h4>
                    <p className='small-text'>If needed, enrollments can be deleted from the individual member enrollment page</p>
                </div>

                <ScheduledMembersTable  />

            </div>

        </section>
    )
}

export default ScheduledMembersPage;