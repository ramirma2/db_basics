import {Link} from 'react-router-dom';
import { MdEdit, MdOutlineEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

function InstructorSingle({instructor}){
    return(
        <tr>
            <td>{instructor.first_name}</td>
            <td>{instructor.last_name}</td>
            <td>{instructor.preferred_name}</td>
            <td>{instructor.email}</td>
            <td>{instructor.phone_number}</td>
            <td>
                <ul className='instructors-classes-list'>
                    {instructor.classes.map((one_class, i)=> <li key={i}>{one_class}</li>)}
                </ul>
            </td>

              <td> <Link to="/update-instructor" ><MdEdit/></Link></td>
            <td><MdDeleteForever/></td>
        </tr>
    )

}

export default InstructorSingle;