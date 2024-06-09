import { useState, useEffect } from 'react';
import MembersTable from '../components/members/MembersTable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MembersPage({ members, getMembers, setMember }) {

    const history = useNavigate();
    const [membersEmails, setMembersEmails ] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDOB] = useState("");
    const [memberSince, setMemberSince] = useState("");
    const [memberUntil, setMemberUntil] = useState("");


    const addMember = async () => {
        const isValid = await validate();
        if(isValid){
        const attributes = { first_name: firstName, last_name: lastName, email, phone_number: phoneNumber, birthdate: dob, member_since: memberSince, membership_exp: memberUntil }
            try {
                const url = import.meta.env.VITE_API_URL + 'members';
                const response = await axios.post(url, attributes);
                if (response.status == 200) {
                    resetInputs();
                    alert("New Member Added")
                } else {
                    alert("There was a problem adding this member")
                }
    
            } catch (error) {
                console.log('Error adding a new member')
            }
            getMembers()
        }else{
            alert("All values are required, also, make sure that the email is not already in use")
        }
    }


    const onDelete = async memberToDelete => {
        const url = import.meta.env.VITE_API_URL + `members/${memberToDelete}`
        const response = await axios.delete(url)
        getMembers();
    }


    const onSelectMemberUpdate = async memberToEdit => {
        const mem = await getMember(memberToEdit.member_id)
        setMember(mem);
        history("/update-member");
    }


    const onSelectMemberListClasses = async memberToEdit => {
        const mem = await getMember(memberToEdit.member_id)
        setMember(mem);
        history("/member-classes")
    }

    const getMember = async (mem_id) => {
        try {
            const url = import.meta.env.VITE_API_URL + `members/${mem_id}`
            const response = await axios.get(url);
            return response.data[0];
        } catch (error) {
            console.log("Error getting the member requested:", error)
        }
    }

    const validate = async () =>{
        if (firstName && lastName && email && phoneNumber && dob && memberSince && memberUntil && !membersEmails.includes(email)){
            return true
        }else{
            return false
        }
    }

    const resetInputs = () =>{
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setDOB('');
        setMemberSince('');
        setMemberUntil('');
    }

    useEffect(() =>{
        const all_members_emails = members.map(mem => mem.email);
        setMembersEmails(all_members_emails)
    },[])


    return (
        <section>
            <div>
                <h2>Current members of our studio:</h2>

                <MembersTable members={members}
                    onDelete={onDelete}
                    onSelectMemberUpdate={onSelectMemberUpdate}
                    onSelectMemberListClasses={onSelectMemberListClasses} />

            </div>

            <form>
                <label>First Name:</label>
                <input type="text" value={firstName}
                    onChange={e => setFirstName(e.target.value)} />
                <label>Last Name:</label>
                <input type="text" value={lastName}
                    onChange={e => setLastName(e.target.value)} />
                <label>Email:</label>
                <input type="text" value={email}
                    onChange={e => setEmail(e.target.value)} />
                <label>Phone Number:</label>
                <input type="text" value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)} />
                <label>Date Of Birth:</label>
                <input type="date" value={dob}
                    onChange={e => setDOB(e.target.value)} />
                <label>Member Since:</label>
                <input type="date" value={memberSince}
                    onChange={e => setMemberSince(e.target.value)} />
                <label>Membership Expires on:</label>
                <input type="date" value={memberUntil}
                    onChange={e => setMemberUntil(e.target.value)} />
                <button
                    onClick={e => {
                        e.preventDefault();
                        addMember();
                    }}
                >Add New Member</button>
            </form>

        </section>
    )
}

export default MembersPage;