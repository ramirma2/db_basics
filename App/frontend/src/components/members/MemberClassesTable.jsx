import MemberClassesSingle from "./MemberClassesSingle";

function MemberClassesTable({ currMember, memberClasses, onDelete }) {


    return (


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
            <tbody>{memberClasses.length == 0 ? null :
                memberClasses.map((class_info, i) => <MemberClassesSingle 
                                                        class_info={class_info} 
                                                        key={i}
                                                        onDelete={onDelete} />)
            }
            </tbody>
        </table>

    )

}


export default MemberClassesTable;