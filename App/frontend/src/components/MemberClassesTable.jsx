import MemberClassesSingle from "./MemberClassesSingle";

function MemberClassesTable({member_classes_pending}){

    const member_classes=[
        {member_id:124, first_name:'Paul', last_name:'Kim', class_name: 'Strength' , instructor:'Johnny', date:'2024-05-01', start_time:'6:00am'}
    ]



    return(


            <table className="member-classes-list">
                <thead>
                <tr>
                    <th>Class Name</th>
                    <th>Instructor</th>
                    <th>Class Date</th>
                    <th>Start Time</th>
                    <th>Delete Sign Up</th>
                </tr>
                </thead>
                <tbody>
                    {member_classes.map((class_info, i)=> <MemberClassesSingle member_classes={class_info} key={i}/>)}
                </tbody>
            </table>

    )

}


export default MemberClassesTable;