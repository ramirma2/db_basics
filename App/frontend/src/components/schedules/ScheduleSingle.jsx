import {Link} from 'react-router-dom';
import { MdEdit, MdOutlineEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdAdd } from 'react-icons/md';
import { MdOutlineList } from "react-icons/md";

function ScheduleSingle({schedule, onEdit}){

    return(
        <tr>
            <td>{schedule.class_name}</td>
            <td>{new Date(schedule.date).toLocaleDateString().split(',')[0]}</td>
            <td>{schedule.day_of_the_week}</td>
            <td>{schedule.start_time.substring(0,5)}</td>
            <td>{schedule.end_time.substring(0,5)}</td>
            <td>{schedule.instructor}</td>
            <td>{schedule.members_enrolled}</td>
            <td>{schedule.status}</td>
            <td> <MdEdit
                onClick={()=> onEdit(schedule)}/></td>
            <td> <Link to="/schedule-class" ><MdAdd/></Link></td>
            <td> <Link to="/scheduled-members" ><MdOutlineList /></Link></td>
            
        </tr>
    )
}

export default ScheduleSingle;