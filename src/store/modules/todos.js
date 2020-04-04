import { db } from '@/main';
import Swal from 'sweetalert2';

const state = {
    todos: []
};

const getters = {
    allTodos: (state) => state.todos
};

const actions = {
    async fetchTodos({ commit }) {
        Swal.fire({
            title: "Please wait",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        });

        let todos = [];
        await db.collection('todos').get().then((querySnapshot) => {
            querySnapshot.forEach((todo) => {
                let todoData = {
                    id: todo.id,
                    title: todo.data().title,
                    completed: todo.data().completed
                };
                todos.push(todoData);
            });
        });

        Swal.close();

        commit('setTodos', todos);
    },
    async addTodo({ commit }, title) {
        Swal.fire({
            title: "Please wait",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        });

        let todo = {
            title: title,
            completed: false
        };

        const response = await db.collection('todos').add(todo);

        todo.id = response.id;

        Swal.close();

        commit('newTodo', todo);
    },
    async deleteTodo({ commit }, id) {
        Swal.fire({
            title: "Please wait",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        });

        await db.collection('todos').doc(id).delete();

        Swal.close();

        commit('removeTodo', id);
    },
    async filterTodos({ commit }, e) {
        Swal.fire({
            title: "Please wait",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        });

        //Get Selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);

        let todos = [];
        await db.collection('todos').limit(limit).get().then((querySnapshot) => {
            querySnapshot.forEach((todo) => {
                let todoData = {
                    id: todo.id,
                    title: todo.data().title,
                    completed: todo.data().completed
                };
                todos.push(todoData);
            });
        });

        Swal.close();

        commit('setTodos', todos);
    },
    async updateTodo({ commit }, updTodo) {
        Swal.fire({
            title: "Please wait",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        });

        await db.collection('todos').doc(updTodo.id).update({
            completed: updTodo.completed
        });

        Swal.close();

        commit('updateTodo', updTodo);
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => (state.todos.unshift(todo)),
    removeTodo: (state, id) => (state.todos = state.todos.filter(todo => todo.id !== id)),
    updateTodo: (state, updTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updTodo.id);
        if (index !== -1) {
            state.todos.splice(index, 1, updTodo);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};