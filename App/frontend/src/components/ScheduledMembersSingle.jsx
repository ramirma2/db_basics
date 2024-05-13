

import {Link} from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";


function ScheduledMembersSingle({members_list}){
    return(
        <tr>

            <td>{members_list.member_id}</td>
            <td>{members_list.first_name}</td>
            <td>{members_list.last_name}</td>

        </tr>
    )
}

export default ScheduledMembersSingle;