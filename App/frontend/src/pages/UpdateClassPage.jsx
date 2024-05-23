import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function UpdateClassPage({classToEdit}){
    const [name, setName] = useState(classToEdit.name);
    const [duration, setDuration] = useState(classToEdit.duration);
    const [capacity, setCapacity] = useState(classToEdit.capacity);
    const [description, setDescription] = useState(classToEdit.description);

    const history = useNavigate()

    const editClass = async()=> {
        if (isInputValid()){
        const updates = { name, duration, capacity, description}
        try{
            const url = import.meta.env.VITE_API_URL + `classes/${classToEdit.class_id}`
            const response = await axios.put(url, updates);
            if (response.status == 200){
                alert('Successfully updated class')
            }else{
                alert('The was a problem updating the class requested.')
            }

        }catch(error){
            console.log("Error updating the class requested:", error)
        }
        history("/classes")
        }else{
            return  
        }
    }

    const isInputValid = ()=>{
        if (name == ''){
            showAlert('Class name');
            return false;
        }
        if(duration== ''){
            showAlert('Duration')
            return false;
        }
        if(capacity==''){
            showAlert('Capacity');
            return false;
        }
        if(description==''){
            showAlert('Description');
            return false;
        }
        else{
            return true
        }
    }

    const showAlert = (inputValue) =>{
        alert(`${inputValue} is required`)
    }

    return (
        <form className='update-class'>

            <label>Class Name:</label>
            <input 
                type="text" 
                required 
                value={name} 
                onChange={e=> setName(e.target.value)} />
            <label className='small-label'>Duration in minutes:</label>
            <input 
                type="text" 
                value={duration}
                required
                className='small-input'
                onChange={e=> setDuration(e.target.value)} />
            <label className='small-label'>Capacity:</label>
            <input 
                type="int" 
                value={capacity} 
                required
                className='small-input'
                onChange={e=> setCapacity(e.target.value)} />
            <label>Description:</label>
            <input 
                type="textarea" 
                value={description} 
                required
                onChange={e=> setDescription(e.target.value)} />
            <button
                onClick={e=>{
                    e.preventDefault();
                    editClass();
                }}
            >Update Class</button>
        </form>
    )


}

export default UpdateClassPage;