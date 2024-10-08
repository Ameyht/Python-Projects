import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userStore = (set, get) => ({
  users: [],
  addUser: (user) => {
    set((state) => ({
      users: [
        ...state.users,
        {
          ...user,
        },
      ],
    }));
  },
  removeUser: (id) => {
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    }));
  },
  updateUser: (id, updatedData) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedData } : user
      ),
    }));
  },
  getUserById: (id) => {
    const users = get().users;

    return users.find((user) => user.id === id);
  },
});

const useUserStore = create(
  devtools(
    persist(userStore, {
      name: "users",
    })
  )
);

export default useUserStore;