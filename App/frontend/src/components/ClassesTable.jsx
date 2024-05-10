import ClassSingle from '../components/ClassSingle';


function ClassesTable(){

    const myClasses=[
        {class_id:1, name:'Strenght 1', duration: '50 mins', capacity:15, description:'Good for beginners. This class offers a safe way to build strength and learn the foundations of our strength program in a low-medium impact workout that will leave you feeling stronger physically and mentally.'},
        {class_id:2, name:'Strenght', duration: '50 mins', capacity:15, description:'Build your strength through a series of weight-bearing exercises followed by movement sequences to improve mobility and flexibility. We end with a high-impact cardio burst.'},
        {class_id:3, name:'Strenght Advanced', duration: '75 mins', capacity:15, description:'Test your limits in this advanced version of our signature strength class.'},
        {class_id:4, name:'Recovery', duration: '50 mins', capacity:15, description:'Restore and rebalance your body with the use of a foam roller and active stretching to help recover your muscles.'}
    ]

    return(
        <table className="classes-list">
        <thead>
        <tr>
            <th>Class Name</th>
            <th>Duration in minutes</th>
            <th>Capacity</th>
            <th>Description</th>
            <th>Edit Class</th>
            <th>Delete Class</th>
        </tr>
       </thead>
       <tbody>
            {myClasses.map((class_info, i)=><ClassSingle class_info={class_info}
                key={i}
                />)}
       </tbody>
        </table>
    )

}

export default ClassesTable;