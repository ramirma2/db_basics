import MemberSingle from "./MemberSingle";



function MembersTable({ members, onDelete, onEdit }) {


    return (
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
                {members.map((mem, i) => <MemberSingle
                                         member={mem} 
                                         key={i}
                                         onDelete={onDelete}
                                         onEdit={onEdit} />)}
            </tbody>
        </table>
    )

}


export default MembersTable;