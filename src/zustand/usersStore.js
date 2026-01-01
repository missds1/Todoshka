import { create } from "zustand";

export const useUsersStore = create(set => ({
  users: [],

  fetchUsers: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    set({ users: data });
  },

  deleteUser: id =>
    set(state => ({
      users: state.users.filter(user => user.id !== id)
    })),

  editUser: (id, updatedUser) =>
    set(state => ({
      users: state.users.map(user =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    }))
}));
