import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name: "users",
    initialState: { list: [] },
    reducers: {
        setUsers: (state, action) => { state.list=action.payload },
        addUser: (state, action) => { state.list.unshift(action.payload) },
        updateUser: (state, action) => {
            const index=state.list.findIndex(u => u.id === action.payload.id);
            if(index !== -1) state.list[index]=action.payload;
        },
        deleteUser: (state, action) => {
            state.list=state.list.filter(u => u.id !== action.payload);
        }
    }   
});

export const { setUsers, addUser, updateUser, deleteUser }=userSlice.actions;
export default userSlice.reducer;