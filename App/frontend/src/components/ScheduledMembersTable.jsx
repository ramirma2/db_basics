import ScheduledMembersSingle from "./ScheduledMembersSingle";

function ScheduledMembersTable({scheduled_mems}){

    const scheduled_members=[
        {member_id:124, first_name:'Paul', last_name:'Kim', class_name: 'Strength', date:'2024-05-01', start_time:'6:00am'},
        {member_id:193, first_name:'Jayson', last_name:'Tatum', class_name: 'Strength', date:'2024-05-01', start_time:'6:00am'},
        {member_id:184, first_name:'Claire', last_name:'Bowles', class_name: 'Strength', date:'2024-05-01', start_time:'6:00am'},
        {member_id:82, first_name:'Clay', last_name:'Bateman', class_name: 'Strength', date:'2024-05-01', start_time:'6:00am'},
    ]



    return(


            <table className="member-classes-list">
                <thead>
                <tr>
                    <th>Member id</th>
                    <th>First Name</th>
                    <th>Last Name</th>

                </tr>
                </thead>
                <tbody>
                    {scheduled_members.map((mem_info, i)=> <ScheduledMembersSingle members_list={mem_info} key={i}/>)}
                </tbody>
            </table>

    )

}


export default ScheduledMembersTable;