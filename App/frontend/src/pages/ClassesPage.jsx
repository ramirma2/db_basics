import {useState} from 'react';
import ClassesTable from '../components/ClassesTable';


function ClassesPage(){

   
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [capacity, setCapacity] = useState("");
    const [description, setDescription] = useState("");

    return(
        <section>
            <div>
                <h2>Manage classes offered</h2>
                <ClassesTable/>

            </div>
           
            <form className='new-class'>
                <label>Class Name:</label>
                <input type="text" value={name} 
                onChange={e=> setName(e.target.value)} />
                <label>Duration in minutes:</label>
                <input type="text" value={duration} 
                onChange={e=> setDuration(e.target.value)} />
                <label>Capacity:</label>
                <input type="text" value={capacity} 
                onChange={e=> setCapacity(e.target.value)} />
                <label>Description:</label>
                <input type="textarea" value={description} 
                onChange={e=> setDescription(e.target.value)} />
                <button
                    onClick={e=>{
                        e.preventDefault();
                    }}
                >Add New Class</button>
            </form>
        </section>
    )
}

export default ClassesPage