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

        setFilteredPosts(state, filteredPosts) {
            state.posts = filteredPosts;
        }
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



        searchPosts({ commit, state }, { searchText, authorName }) {
            let filteredPosts = state.posts;

            if (searchText) {
                filteredPosts = filteredPosts.filter(post =>
                    post.title.toLowerCase().includes(searchText.toLowerCase())
                );
            }

            if (authorName) {
                filteredPosts = filteredPosts.filter(post => {
                    const author = state.users.find(user =>
                        user.name.toLowerCase().includes(authorName)
                    );
                    return author && post.userId === author.id;
                });
            }

            commit('setFilteredPosts', filteredPosts);
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
