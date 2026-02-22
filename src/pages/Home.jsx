import { useEffect, useState } from "react";
import { fetchUsers }  from "../services/api";
import { Container, Typography, Grid, Card, CardContent, CardActionArea, CircularProgress} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField }  from "@mui/material";

function Home(){
    const [users, setUsers]=useState([]);
    const [loading, setLoading]=useState(true);
    const navigate=useNavigate();
    const [searchTerm, setSearchTerm]=useState("");

const filteredUsers=users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
);

    useEffect(()=> {
        const loadUsers=async()=> {
            try{
                const data=await fetchUsers();
                setUsers(data);
            } catch(error){
                console.error(error);
            } finally{
                setLoading(false);
            }
        };

        loadUsers();
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

            <TextField 
                fullWidth
                label="Search by name or email"
                variant="outlined"
                sx={{mb: 3}}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Grid container spacing={3}>
                {filteredUsers.map((user) => (
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

            {filteredUsers.length===0 && (
                <Typography variant="body1" sx={{mt: 2}}>
                    No users found.
                </Typography>
            )}
      </Container>  
    );
}

export default Home;