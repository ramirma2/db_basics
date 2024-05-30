import {Link} from 'react-router-dom';
import { MdEdit, MdOutlineEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

function InstructorSingle({instructor, onEdit, onDelete, getInstructorClasses}){


    return(
        <tr>
            <td>{instructor.preferred_name}</td>
            <td>{instructor.first_name}</td>
            <td>{instructor.last_name}</td>
            <td>{instructor.email}</td>
            <td>{instructor.phone_number}</td>
            <td>
                <ul className='instructors-classes-list'>
                    {instructor.classes.map((one_class, i)=> <li key={i}>{one_class.class_name}</li>)}
                </ul>
            </td>

              <td> <MdEdit
                        onClick={() => onEdit(instructor.instructor_id)}/></td>
            <td><MdDeleteForever
                    onClick={()=> onDelete(instructor.instructor_id)}/></td>
        </tr>
    )

}

export default InstructorSingle;