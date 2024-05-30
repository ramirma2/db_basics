import {useState} from 'react';


function UpdateInstructorPage({classes, instructorToEdit}){
    const [firstName, setFirstName]=useState(instructorToEdit.first_name);
    const [lastName, setLastName]=useState(instructorToEdit.last_name);
    const [email, setEmail]=useState(instructorToEdit.email);
    const [phoneNumber, setPhoneNumber]=useState(instructorToEdit.phone_number);
    const [preferredName, setPreferredName] = useState(instructorToEdit.preferred_name);
    const [checkedState, setCheckedState] = useState(
        new Array(classes.length).fill(false)
    );

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, i)=>
        i === position ? !item :item
        );
        setCheckedState(updatedCheckedState);
    }

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
                            <div className="class-checkbox" key={index}>
                                <input type="checkbox" id={`custom-checkbox-${index}`} 
                                name={one_class.name} value={one_class.class_id} 
                                checked={checkedState[index]}
                                onChange={ ()=> handleOnChange(index)}/>
                                <label htmlFor={`custom-checkbox-${index}`}> {one_class.name} </label><br></br>
                            </div>

                        )
                    })
                }
            </fieldset>
        <button
            onClick={e=>{
                e.preventDefault();
            }}
        >Update Instructor</button>
    </form>
    )
}

export default UpdateInstructorPage;