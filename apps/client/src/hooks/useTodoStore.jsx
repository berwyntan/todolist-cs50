import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useTodoStore = create(devtools((set) => ({
    authDetails: {},
    setAuthDetails: (data) => set({ authDetails: data}),
    todos: [],
    setTodos: (data) => set({ todos: data}),
    doneTodos: [],
    setDoneTodos: (data) => set({ doneTodos: data}),
})))

export default useTodoStore