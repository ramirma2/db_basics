


import {Link} from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";


function MemberClassesSingle({member_classes}){
    return(
        <tr>

            <td>{member_classes.class_name}</td>
            <td>{member_classes.instructor}</td>
            <td>{member_classes.date}</td>
            <td>{member_classes.start_time}</td>

            <td><MdDeleteForever/></td>
        </tr>
    )
}

export default MemberClassesSingle;