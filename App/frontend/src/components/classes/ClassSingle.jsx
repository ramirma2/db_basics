

import {Link} from 'react-router-dom';
import { MdEdit, MdOutlineEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

function ClassSingle({class_info, onEdit, onDelete}){

    return(
        <tr>
            <td>{class_info.name}</td>
            <td>{class_info.duration}</td>
            <td>{class_info.capacity}</td>
            <td>{class_info.description}</td>
            <td>
                <MdEdit  
                    onClick={()=> onEdit(class_info)}/></td>
            <td><MdDeleteForever
                    onClick={()=> onDelete(class_info.class_id)}/></td>
        </tr>
    )

}

export default ClassSingle;