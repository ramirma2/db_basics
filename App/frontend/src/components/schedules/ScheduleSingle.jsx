import {Link} from 'react-router-dom';
import { MdEdit, MdOutlineEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdAdd } from 'react-icons/md';
import { MdOutlineList } from "react-icons/md";

function ScheduleSingle({schedule}){

    return(
        <tr>
            <td>{schedule.class_name}</td>
            <td>{schedule.date}</td>
            <td>{schedule.start_time}</td>
            <td>{schedule.end_time}</td>
            <td>{schedule.day_of_the_week}</td>
            <td>{schedule.instructor}</td>
            <td>{schedule.at_capacity}</td>
            <td>{schedule.status}</td>
            <td> <Link to="/update-schedule" ><MdEdit/></Link></td>
            <td> <Link to="/schedule-class" ><MdAdd/></Link></td>
            <td> <Link to="/scheduled-members" ><MdOutlineList /></Link></td>
            
        </tr>
    )
}

export default ScheduleSingle;