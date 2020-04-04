import { db } from '@/main';

const state = {
    todos: []
};

const getters = {
    allTodos: (state) => state.todos
};

const actions = {
    async fetchTodos({ commit }) {
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

        commit('setTodos', todos);
    },
    async addTodo({ commit }, title) {
        let todo = {
            title: title,
            completed: false
        };

        const response = await db.collection('todos').add(todo);

        todo.id = response.id;

        commit('newTodo', todo);
    },
    async deleteTodo({ commit }, id) {
        await db.collection('todos').doc(id).delete();

        commit('removeTodo', id);
    },
    async filterTodos({ commit }, e) {
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

        commit('setTodos', todos);
    },
    async updateTodo({ commit }, updTodo) {
        await db.collection('todos').doc(updTodo.id).update({
            completed: updTodo.completed
        });

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