import {useParams} from "react-router-dom";
function UserDetails(){
    const {id}=useParams();

    return <div>User Details for user {id}</div>;
}

export default UserDetails;