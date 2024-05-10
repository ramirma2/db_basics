

import {Link} from 'react-router-dom';
import { MdEdit, MdOutlineEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

function ClassSingle({class_info}){

    return(
        <tr>
            <td>{class_info.name}</td>
            <td>{class_info.duration}</td>
            <td>{class_info.capacity}</td>
            <td>{class_info.description}</td>
            <td>
                <Link to="/update-class" ><MdEdit/></Link></td>
            <td><MdDeleteForever/></td>
        </tr>
    )

}

export default ClassSingle;