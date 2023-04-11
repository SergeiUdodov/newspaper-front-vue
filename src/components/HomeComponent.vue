<template>
  <div> 
        <div v-if="articles.length == 0">
          <h4>Нет статей доступных для отображения.</h4>
          <h4>Попробуйте изменить предпочтения по темам в настройках.</h4>
        </div>
        <div v-for="article in articles" :key="article.id">

          <div class="block">
            <input type="checkbox" :id="article.id" data-more-checker="read-more" />
            <div class="limiter">
                <img v-bind:src="article.imageURL" />
                <h5>{{ article.header }}</h5>
                <p>{{ article.content }}</p>
                <div class="bottom"></div>
            </div>
            <label :for="article.id" class="read-more-button"></label>
          </div>

          <div v-if="article.themes.length > 0" style="display: flex; align-items: flex-start; margin-left: 15px">
            <p class="theme" v-for="theme in article.themes" :key="theme.id">
              #{{ theme.name }}
            </p>
          </div>

          <button v-if="isAdmin" type="button" class="btn btn-link" @click="deleteArticle(article.id)">
            Удалить статью
          </button>

          <router-link to="/updateArticle" v-if="isAdmin" class="btn btn-link"
            @click="saveArticleId(article.id)">Редактировать статью</router-link>

          <div style="display: flex; align-items: flex-end; margin-bottom: 10px; margin-left: 10px">
            <div style="margin: 5px">Опубликовано {{ article.date.slice(0, 16) }}</div>
            
            <button type="button" class="btn btn-link" @click="showComments(article.id)">
              Комментарии({{ article.comments.length }})
            </button>

            <LikesComponent :articleId="article.id"/>
          </div>
          <div v-if="show[article.id]">
            <LoadComments :articleId="article.id"/>
          </div>
          <hr />
          <br />
        </div>
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
      show: []
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

    showComments(articleId) {
      this.show[articleId] = !this.show[articleId];
    }
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
