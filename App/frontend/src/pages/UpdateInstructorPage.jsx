import {useEffect, useState} from 'react';
import axios from 'axios';
import Checkbox from '../components/Checkbox';
import {useNavigate} from 'react-router-dom';


function UpdateInstructorPage({classes, instructorToEdit, getInstructors, instructors}){

    const [instructorsEmails, setInstructorsEmails] = useState([]);
    const [firstName, setFirstName]=useState(instructorToEdit.first_name);
    const [lastName, setLastName]=useState(instructorToEdit.last_name);
    const [email, setEmail]=useState(instructorToEdit.email);
    const [phoneNumber, setPhoneNumber]=useState(instructorToEdit.phone_number);
    const [preferredName, setPreferredName] = useState(instructorToEdit.preferred_name);
    const [checkedState, setCheckedState] = useState(
        classes.map((one_class,i)=> instructorToEdit.classes_ids.includes(one_class.class_id))
    );
    const history = useNavigate()

    const editInstructor = async () =>{
        const isValid = await validate();
        if(isValid){
            const instructor_updates = {first_name:firstName, last_name:lastName, email, phone_number:phoneNumber, preferred_name:preferredName};
            const classes_to_add = check_for_classes_to_add().map((one_class, i)=> one_class.class_id);
            const classes_to_delete = check_for_classes_to_del().map((one_class, i)=> one_class.class_id);
            try {
                const url = import.meta.env.VITE_API_URL + `instructors/${instructorToEdit.instructor_id}`;
                const response = await axios.put(url,instructor_updates);
                if (classes_to_add.length >0) await add_inst_class(classes_to_add);
                if (classes_to_delete.length >0) await del_inst_class(classes_to_delete);

                if(response.status == 200){
                    alert('Successfully updated instructor')
                }else{
                    alert('There was a problem updating the instructor requested')
                }
            }catch(error){
                console.log("Error updating the instructor requested:", error)
            }
            getInstructors()
            history("/instructors");
        }else{
            alert("All values are required, also, make sure that the email is not already in use")
        }
    }

    const add_inst_class = async(class_ids) =>{
        try{
            const url = import.meta.env.VITE_API_URL + `instructors/${instructorToEdit.instructor_id}/classes`;
            const response = await axios.post(url, {class_ids});
            if(response.status == 200){
                console.log('Successfully added classes for instructor')
            }else{
                console.log('There was a problem adding classes for the instructor requested')
            }
        }catch(error){
            console.log("Error adding classes for instructor requested:", error)
        }
    }
    const del_inst_class = async(class_ids) =>{
        try{
            const url = import.meta.env.VITE_API_URL + `instructors/${instructorToEdit.instructor_id}/classes`;
            
            const response = await axios.delete(url, {data:class_ids});
            if(response.status == 200){
                console.log('Successfully removed classes for instructor')
            }else{
                console.log('There was a problem removing classes for the instructor requested')
            }
        }catch(error){
            console.log("Error removing classes for instructor requested:", error)
        }
    }

    const check_for_classes_to_add=()=>{
        const add_classes = classes.filter((one_class,i)=>{
            return checkedState[i] && !instructorToEdit.classes_ids.includes(one_class.class_id)
        })
        return add_classes;
    }

    const check_for_classes_to_del = () =>{
        const del_classes = classes.filter((one_class,i)=>{
            return !checkedState[i] && instructorToEdit.classes_ids.includes(one_class.class_id)
        })
        return del_classes;
    }


    const onCheckboxChange = (class_id) =>{
        //find the index of this class in the classes array
        //uodate checked state with that index
        const indx = classes.findIndex(one_class => one_class.class_id == class_id);

        const updatedCheckedState = checkedState.map((item, i)=>
            i === indx ? !item :item
            );
            setCheckedState(updatedCheckedState);
    }

    const validate = async () =>{
        if (firstName && lastName && email && phoneNumber && preferredName && !instructorsEmails.includes(email)){
            return true
        }else{
            return false
        }
    }

    useEffect(() =>{
        const all_instructors_emails = instructors.map(inst => inst.email).filter(email => email != instructorToEdit.email);;
        setInstructorsEmails(all_instructors_emails)
    },[])




    return(
        <form>
        <label>First Name:</label>
        <input type="text" value={firstName} 
        onChange={e=> setFirstName(e.target.value)} />
        <label>Last Name:</label>
        <input type="text" value={lastName} 
        onChange={e=> setLastName(e.target.value)} />
        <label>Preferred Name:</label>
        <input type="text" value={preferredName} 
        onChange={e=> setPreferredName(e.target.value)} />
        <label>Email:</label>
        <input type="text" value={email} 
        onChange={e=> setEmail(e.target.value)} />
        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} 
        onChange={e=> setPhoneNumber(e.target.value)} />
        <fieldset>
            <legend>Classes:</legend>
                {
                    classes.map((one_class, index)=>{
                        return (
                            <Checkbox 
                                key={index}
                                info={one_class}
                                checked= {checkedState[index]}
                                onCheckboxChange={onCheckboxChange}/>

                        )
                    })
                }
            </fieldset>
        <button
            onClick={e=>{
                e.preventDefault();
                editInstructor();
            }}
        >Update Instructor</button>
    </form>
    )
}

export default UpdateInstructorPage;