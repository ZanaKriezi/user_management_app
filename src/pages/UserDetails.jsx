import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUsers } from "../services/api.js";
import { Container, Typography, Card, CardContent} from "@mui/material";


function UserDetails(){
    const {id}=useParams();
    const [user, setUser]=useState(null);

    useEffect(() => {
        const loadUser=async() => {
            const users=await fetchUsers();
            const selectedUser=users.find((u) => u.id === Number(id));
            setUser(selectedUser);
        };

        loadUser();
    }, [id]);

    if(!user) {
        return (
            <Container sx={{mt: 4}}>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{mt: 4}}>
            <Card>
                <CardContent>
                  <Typography variant="h5">{user.name}</Typography>
                  <Typography>Email: {user.email}</Typography>
                  <Typography>Phone: {user.phone}</Typography>
                  <Typography>Website: {user.website}</Typography>
                  <Typography sx={{mt:2}}>
                    Address: {user.address.street}, {user.address.city}
                  </Typography>
                </CardContent>
            </Card>
        </Container>  
    );

}
export default UserDetails;
