import { useEffect, useState } from "react";
import { fetchUsers }  from "../services/api";
import { Container, Typography, Grid, Card, CardContent, CardActionArea, CircularProgress, Menu} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField }  from "@mui/material";
import { Button, Box } from "@mui/material";
import {Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";

function Home(){
    const [users, setUsers]=useState([]);
    const [loading, setLoading]=useState(true);
    const navigate=useNavigate();
    const [searchTerm, setSearchTerm]=useState("");
    const [newUser, setNewUser]=useState({name: "", email: ""});
    const [openAddDialog, setOpenAddDialog]=useState(false);

    const filteredUsers=users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenAdd=() => setOpenAddDialog(true);
    const handleCloseAdd=() => setOpenAddDialog(false);

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

                <Dialog open={openAddDialog} onClose={handleCloseAdd}>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name"
                            fullWidth
                            value={newUser.name}
                            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        />
                        <TextField 
                            margin="dense"
                            label="Email"
                            fullWidth
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        />
                        <TextField 
                            margin="dense"
                            label="Phone"
                            fullWidth
                            value={newUser.phone || ""}
                            onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                        />
                        <TextField
                            margin="dense"
                            label="Company"
                            fullWidth
                            value ={newUser.company?.name || ""}
                            onChange={(e) => setNewUser({...newUser, company: {name: e.target.value}})}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAdd}>Cancel</Button>
                        <Button variant="contained" onClick={() => {
                            if(!newUser.name || !newUser.email) {
                                alert("Name and Email are required");
                                return;
                            }
                            const userToAdd={
                                id: Date.now(),
                                name: newUser.name,
                                email: newUser.email,
                                phone: newUser.phone,
                                company: {name: newUser.company?.name || "Company Name"},
                            };
                            setUsers((prev) => [userToAdd, ...prev]);
                            setNewUser({name: "", email: "", phone: "", company: {name: ""}});
                            handleCloseAdd();
                        }}
                        > 
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

            <Button variant="contained" sx={{mb: 2}} onClick={handleOpenAdd}>
                Add User
            </Button>
            
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