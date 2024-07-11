<template>
    <div>
      <nav>
        <input type="text" v-model="searchQuery" placeholder="Search Posts...">
        <button @click="PerformSearch">Search</button>
      </nav>
      <h2>Posts</h2>
      <ul class="post-list">
        <li v-for="post in posts" :key="post.id" class="post-item">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
          <p class="author">
            Author: 
            <router-link :to="{ name: 'UserProfile', params: { userId: post.userId } }" class="author-link">
              {{ getUser(post.userId).name }}
            </router-link>
          </p>
          <router-link :to="{ name: 'PostDetails', params: { id: post.id } }" class="read-more">Read More</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { computed, onMounted, ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Home',
  
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const posts = computed(() => store.getters.getAllPosts);
  
      const getUser = (userId) => {
        return store.getters.getUserById(userId) || { name: 'Unknown' };
      };
  
      const searchQuery = ref('');
  
      const PerformSearch = () => {
        if (searchQuery.value.trim()) {
          router.push({ name: 'SearchPage', query: { q: searchQuery.value.trim() }})
        }
      };
  
      onMounted(() => {
        store.dispatch('fetchPosts');
        store.dispatch('fetchUsers');
      });
  
      return { posts, getUser, searchQuery, PerformSearch };
    }
  }
  </script>
  
  <style scoped>
  
  .nav {
    margin-bottom: 20px;
  }
  
  input[type="text"] {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }
  
  .post-list {
    list-style-type: none;
    padding: 0;
  }
  
  .post-item {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .post-item h3 {
    font-size: 20px;
    margin-bottom: 8px;
  }
  
  .post-item p {
    font-size: 16px;
    line-height: 1.6;
  }
  
  .author {
    font-style: italic;
    margin-top: 8px;
  }
  
  .author-link {
    color: #007bff;
    text-decoration: none;
  }
  
  .author-link:hover {
    text-decoration: underline;
  }
  
  .read-more {
    display: inline-block;
    margin-top: 8px;
    color: #28a745;
    text-decoration: none;
  }
  
  .read-more:hover {
    text-decoration: underline;
  }
  </style>
  