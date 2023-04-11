<template>
  <div>
      <div v-if="showLess && this.comments.length > 3">
        <div v-for="comment in comments.slice(0, 3)" :key="comment.id">
          <div style="margin-bottom: 15px; margin-left: 15px">
            <div style="word-break:normal">{{ comment.text }}</div>
            <div style="font-style: italic; font-weight: bold">
             {{ comment.user.firstName }} {{ comment.user.lastName }}
             {{ comment.date.slice(0, 16) }}
            </div>
          <button v-if="isAdmin" type="button" class="btn btn-link" @click="deleteComment(comment.id)">
            Удалить комментарий
          </button>
        </div>
        </div>
      </div>
      <div v-else>
        <div v-for="comment in comments" :key="comment.id">
          <div style="margin-bottom: 15px; margin-left: 15px">
            <div style="word-break:normal">{{ comment.text }}</div>
            <div style="font-style: italic; font-weight: bold">
             {{ comment.user.firstName }} {{ comment.user.lastName }}
              {{ comment.date.slice(0, 16) }}
            </div>
          <button v-if="isAdmin" type="button" class="btn btn-link" @click="deleteComment(comment.id)">
            Удалить комментарий
          </button>
        </div>
        </div>
      </div>
      <button v-if="this.comments.length > 3" type="button" class="btn btn-link" style="margin-bottom: 15px" 
        @click="showLessMeth()">
        {{ btnName }}
      </button>
      <CommentComponent v-if="token" :articleId="articleId" />
  </div>
</template>

<script>
import axios from "axios";
import CommentComponent from "./CommentComponent.vue";

export default {
  name: "LoadComments",
  props: ["articleId"],
  components: {
    CommentComponent,
  },
  data() {
    return {
      comments: [],
      token: "",
      showLess: true,
      btnName: "Еще комментарии",
      isAdmin: false
    };
  },
  methods: {
    showLessMeth() {
      this.showLess = !this.showLess;
      this.showLess == true
        ? (this.btnName = "Еще комментарии")
        : (this.btnName = "Свернуть");
    },
    async deleteComment(commentId) {
      if (confirm("Вы действительно хотите удалить этот комментарий?")) {
        await axios.delete("api/deleteComment/" + commentId, {
          headers: {
            Authorization: this.token,
          },
        });
        // window.location.replace('/');
        document.location.reload();
      }
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

    await axios.get("api/comments/" + this.articleId).then((response) => {
      this.comments = response.data;
    });
  },
};
</script>