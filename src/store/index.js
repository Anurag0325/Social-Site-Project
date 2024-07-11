import { createStore } from 'vuex';

const store = createStore({
    state: {
        posts: [],
        users: [],
        comments: [],
    },

    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },

        setUsers(state, users) {
            state.users = users;
        },

        setComments(state, comments) {
            state.comments = comments;
        },

        addComments(state, { postId, comments }) {
            state.comments = [
                ...state.comments,
                ...comments.filter(comment => comment.postId === postId)
            ];
        },
    },

    actions: {
        async fetchPosts({ commit }) {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const posts = await response.json();
            commit('setPosts', posts);
        },

        async fetchUsers({ commit }) {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const users = await response.json();
            commit('setUsers', users);
        },

        async fetchComments({ commit }, postId) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            const comments = await response.json();
            commit('addComments', { postId, comments });
        },

        async searchPosts({ commit, state }, searchText) {
            const filteredposts = state.posts.filter(post => {
                post.title.toLowerCase().includes(searchText.toLowerCase())
            });
            commit('setPosts', filteredposts);
        }
    },

    getters: {
        getPostById: (state) => (id) => {
            return state.posts.find(post => post.id === id);
        },

        getCommentsByPostId: (state) => (postId) => {
            return state.comments.filter(comment => comment.postId === postId);
        },

        getUserById: (state) => (userId) => {
            return state.users.find(user => user.id === userId);
        },

        getAllPosts: (state) => {
            return state.posts;
        },

        getAllUsers: (state) => {
            return state.users;
        }
    },
});

export default store;
