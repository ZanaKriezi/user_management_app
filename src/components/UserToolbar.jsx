import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function UserToolbar({ onAddUser, searchTerm, setSearchTerm, sortBy, setSortBy }) {

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4}}>
            <Button variant="contained" sx={{ px: 4, py:1.2, borderRadius: 2, textTransform: "none", fontWeight: 600}} onClick={() => onAddUser()}>Add User</Button>
            <Box sx={{ display: "flex", gap: 2,alignItems: "center"}}>
            <TextField
                size="small"
                label="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
        
            <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
                     <MenuItem value="">None</MenuItem>
                      <MenuItem value="name">Name</MenuItem>
                      <MenuItem value="email">Email</MenuItem>
                </Select>
            </FormControl>
            </Box>
        </Box>
    );
}

export default UserToolbar;