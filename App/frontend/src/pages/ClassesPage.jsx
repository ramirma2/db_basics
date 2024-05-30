import { useEffect, useState } from 'react';
import ClassesTable from '../components/classes/ClassesTable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ClassesPage({ setClassToEdit }) {

    const history = useNavigate();
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [capacity, setCapacity] = useState("");
    const [description, setDescription] = useState("");
    const [myClasses, setMyClasses] = useState([]);
    

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

    const getClasses = async () => {
        try {
            const url = import.meta.env.VITE_API_URL + 'classes';
            const response = await axios.get(url);
            setMyClasses(response.data);
        } catch (error) {
            console.error('Error getting the classes data:', error);
        }
    }

    const addClass = async () =>{
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

    const resetInputs = () =>{
        setName('');
        setCapacity('');
        setDuration('');
        setDescription('');
    }

    useEffect(() => {
        getClasses();
    }, [])

    return (
        <section>
            <div>
                <h2>Manage classes offered</h2>
                <ClassesTable classes={myClasses}
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