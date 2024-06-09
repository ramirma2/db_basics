import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { MdOutlineEdit } from 'react-icons/md';

function UpdateMemberPage({currMember, getMembers, members}){

    const [membersEmails, setMembersEmails ] = useState([]);
    const [firstName, setFirstName]=useState(currMember.first_name);
    const [lastName, setLastName]=useState(currMember.last_name);
    const [email, setEmail]=useState(currMember.email);
    const [phoneNumber, setPhoneNumber]=useState(currMember.phone_number);
    const [dob, setDOB] = useState(currMember.birthdate.split('T')[0]);
    const [memberSince, setMemberSince]=useState(currMember.member_since.split('T')[0]);
    const [memberUntil, setMemberUntil]=useState(currMember.membership_exp.split('T')[0]);

    const history = useNavigate();

    const editMember = async()=> {
        const isValid = await validate();
        if(isValid){
                const updates = { first_name:firstName, last_name:lastName, email:email, phone_number:phoneNumber, birthdate:dob, member_since:memberSince, membership_exp:memberUntil}
                try{
                    const url = import.meta.env.VITE_API_URL + `members/${currMember.member_id}`
                    const response = await axios.put(url, updates);
                    if (response.status == 200){
                        alert('Successfully updated member')
                    }else{
                        alert('The was a problem updating the member requested.')
                    }
    
                }catch(error){
                    console.log("Error updating the member requested:", error)
                }
                getMembers()
                history("/members")
        }else{
            alert("All values are required, also, make sure that the email is not already in use")
        }
    }

    const validate = async () =>{
        if (firstName && lastName && email && phoneNumber && dob && memberSince && memberUntil && !membersEmails.includes(email)){
            return true
        }else{
            return false
        }
    }


    useEffect(() =>{
        const all_members_emails = members.map(mem => mem.email).filter(email => email != currMember.email);
        setMembersEmails(all_members_emails)
    },[])

    return(
        <form>
            <label>First Name:</label>
            <input type="text" value={firstName} 
            onChange={e=> setFirstName(e.target.value)} />
            <label>Last Name:</label>
            <input type="text" value={lastName} 
            onChange={e=> setLastName(e.target.value)} />
            <label>Email:</label>
            <input type="text" value={email} 
            onChange={e=> setEmail(e.target.value)} />
            <label>Phone Number:</label>
            <input type="text" value={phoneNumber} 
            onChange={e=> setPhoneNumber(e.target.value)} />
            <label>Date Of Birth:</label>
            <input type="date" value={dob} 
            onChange={e=> setDOB(e.target.value)} />
            <label>Member Since:</label>
            <input type="date" value={memberSince} 
            onChange={e=> setMemberSince(e.target.value)} />
            <label>Membership Expires on:</label>
            <input type="date" value={memberUntil} 
            onChange={e=> setMemberUntil(e.target.value)} />
            <button
                onClick={e=>{
                    e.preventDefault();
                    editMember();
                }}
            >Update Member</button>
        </form>
    )
}

export default UpdateMemberPage;