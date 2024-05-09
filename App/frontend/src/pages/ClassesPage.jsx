import {useState} from 'react';

function ClassesPage(){

    const [showAddClass, setShowAddClass] = useState(false);
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [capacity, setCapacity] = useState("");
    const [description, setDescription] = useState("");

    return(
        <section>
            <div>
                <h2>Manage classes offered</h2>


                <table className="classes-list">
                    <tr>
                        <th>Class Name</th>
                        <th>Duration in minutes</th>
                        <th>Capacity</th>
                        <th>Description</th>
                        <th>Edit Class</th>
                        <th>Delete Class</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>

            
            <form>
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