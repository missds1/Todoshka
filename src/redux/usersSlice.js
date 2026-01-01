import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    return res.json();
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    deleteUser: (state, action) =>
      state.filter(user => user.id !== action.payload),

    editUser: (state, action) => {
      const updatedUser = action.payload;
      return state.map(user =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      );
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (_, action) => action.payload);
  }
});

export const { deleteUser, editUser } = usersSlice.actions;
export default usersSlice.reducer;
