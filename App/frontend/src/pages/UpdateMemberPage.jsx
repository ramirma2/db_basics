import {useState} from 'react';

function UpdateMemberPage({memberToEdit}){

    const [firstName, setFirstName]=useState(memberToEdit.first_name);
    const [lastName, setLastName]=useState(memberToEdit.last_name);
    const [email, setEmail]=useState(memberToEdit.email);
    const [phoneNumber, setPhoneNumber]=useState(memberToEdit.phone_number);
    const [dob, setDOB] = useState(memberToEdit.birthdate);
    const [memberSince, setMemberSince]=useState(memberToEdit.member_since);
    const [memberUntil, setMemberUntil]=useState(memberToEdit.membership_exp);

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
                }}
            >Update Member</button>
        </form>
    )
}

export default UpdateMemberPage;