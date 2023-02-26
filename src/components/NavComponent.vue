<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div>

        <ul class="navbar-nav ml-auto" v-if="!token">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Sign up</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto" v-if="token">
          <li class="nav-item">
            <UserComponent class="nav-link" />
          </li>
          <li class="nav-item">
            <div class="nav-link"> | </div>
          </li>
          <li class="nav-item">
            <router-link to="/article" v-if="isAdmin" class="nav-link">Add article</router-link>
          </li>
          <li class="nav-item">
            <div v-if="isAdmin" class="nav-link"> | </div>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" @click="handleClick" class="nav-link">Logout</a>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import UserComponent from './UserComponent.vue'

export default {
  name: 'NavComponent',
  components: {
    UserComponent

  },
  data() {
    return {
      token: '',
      isAdmin: false
    }
  },
  methods: {
    handleClick() {
      localStorage.removeItem('token');
      // this.$router.push('/');
      window.location.replace('/');
    }
  },
  async created() {
    if (localStorage.getItem('token')) {
      this.token = 'Bearer ' + localStorage.getItem('token');

      await axios.get('api/isUserAdmin', { headers: { Authorization: this.token } })
        .then((response) => {
          this.isAdmin = response.data;
        });
    }
    else {
      this.token = '';
      this.isAdmin = false;
    }
  }
}
</script>
