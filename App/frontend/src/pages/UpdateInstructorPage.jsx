import {useState} from 'react';


function UpdateInstructorPage(){
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [email, setEmail]=useState("");
    const [phoneNumber, setPhoneNumber]=useState("");
    const [preferredName, setPreferredName] = useState("");

    return(
        <form>
        <label>First Name:</label>
        <input type="text" value={firstName} 
        onChange={e=> setFirstName(e.target.value)} />
        <label>Last Name:</label>
        <input type="text" value={lastName} 
        onChange={e=> setLastName(e.target.value)} />
        <label>Preferred Name:</label>
        <input type="date" value={preferredName} 
        onChange={e=> setPreferredName(e.target.value)} />
        <label>Email:</label>
        <input type="text" value={email} 
        onChange={e=> setEmail(e.target.value)} />
        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} 
        onChange={e=> setPhoneNumber(e.target.value)} />
        <button
            onClick={e=>{
                e.preventDefault();
            }}
        >Update Instructor</button>
    </form>
    )
}

export default UpdateInstructorPage;