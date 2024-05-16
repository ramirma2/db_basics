import { useState } from 'react';
import MemberClassesTable from '../components/members/MemberClassesTable';


function MemberClassesPage() {

    const member_classes = { member_id: 124, first_name: 'Paul', last_name: 'Kim' }


    return (
        <section>
            <div>
                <div className="member-classes-header">
                    <h2>{member_classes.first_name} {member_classes.last_name} </h2>
                    <h4>Member No: {member_classes.member_id}</h4>

                </div>

                <MemberClassesTable />

            </div>

        </section>
    )
}

export default MemberClassesPage;