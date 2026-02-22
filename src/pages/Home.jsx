import { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import { Typography, Box, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setUsers, addUser, updateUser } from "../store/userSlice";
import UserCard from "../components/UserCard";
import UserDialog from "../components/UserDialog";
import UserToolbar from "../components/UserToolbar";

function Home(){
    const dispatch=useDispatch();
    const users=useSelector((state) => state.users.list);
    
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
        setEditingUser(user);
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
            <Box sx={{minHeight:"100vh", bgcolor:"#e0f7fa", display: "flex", justifyContent:"center", alignItems:"center"}}>
              <CircularProgress />
            </Box>
        );
    }

  
    return (  
      <Box sx={{minHeight: "100vh", width: "100%", bgcolor: "#e0f7fa", py: 6, px: 4, boxSizing:"border-box"}}>  
            <Typography variant="h4" sx={{ fontWeight: 700, textAlign: "center", mb: 5, color: "#1e293b", fontFamily: "'Poppins', sans-serif"}}>User Management</Typography>
        
        <Box sx={{ px: 5}}>
           <UserToolbar
                onAddUser={() => handleOpenDialog()}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

           <Box sx={{ display: "grid", gridTemplateColumns:{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr"}, gap: 3}}>
                {sortedUsers.map((user) => (
                    <UserCard key={user.id} user={user} onEdit={handleOpenDialog}/>
                ))}
            </Box>

            {filteredUsers.length===0 && (
                <Typography sx={{ mt: 4, textAlign: "center"}}>
                    No users found.
                </Typography>
            )}
            </Box>

            <UserDialog
            open={openDialog}
            onClose={handleCloseDialog}
            onSave={handleSaveUser}
            user={newUser}
            setUser={setNewUser}
            isEditing={!!editingUser}
            />
        </Box>           
    );
}

export default Home;