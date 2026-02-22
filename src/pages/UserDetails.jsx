import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUsers } from "../services/api.js";
import { Container, Typography, Card, CardContent, Box, CircularProgress} from "@mui/material";


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
          <Box sx={{ minHeight: "100vh", bgcolor:"#e0f7fa", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <CircularProgress />
          </Box>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor:"#e0f7fa", py: 6, fontFamily: "'Poppins', sans-serif"}}>
          <Container maxWidth="md">
            <Card sx={{ borderRadius: 3, boxShadow: 3, p: 3}}>
                <CardContent>
                  <Typography variant="h5" fontWeight={700} gutterBottom>{user.name}</Typography>
                  <Typography sx={{mt: 2}}><strong>Email:</strong> {user.email}</Typography>
                  <Typography><strong>Phone:</strong> {user.phone}</Typography>
                  <Typography><strong>Website:</strong> {user.website}</Typography>
                  <Typography sx={{mt: 2}}>
                    <strong>Address:</strong>{" "} {user.address?.street}, {user.address?.city}
                  </Typography>
                </CardContent>
            </Card>
           </Container> 
        </Box> 
    );

}

export default UserDetails;
