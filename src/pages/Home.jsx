import { useEffect, useState } from "react";
import { fetchUsers }  from "../services/api";
import { Container, Typography, Grid, Card, CardContent, CardActions, CardActionArea, CircularProgress} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField }  from "@mui/material";
import { Button, Box } from "@mui/material";
import {Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import {FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setUsers, addUser, updateUser, deleteUser } from "../store/userSlice";

function Home(){
    const dispatch=useDispatch();
    const users=useSelector((state) => state.users.list);
    const navigate=useNavigate();

    const [loading, setLoading]=useState(true);
    const [searchTerm, setSearchTerm]=useState("");
    const [newUser, setNewUser]=useState({name: "", email: "", phone: "", company: {name: ""}});
    const [openDialog, setOpenDialog]=useState(false);
    const [ sortBy, setSortBy]=useState("");
    const [editingUser, setEditingUser]=useState(null);

    useEffect(()=> {
        const loadUsers=async()=> {
            try{
                const data=await fetchUsers();
                dispatch(setUsers(data));
            } catch(error){
                console.error(error);
            } finally{
                setLoading(false);
            }
        };

        loadUsers();
    }, [dispatch]);

    const filteredUsers=users.filter( (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

   const sortedUsers=[...filteredUsers].sort((a, b) => {
        if(sortBy === "name") return a.name.localeCompare(b.name);
        if(sortBy === "email") return a.email.localeCompare(b.email);
        return 0;
    });

    const handleOpenDialog = (user=null) => {
        if(user) setEditingUser(user);
        else setEditingUser(null);
        setNewUser(user ? {...user, company: {name: user.company?.name || ""}} : {name: "", email: "", phone: "", company: {name: ""}});
        setOpenDialog(true);
    }
    const handleCloseDialog=() => setOpenDialog(false);

    const handleSaveUser= () =>{
        if(!newUser.name || !newUser.email) {
            alert("Name and Email are required");
            return;
        }
        const userData={
            ...newUser,
            company: {name: newUser.company?.name || "Company Name"},
            id: editingUser ? editingUser.id : Date.now(),
        };

        if(editingUser){
            dispatch(updateUser(userData));
        } else{
            dispatch(addUser(userData));
        }
        handleCloseDialog();
    };
     
      if(loading){
        return (
            <Container sx={{mt: 4}}>
                <CircularProgress/>
            </Container>
        );
    }

  
    return (
      <Box sx={{minHeight: "100vh", bgcolor: "#f4f6f8", p: 3}}>  
        <Container>
            <Typography variant="h4" gutterBottom>User Directory</Typography>

            <Box sx={{display: "flex", flexWrap: "wrap", gap: 2, mb: 2}}>
                <Button variant="contained" onClick={() => handleOpenDialog()}>Add User</Button>
                <TextField
                    label="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="email">Email</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={3}>
                {sortedUsers.map((user) => (
                    <Grid item xs={12} sm={6} md={3} key={user.id}>
                        <Card sx={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: 2, boxShadow: 2}}>
                            <CardActionArea onClick={() => navigate(`/user/${user.id}`)}>
                                <CardContent>
                                    <Typography variant="h6">{user.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {user.email}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {user.company.name || "Company Name"}
                                    </Typography>
                                </CardContent>       
                            </CardActionArea>
                            <CardActions sx={{justifyContent: "flex-end"}}>
                                <Button size="small" onClick={() => handleOpenDialog(user)}>Edit</Button>
                                <Button size="small" color="error" onClick={() => dispatch(deleteUser(user.id))}>Delete</Button>
                            </CardActions> 
                        </Card>
                    </Grid>        
                  ))}
            </Grid>

            {filteredUsers.length===0 && (
                <Typography variant="body1" sx={{mt: 2}}>
                    No users found.
                </Typography>
            )}

             <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
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
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button variant="contained" onClick={handleSaveUser}>{editingUser ? "Save" : "Add"}</Button>
                    </DialogActions>
                </Dialog>
      </Container> 
      </Box> 
    );
}

export default Home;