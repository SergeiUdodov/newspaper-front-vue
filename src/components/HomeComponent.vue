<template>
  <div>
    <header>
      <div>
        <div v-for="article in articles.slice().reverse()" :key="article.id">
          <img v-bind:src="article.imageURL">
          <h3>{{ article.header }}</h3>
          <p>{{ article.content }}</p>
          <p>Published {{ article.date }}</p>

          <button v-if="isAdmin" type="button" class="btn btn-link" @click="deleteArticle(article.id)">Delete
            article</button>

          <LoadComments :articleId="article.id" />

          <hr />
          <br />
        </div>
      </div>

    </header>
  </div>
</template>

<script>
import axios from 'axios';
import LoadComments from './LoadComments.vue'

export default {
  name: 'HomeComponent',
  components: {
    LoadComments

  },
  data() {
    return {
      articles: [],
      comments: false,
      token: '',
      isAdmin: false
    };
  },
  methods: {
    async deleteArticle(articleId) {
      if (confirm("Do you really want to delete this article?")) {
        await axios.delete('api/deleteArticle/' + articleId, {
          headers: {
            Authorization: this.token
          }
        });
        // window.location.replace('/');
        document.location.reload()
      }
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

    await axios.get('api/articles').then((response) => {
      this.articles = response.data;
    });
  }
}
</script>
