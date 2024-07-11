<template>
    <div class="user-profile">
        <nav class="navbar">
            <router-link to="/" class="home-link">Home</router-link>
        </nav>
        <div v-if="user">
            <h2>{{ user.name }}</h2>
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Phone:</strong> {{ user.phone }}</p>
        </div>
        <div v-else>
            <p>Loading user information...</p>
        </div>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
  
export default {
    name: 'UserProfile',
  
    props: {
        userId: {
            type: Number,
            required: true
        }
    },
  
    setup(props) {
        const user = ref(null);
  
        onMounted(() => {
            fetchUser(props.userId);
        });

        const fetchUser = async (userId) => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user');
                }
                const userData = await response.json();
                user.value = userData;
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
  
        return { user };
    }
};
</script>
  
<style scoped>
.user-profile {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.user-profile h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
}

.user-profile p {
    font-size: 16px;
    margin-bottom: 8px;
}

.user-profile strong {
    font-weight: bold;
    margin-right: 5px;
    color: #007bff;
}

.user-profile .loading-message {
    margin-top: 10px;
    color: #777;
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
