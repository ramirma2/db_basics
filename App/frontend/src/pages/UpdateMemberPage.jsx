import {useState} from 'react';

function UpdateMemberPage(){

    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [email, setEmail]=useState("");
    const [phoneNumber, setPhoneNumber]=useState("");
    const [dob, setDOB] = useState("");
    const [memberSince, setMemberSince]=useState("");
    const [memberUntil, setMemberUntil]=useState("");

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