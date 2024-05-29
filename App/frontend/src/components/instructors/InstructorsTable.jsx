import InstructorSingle from "./InstructorSingle";


function InstructorsTable({ instructors }) {


    return (

        <table className="instructors-list">
            <thead>
                <tr>
                    <th>Preferred Name</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Classes</th>
                    <th>Edit </th>
                    <th>Delete </th>

                </tr>

            </thead>
            <tbody>
                {instructors.map((inst, i) => <InstructorSingle instructor={inst} key={i} />)}
            </tbody>

        </table>
    )

}

export default InstructorsTable;