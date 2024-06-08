

import { MdDeleteForever } from "react-icons/md";


function MemberClassesSingle({class_info, onDelete}){
    return(
        <tr>

            <td>{class_info.class_name}</td>
            <td>{class_info.instructor}</td>
            <td>{new Date(class_info.date).toLocaleDateString().split(',')[0]}</td>
            <td>{class_info.start_time.substring(0, 5)}</td>

            <td><MdDeleteForever
                    onClick={()=> onDelete(class_info)}/></td>
        </tr>
    )
}

export default MemberClassesSingle;