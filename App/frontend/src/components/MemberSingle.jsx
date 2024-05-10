

import {Link} from 'react-router-dom';
import { MdEdit, MdOutlineEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";


function MemberSingle({member}){
    return(
        <tr>
            <td>{member.first_name}</td>
            <td>{member.last_name}</td>
            <td>{member.email}</td>
            <td>{member.phone_number}</td>
            <td>{member.birthdate}</td>
            <td>{member.member_since}</td>
            <td>{member.membership_exp}</td>
            <td>
                <Link to="/update-member" ><MdEdit/></Link></td>
            <td><MdDeleteForever/></td>
        </tr>
    )
}

export default MemberSingle;