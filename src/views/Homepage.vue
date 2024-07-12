<template>
  <div>
    <nav>
        <input type="text" v-model="searchQuery" placeholder="Search Posts...">
        <button @click="PerformSearch">Search</button>
        <!-- <input type="text" v-model="searchAuthorQuery" placeholder="Search Author...">
        <button @click="PerformAuthorSearch">Search</button> -->
        <button @click="PerformSort">Sort</button>
      </nav>
      <h2>Posts</h2>
      <ul class="post-list">
        <li v-for="post in displayPosts" :key="post.id" class="post-item">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>

          <div class="author-details">
            <button v-if="post.userId && !selectedAuthors[post.id]" @click="toggleDropdown(post.id)" class="select-author-btn">Select Author</button>
            <div v-if="activeDropdown === post.id" class="dropdown-menu">

              <div class="dropdown-item" v-for="author in getAuthors(post.userId)" :key="author.id">
                <p class="author-text">Author:<button @click="selectAuthor(post, author)" class="dropdown-item-btn">{{ author.name }}</button></p>
              </div>

              <router-link v-if="post.userId && selectedAuthors[post.id]" :to="{ name: 'UserProfile', params: { userId: post.userId } }" class="author-link">
                <button class="author-details-btn">Author details</button>
            </router-link>
            </div>
          </div>

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
    const sorted = ref(false);
    const searchQuery = ref('');
    const selectedAuthors = ref({});
    // const searchAuthorQuery = ref('');

    const displayPosts = computed(() => {
      if (sorted.value) {
        return [...posts.value].sort((a, b) => a.title.localeCompare(b.title));
      }
      return posts.value;
    });

    const getAuthors = (userId) => {
      const author = store.getters.getUserById(userId);
      return author ? [author] : [];
    };

    const selectAuthor = (post, author) => {
      selectedAuthors.value = { ...selectedAuthors.value, [post.id]: author };
    };

    const activeDropdown = ref(null);
    const toggleDropdown = (postId) => {
      activeDropdown.value = activeDropdown.value === postId ? null : postId;
    };

    const PerformSearch = () => {
      if (searchQuery.value.trim()) {
        router.push({ name: 'SearchPage', query: { q: searchQuery.value.trim() }})
      }
    };

    const PerformSort = () => {
      sorted.value = !sorted.value;
    };

    const getUser = (userId) => {
      return store.getters.getUserById(userId) || { name: 'Unknown' };
    };

    // const PerformAuthorSearch = () => {
    //   if (searchAuthorQuery.value.trim()) {
    //     // store.dispatch('searchPosts', { searchText: '', authorName: searchAuthorQuery.value.trim() });
    //     router.push({ name: 'SearchPage', query: { q: searchAuthorQuery.value.trim() } });
    //   }
    // };

    onMounted(() => {
      store.dispatch('fetchPosts');
      store.dispatch('fetchUsers');
    });

    return {
      posts,
      sorted,
      searchQuery,
      selectedAuthors,
      displayPosts,
      getAuthors,
      selectAuthor,
      activeDropdown,
      toggleDropdown,
      PerformSearch,
      PerformSort,
      getUser,
      // PerformAuthorSearch,
      // searchAuthorQuery
    };
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
  margin: 5px;
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

.author-details {
  margin-top: 10px;
}

.author-info {
  display: flex;
  align-items: center;
}

.author-link {
  margin-right: 10px;
}

.author-details-btn {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
}

.author-details-btn:hover {
  background-color: #0056b3;
}

.select-author-btn {
  margin-top: 5px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.select-author-btn:hover {
  background-color: #5a6268;
}

.dropdown-menu {
  margin-top: 5px;
}

.dropdown-item-btn {
  margin-top: 5px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #d6e8f9;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
}

.dropdown-item-btn:hover {
  background-color: #e9ecef;
}

.author-text {
  font-weight: normal;
  color: #69b820;
  margin-right: 5px;
  font-style: italic;
  text-decoration: underline;
  font-size: 18px;
}
</style>

