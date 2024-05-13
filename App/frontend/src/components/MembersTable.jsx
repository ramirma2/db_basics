import MemberSingle from "./MemberSingle";



function MembersTable(){

    const myMembers=[
        {member_id:124, first_name:'Paul', last_name:'Kim', email: 'paulkim@gmail.com' , phone_number:'630-912-0238', member_since:'2024-01-02', membership_exp:'2025-01-02', birthdate: '2000-04-30'},
        {member_id:193, first_name:'Jayson', last_name:'Tatum', email:'tatum@gmail.com' , phone_number:'837-234-2349', member_since:'2023-12-01', membership_exp:'2024-12-01', birthdate:'1998-09-02'}
    ]

    return(
        <table className="members-list">
        <thead>
        <tr>
            <th>First Name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date Of Birth</th>
            <th>Member Since</th>
            <th>Membership Expires</th>
            <th>Enrolled Classes</th>
            <th>Edit Member</th>
            <th>Delete Member</th>
        </tr>
        </thead>
        <tbody>
            {myMembers.map((mem, i)=> <MemberSingle member={mem} key={i}/>)}
        </tbody>
    </table>
    )

}


export default MembersTable;