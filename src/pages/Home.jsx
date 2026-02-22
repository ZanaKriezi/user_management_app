import { useEffect, useState } from "react";
import { fetchUsers }  from "../services/api";
import {Container, Typography, Grid, Card, CardContent, CardActionArea, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";

function Home(){
    const [users, setUsers]=useState([]);
    const [loading, setLoading]=useState(true);
    const navigate=useNavigate();

    useEffect(()=> {
        const laodUsers=async()=> {
            try{
                const data=await fetchUsers();
                setUsers(data);
            } catch(error){
                console.error(error);
            } finally{
                setLoading(false);
            }
        };

        laodUsers();
    }, []);

    if(loading){
        return (
            <Container sx={{mt: 4}}>
                <CircularProgress/>
            </Container>
        );
    }

    return (
        <Container sx={{mt: 4}}>
            <Typography variant="h4" gutterBottom>
                User Directory
            </Typography>

            <Grid container spacing={3}>
                {users.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                        <Card>
                            <CardActionArea onClick={() => navigate(`/user/${user.id}`)}>
                                <CardContent>
                                    <Typography variant="h6">{user.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {user.email}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {user.company.name}
                                    </Typography>
                                </CardContent>       
                            </CardActionArea>
                        </Card>
                    </Grid>        
                  ))}
            </Grid>
      </Container>  
    );
}

export default Home;