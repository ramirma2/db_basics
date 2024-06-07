import { Link } from 'react-router-dom';
import { MdEdit, MdOutlineEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdAdd } from 'react-icons/md';
import { MdOutlineList } from "react-icons/md";

function ScheduleSingle({ schedule, onEdit, onScheduleClass, getMembersEnrolled }) {

    return (
        <tr>
            <td>{schedule.class_name}</td>
            <td>{new Date(schedule.date).toLocaleDateString().split(',')[0]}</td>
            <td>{schedule.day_of_the_week}</td>
            <td>{schedule.start_time.substring(0, 5)}</td>
            <td>{schedule.end_time.substring(0, 5)}</td>
            <td>{schedule.instructor}</td>
            <td>{schedule.members_enrolled}</td>
            <td>{schedule.status}</td>
            <td> <MdEdit
                onClick={() => onEdit(schedule)} /></td>

            <td>
            {schedule.status == 'canceled' || schedule.status == 'full' ? 
                "Not taking sign-ups" :
                
                <MdAdd
                onClick={() => onScheduleClass(schedule)} />
            }
            </td>
            <td> <MdOutlineList
                    onClick={()=>getMembersEnrolled(schedule)} /></td>

        </tr>
    )
}

export default ScheduleSingle;