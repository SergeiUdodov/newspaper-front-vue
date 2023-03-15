<template>
  <div>
    <header>
      <div>
        <div v-for="article in articles" :key="article.id">
          <img v-bind:src="article.imageURL" />
          <h3>{{ article.header }}</h3>
          <p>{{ article.content }}</p>
          <div v-if="article.themes.length > 0" style="display: flex; align-items: flex-start">
            <p v-for="theme in article.themes" :key="theme.id">
              #{{ theme.name }}
            </p>
          </div>
          <p>Опубликовано {{ article.date.slice(0, 16) }}</p>

          <button v-if="isAdmin" type="button" class="btn btn-link" @click="deleteArticle(article.id)">
            Удалить статью
          </button>

          <router-link to="/updateArticle" v-if="isAdmin" class="btn btn-link"
            @click="saveArticleId(article.id)">Редактировать статью</router-link>

          <LoadComments :articleId="article.id" />

          <LikesComponent :articleId="article.id" />

          <hr />
          <br />
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import axios from "axios";
import LoadComments from "./LoadComments.vue";
import LikesComponent from "./LikesComponent.vue";

export default {
  name: "HomeComponent",
  components: {
    LoadComments,
    LikesComponent,
  },
  data() {
    return {
      articles: [],
      token: "",
      isAdmin: false,
      user: {},
      preferThemes: [],
      forbidThemes: [],
    };
  },
  methods: {
    async deleteArticle(articleId) {
      if (confirm("Вы действительно хотите удалить эту статью?")) {
        await axios.delete("api/deleteArticle/" + articleId, {
          headers: {
            Authorization: this.token,
          },
        });
        // window.location.replace('/');
        document.location.reload();
      }
    },
    saveArticleId(articleId) {
      localStorage.setItem("articleId", articleId);
    },
  },
  async created() {
    if (localStorage.getItem("token")) {
      this.token = "Bearer " + localStorage.getItem("token");

      await axios
        .get("api/isUserAdmin", { headers: { Authorization: this.token } })
        .then((response) => {
          this.isAdmin = response.data;
        });
    } else {
      this.token = "";
      this.isAdmin = false;
    }

    await axios
      .get("api/articles", { headers: { Authorization: this.token } })
      .then((response) => {
        this.articles = response.data;
      });
  },
};
</script>
