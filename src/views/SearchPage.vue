<template>
  <nav class="navbar">
            <router-link to="/" class="home-link">Home</router-link>
        </nav>
    <div>
        <h2 class="page-title">Search Results for "{{  $route.query.q }}"</h2>
        <ul class="search-results">
            <li v-for="post in filteredPosts" :key="post.id" class="search-item">
                <router-link :to="{ name: 'PostDetails', params: { id: post.id } }" class="post-link">{{ post.title }}</router-link>
                <p class="post-body">{{ post.body }}</p>
                <p v-if="post.user" class="author-name">Author: {{ post.user.name }}</p>
            </li>
            <li v-if="filteredPosts.length === 0" class="no-results">No results found.</li>
        </ul>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'SearchPage',
  
    setup() {
      const store = useStore();
      const route = useRoute();
  
      const query = computed(() => route.query.q);
  
      const allPosts = computed(() => store.getters.getAllPosts);
      const allUsers = computed(() => store.getters.getAllUsers);
  
      const filteredPosts = computed(() => {
        if (!query.value) {
          return [];
        }
  
        const searchQuery = query.value.trim().toLowerCase();


      //   return allPosts.value.filter(post =>
      //     post.title.toLowerCase().includes(searchQuery)
      // )

      const postsWithAuthors = allPosts.value.map(post => {
        const user = allUsers.value.find(user => user.id === post.userId);
        return { ...post, user };
      });

      // Filter by title or author name
      return postsWithAuthors.filter(post =>
        post.title.toLowerCase().includes(searchQuery) ||
        (post.user && post.user.name.toLowerCase().includes(searchQuery))
      );
      });
  
      return { filteredPosts };
    }
  }
  </script>
  
  <style scoped>
  
  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .search-results {
    list-style-type: none;
    padding: 0;
  }
  
  .search-item {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .search-item .post-link {
    font-size: 18px;
    color: #007bff;
    text-decoration: none;
  }
  
  .search-item .post-link:hover {
    text-decoration: underline;
  }
  
  .search-item .post-body {
    font-size: 16px;
    line-height: 1.6;
  }
  
  .no-results {
    font-style: italic;
    color: #888;
    margin-top: 10px;
  }

  .navbar {
    background-color: #f0f0f0;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.home-link {
    font-weight: bold;
    color: #333;
    text-decoration: none;
    margin-right: 10px;
}

.home-link:hover {
    text-decoration: underline;
    cursor: pointer;
}
  </style>
  