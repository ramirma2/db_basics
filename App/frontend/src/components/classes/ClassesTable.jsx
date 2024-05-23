import ClassSingle from './ClassSingle';


function ClassesTable({ classes, onEdit, onDelete}) {


    return (
        <table className="classes-list">
            <thead>
                <tr>
                    <th>Class Name</th>
                    <th>Duration in minutes</th>
                    <th>Capacity</th>
                    <th>Description</th>
                    <th>Edit Class</th>
                    <th>Delete Class</th>
                </tr>
            </thead>
            <tbody>
                {classes.map((class_info, i) => <ClassSingle class_info={class_info}
                    key={i}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />)}
            </tbody>
        </table>
    )

}

export default ClassesTable;