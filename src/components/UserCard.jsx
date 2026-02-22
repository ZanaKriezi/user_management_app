import { Card, CardContent, CardActions, CardActionArea, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

function UserCard({ user, onEdit}) {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    return (
        <Card  sx={{height: 210, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: 3, boxShadow: 3, bgcolor: "#ffffff", width: "100%"}}>
            <CardActionArea onClick={() => navigate(`/user/${user.id}`)} sx={{ flexGrow: 1, alignItems:"flex-start", display: "flex", flexDirection: "column"}}>
                <CardContent sx={{width: "100%", boxSizing: "border-box"}}>
                    <Typography variant="h6" fontWeight={600} sx={{ lineHeight: 1.3, mb:1, wordBreak: "break-word", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient:"vertical", overflow:"hidden"}}>{user.name}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                       <strong>Email:</strong> {user.email}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Company:</strong>{" "}{user.company?.name || "Company Name"}
                    </Typography>
                </CardContent>       
            </CardActionArea>
            <CardActions sx={{justifyContent: "space-between", px: 2, pb: 1 }}>
                <Button size="small" onClick={() => onEdit(user)}>Edit</Button>
                <Button size="small" color="error" onClick={() => dispatch(deleteUser(user.id))}>Delete</Button>
            </CardActions> 
        </Card>  
    );
}
export default UserCard;