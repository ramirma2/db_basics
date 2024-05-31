
import {Link} from 'react-router-dom';
import { MdEdit, MdOutlineEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineSchedule } from "react-icons/md";
import { MdFitnessCenter } from "react-icons/md";


function MemberSingle({member,onDelete, onEdit}){
    return(
        <tr>
            <td>{member.first_name}</td>
            <td>{member.last_name}</td>
            <td>{member.email}</td>
            <td>{member.phone_number}</td>
            <td>{new Date(member.birthdate).toLocaleString().split(',')[0]}</td>
            <td>{new Date(member.member_since).toLocaleString().split(',')[0]}</td>
            <td>{new Date(member.membership_exp).toLocaleString().split(',')[0]}</td>
            <td>
                <Link to="/member-classes" ><MdFitnessCenter/></Link></td>
            <td>
                <MdEdit
                onClick={()=> onEdit(member)}/></td>
            <td><MdDeleteForever
                onClick={()=> onDelete(member.member_id)}/></td>
        </tr>
    )
}

export default MemberSingle;