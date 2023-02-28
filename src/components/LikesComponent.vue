<template>
  <button @click="likeArticle(this.articleId)" class="btn btn-link">
    <i :class="this.class"></i> ({{ this.length }})
  </button>
</template>

<script>
import axios from "axios";

export default {
  name: "LikesComponent",
  props: ["articleId"],
  data() {
    return {
      articles: [],
      article: {},
      user: {},
      token: "",
      class: "far fa-heart",
      length: "",
    };
  },
  methods: {
    async likeArticle(articleId) {

      if (localStorage.getItem("token")) {
        this.token = "Bearer " + localStorage.getItem("token");
      } else {
        this.token = "";
      }

      if (this.token === "") {
        return;
      }

      await axios.post("api/likeArticle/" + articleId, {}, {
        headers: {
          Authorization: this.token
        }
      });
      // window.location.replace('/');
      document.location.reload();

    }
  },
  async created() {
    if (localStorage.getItem("token")) {
      this.token = "Bearer " + localStorage.getItem("token");
    } else {
      this.token = "";
    }

    await axios.get('api/articles').then((response) => {
      this.articles = response.data;
      for (let i in this.articles) {
        if (this.articles[i].id == this.articleId) {
          this.article = this.articles[i];
          this.length = this.article.likes.length;
        }
      }
    });

    if (this.token === "") {
      this.class = "far fa-heart";
      return;
    }

    await axios
      .get("api/userByToken", { headers: { Authorization: this.token } })
      .then((response) => {
        this.user = response.data;
      });

    for (let i in this.article.likes) {
      if (this.article.likes[i].email === this.user.email) {
        this.class = "fas fa-heart";
      }
    }
  },
};
</script>