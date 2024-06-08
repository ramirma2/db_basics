import { useEffect, useState } from 'react';
import ClassesTable from '../components/classes/ClassesTable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdInstallMobile } from 'react-icons/md';


function ClassesPage({ classes, setClassToEdit, getClasses }) {

    const history = useNavigate();
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [capacity, setCapacity] = useState("");
    const [description, setDescription] = useState("");
   
    

    const onEdit = async classToEdit => {
        const my_class = await getClass(classToEdit.class_id)
        setClassToEdit(my_class);
        history("/update-class")
    }

    const onDelete = async classToDelete=>{
        const url = import.meta.env.VITE_API_URL + `classes/${classToDelete}`
        const response = await axios.delete(url)
        getClasses();
    }

    const getClass = async(class_id) =>{
        try{
            const url = import.meta.env.VITE_API_URL + `classes/${class_id}`
            const response = await axios.get(url);
            return response.data[0];
        }catch(error){
            console.log("Error getting the class requested:", error)
        }
    }



    const addClass = async () =>{
        if (isClassUnique(name)){

            const attributes= {name, duration, capacity, description}
            try{
                const url = import.meta.env.VITE_API_URL + 'classes';
                const response = await axios.post(url, attributes);
                if(response.status ==200){
                    resetInputs();
                    alert("New Class Added")
                }else{
                    alert("There was a problem adding your class")
                }
    
            }catch(error){
                console.log('Error adding a new class')
            }
            getClasses()

        }
        else{
            alert("There cannot be more than one class with the same name")
        }
    }

    const isClassUnique = (class_name) => {
        for(let one_class in classes){
            if(classes[one_class].name.toLowerCase() == class_name.toLowerCase()){
                return false;
            }
        }
        return true;
    }

    const resetInputs = () =>{
        setName('');
        setCapacity('');
        setDuration('');
        setDescription('');
    }


    return (
        <section>
            <div>
                <h2>Manage classes offered</h2>
                <ClassesTable classes={classes}
                    onEdit={onEdit}
                    onDelete={onDelete} />

            </div>

            <form className='new-class'>
                <label>Class Name:</label>
                <input type="text" value={name}
                    onChange={e => setName(e.target.value)} />
                <label>Duration in minutes:</label>
                <input type="text" value={duration}
                    onChange={e => setDuration(e.target.value)} />
                <label>Capacity:</label>
                <input type="text" value={capacity}
                    onChange={e => setCapacity(e.target.value)} />
                <label>Description:</label>
                <input type="textarea" value={description}
                    onChange={e => setDescription(e.target.value)} />
                <button
                    onClick={e => {
                        e.preventDefault();
                        addClass();
                    }}
                >Add New Class</button>
            </form>
        </section>
    )
}

export default ClassesPage