import {Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button} from "@mui/material";

function UserDialog({open, onClose, onSave, user, setUser, isEditing}) {
    return (
         <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>{isEditing ? "Edit User" : "Add New User"}</DialogTitle>
                <DialogContent sx={{display: "flex", flexDirection: "column", gap: 2, mt: 1}}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                    />
                    <TextField 
                        margin="dense"
                        label="Email"
                        fullWidth
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                    <TextField 
                        margin="dense"
                        label="Phone"
                        fullWidth
                        value={user.phone || ""}
                        onChange={(e) => setUser({...user, phone: e.target.value})}
                    />
                    <TextField
                        margin="dense"
                        label="Company"
                        fullWidth
                        value ={user.company?.name || ""}
                        onChange={(e) => setUser({...user, company: {name: e.target.value}})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={onSave}>{isEditing ? "Save" : "Add"}</Button>
                </DialogActions>
            </Dialog>
    );
}

export default UserDialog;