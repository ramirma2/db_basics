import { useState, useEffect } from 'react';
import InstructorsTable from '../components/instructors/InstructorsTable';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function InstructorsPage({setInstructorToEdit}) {

    const history = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [preferredName, setPreferredName] = useState("");
    const [instructors ,setInstructors] = useState([]);
    const url_main = import.meta.env.VITE_API_URL

    const onEdit = async instructorToEdit =>{
        const inst = await getInstructor(instructorToEdit);
        setInstructorToEdit(inst);
        history("/update-instructor");
    }

    const onDelete = async instructorToDelete => {
        const url = url_main + `instructors/${instructorToDelete}`;
        const response = await axios.delete(url);
        getInstructors();
    }

    const getInstructor = async (instructor_id) =>{
        try{
            const url = url_main + `instructors/${instructor_id}`;
            const response = await axios.get(url);
            const inst_classes  = await getInstructorClasses(instructor_id);
            const inst_classes_id = inst_classes.map((one_class,i)=> one_class.class_id)
            return {...response.data[0], classes_ids:inst_classes_id};
        }catch(error){
            console.log('Error getting the instructor requested:',error);
        }
    }

    const getInstructorClasses = async (instructor_id) => {
        try{
            const url = url_main + `instructors/${instructor_id}/classes`;
            const response = await axios.get(url);
            return response.data;
        }catch(error){
            console.log("Error getting the instructor's data requested:",error);
        }
    }

    const getInstructors = async () =>{
        try{
            const url = url_main + 'instructors'; 
            const response = await axios.get(url);
            const response_with_classes = await getEachClass(response.data);
            setInstructors(response_with_classes);
        }catch(error) {
            console.log("Error getting the instructors data:", error)
        }
    }

    const addInstructor = async () =>{
        const attributes = {first_name:firstName, last_name:lastName, preferred_name: preferredName, email, phone_number:phoneNumber};
        try{
            const url = url_main + 'instructors';
            const response = await axios.post(url, attributes);
            if(response.status == 200){
                resetInputs();
                alert("Instructor Added");
            }else{
                alert("There was a problem adding a new instructor");
            }

        } catch(error){
            console.log("Error adding a new instructor");
        }
        getInstructors();
    }

    const getEachClass = async (instructors) => {

            let classes =  await Promise.all(
                instructors.map(async(inst, i)=>{
                    return getInstructorClasses(inst.instructor_id)
                })
            )
            const instructors_updated = instructors.map((inst, i)=>{
                return {...inst, classes: classes[i]}
            })
            
        return instructors_updated;
    }

    const resetInputs = ()=> {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setPreferredName('');
    }

    useEffect( () => {
        getInstructors();
    }, [])



    return (
        <section>
            <div>
                <h2>Meet/Manage our Instructors:</h2>
                <InstructorsTable instructors={instructors}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                getInstructorClasses={getInstructorClasses} />
            </div>

            <form>
                <label>First Name:</label>
                <input type="text" value={firstName}
                    onChange={e => setFirstName(e.target.value)} />
                <label>Last Name:</label>
                <input type="text" value={lastName}
                    onChange={e => setLastName(e.target.value)} />
                <label>Preferred Name:</label>
                <input type="text" value={preferredName}
                    onChange={e => setPreferredName(e.target.value)} />
                <label>Email:</label>
                <input type="text" value={email}
                    onChange={e => setEmail(e.target.value)} />
                <label>Phone Number:</label>
                <input type="text" value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)} />


                <button
                    onClick={e => {
                        e.preventDefault();
                        addInstructor();
                    }}
                >Add Instructor</button>
            </form>

        </section>
    )
}

export default InstructorsPage