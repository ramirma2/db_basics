import { useEffect, useState } from 'react';
import MemberClassesTable from '../components/members/MemberClassesTable';
import axios from 'axios';

function MemberClassesPage({currMember}) {

    const [memberClasses, setMemberClasses] = useState([]);

    const getCurrMemberClasses = async() =>{
        try {
            const url = import.meta.env.VITE_API_URL + `members/${currMember.member_id}/classes`;
            const response = await axios.get(url);
            
            setMemberClasses(response.data);
        } catch (error) {
            console.error('Error getting the classes data:', error);
        }
    }

    const deleteMemberClass = async (class_info) =>{
        try {
            const url = import.meta.env.VITE_API_URL + `members/${currMember.member_id}/classes/${class_info.schedule_id}`;
            const response = await axios.delete(url);
            if (response.status == 200){
                alert("Class enrollment deleted")
                getCurrMemberClasses();
            }else{
                console.log("Error deleting enrollment requested")
            }
        } catch (error) {
            console.error('Error getting the classes data:', error);
        }
        
    }


    useEffect( ()=> {
        getCurrMemberClasses()
    },[])

    return (
        <section>
            <div>
                <div className="member-classes-header">
                    <h2>{currMember.first_name} {currMember.last_name} </h2>
                    <h4>Member No: {currMember.member_id}</h4>

                </div>

                <MemberClassesTable 
                        currMember={currMember}
                        memberClasses={memberClasses}
                        onDelete={deleteMemberClass}/>

            </div>

        </section>
    )
}

export default MemberClassesPage;