

function Checkbox ({info, checked,onCheckboxChange}) {

    return(
        <div className="class-checkbox" >
            <input type="checkbox" id={`custom-checkbox-${info.class_id}`} 
            name={info.name} value={info.class_id} 
            checked={checked}
            onChange={ ()=>onCheckboxChange(info.class_id)}/>
            <label htmlFor={`custom-checkbox-${info.class_id}`}> {info.name} </label><br></br>
        </div>
    )
}


export default Checkbox;