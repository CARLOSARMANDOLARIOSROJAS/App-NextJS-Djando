import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./app/interface";

// Define the initial state using that type
interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};
// Async thunk to fetch users
export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetchUsers',
    async () => {

        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost:8000/api/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    }
);

// Create the user slice
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearUser: (state) => {
      state.users = [];
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("authState");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("orders");
      localStorage.removeItem("user");
    },
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex((user: User) => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user: User) => user.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            });
    }
})

export const { addUser, updateUser, deleteUser, clearUser } = userSlice.actions;
export default userSlice.reducer;