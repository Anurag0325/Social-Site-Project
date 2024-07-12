<template>
    <div class="post-details">
        <router-link to="/" class="home-link">Home</router-link>
        <h2>Post Details</h2>
        <div v-if="post">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
            <div class="author-info">
                <h4>Author:</h4>
                <p class="author-name">
                <router-link :to="{ name: 'UserProfile', params: { userId: post.userId } }" class="author-link">
                    {{ getUser(post.userId).name }}
              </router-link></p>
            </div>
            <h4>Comments:</h4>
            <ul class="comments-list">
                <li v-for="comment in comments" :key="comment.id" class="comment-item">
                    <div class="comment-header">
                        <strong>{{ comment.name }}</strong>
                        <p>Email: {{ comment.email }}</p>
                    </div>
                    <p class="comment-body">{{ comment.body }}</p>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
    name: 'PostDetails',

    setup() {
        const store = useStore();
        const route = useRoute();

        const postId = computed(() => Number(route.params.id));

        const post = computed(() => store.getters.getPostById(postId.value));
        const comments = computed(() => store.getters.getCommentsByPostId(postId.value));

        const getUser = (userId) => {
            return store.getters.getUserById(userId) || { name: 'Unknown' };
        };

        onMounted(() => {
            store.dispatch('fetchPosts');
            store.dispatch('fetchUsers');
            store.dispatch('fetchComments', postId.value);
        });

        return { post, comments, getUser };
    }
}
</script>

<style scoped>
.post-details {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.post-details h2 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #333;
}

.post-details h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #555;
}

.post-details h4 {
    font-size: 18px;
    margin-bottom: 5px;
    color: #777;
}

.post-details p {
    line-height: 1.6;
    color: #666;
}

.author-info {
    margin-top: 15px;
}

.author-info .author-name {
    font-weight: bold;
    color: #007bff;
}

.comments-list {
    list-style-type: none;
    padding: 0;
    margin-top: 15px;
}

.comment-item {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
}

.comment-item .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.comment-item .comment-header strong {
    font-size: 16px;
    color: #333;
}

.comment-item .comment-header p {
    color: #777;
}

.comment-item .comment-body {
    font-size: 16px;
    margin-top: 5px;
    color: #444;
}

.post-details > div {
    text-align: center;
    color: #777;
}

.home-link {
    margin-bottom: 10px;
    display: inline-block;
    color: #007bff;
    text-decoration: none;
    font-size: 16px;
}

.home-link:hover {
    text-decoration: underline;
}
</style>

