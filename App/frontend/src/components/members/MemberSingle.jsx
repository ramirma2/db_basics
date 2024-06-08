
import {Link} from 'react-router-dom';
import { MdEdit, MdOutlineEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineSchedule } from "react-icons/md";
import { MdFitnessCenter } from "react-icons/md";


function MemberSingle({member,onDelete, onSelectMemberUpdate, onSelectMemberListClasses}){
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
                <MdFitnessCenter onClick={()=> onSelectMemberListClasses(member)}/></td>
            <td>
                <MdEdit
                onClick={()=> onSelectMemberUpdate(member)}/></td>
            <td><MdDeleteForever
                onClick={()=> onDelete(member.member_id)}/></td>
        </tr>
    )
}

export default MemberSingle;