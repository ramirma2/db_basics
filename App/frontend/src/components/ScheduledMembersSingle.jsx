

function ScheduledMembersSingle({memberInfo}){
    return(
        <tr>

            <td>{memberInfo.member_id}</td>
            <td>{memberInfo.first_name}</td>
            <td>{memberInfo.last_name}</td> 

        </tr>
    )
}

export default ScheduledMembersSingle;