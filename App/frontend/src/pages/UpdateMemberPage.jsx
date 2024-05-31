import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { MdOutlineEdit } from 'react-icons/md';

function UpdateMemberPage({memberToEdit}){

    const [firstName, setFirstName]=useState(memberToEdit.first_name);
    const [lastName, setLastName]=useState(memberToEdit.last_name);
    const [email, setEmail]=useState(memberToEdit.email);
    const [phoneNumber, setPhoneNumber]=useState(memberToEdit.phone_number);
    const [dob, setDOB] = useState(memberToEdit.birthdate.split('T')[0]);
    const [memberSince, setMemberSince]=useState(memberToEdit.member_since.split('T')[0]);
    const [memberUntil, setMemberUntil]=useState(memberToEdit.membership_exp.split('T')[0]);

    const history = useNavigate();

    const editMember = async()=> {
        if (isInputValid()){
            const updates = { first_name:firstName, last_name:lastName, email:email, phone_number:phoneNumber, birthdate:dob, member_since:memberSince, membership_exp:memberUntil}
            try{
                const url = import.meta.env.VITE_API_URL + `members/${memberToEdit.member_id}`
                const response = await axios.put(url, updates);
                if (response.status == 200){
                    alert('Successfully updated member')
                }else{
                    alert('The was a problem updating the member requested.')
                }

            }catch(error){
                console.log("Error updating the member requested:", error)
            }
            history("/members")
        }else{
            return  
        }
    }


    const isInputValid = ()=>{
        if (firstName == ''){
            showAlert('First name');
            return false;
        }
        if(lastName== ''){
            showAlert('Last Name')
            return false;
        }
        if(email==''){
            showAlert('Email');
            return false;
        }
        if(phoneNumber==''){
            showAlert('Phone number');
            return false;
        }
        if(dob==''){
            showAlert('Date of Birth');
            return false;
        }
        if(memberSince==''){
            showAlert('Member Since');
            return false;
        }
        if(memberUntil==''){
            showAlert('Membership Expires on');
            return false;
        }
        else{
            return true
        }
    }

    const showAlert = (inputValue) =>{
        alert(`${inputValue} is required`)
    }

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