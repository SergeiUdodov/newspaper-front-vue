<template>
  <div>
    <button type="button" class="btn btn-link" @click="showComments()">
      Комментарии ({{ comments.length }})
    </button>
    <div v-if="show">
      <div v-if="showLess && this.comments.length > 3">
        <div
          v-for="comment in comments.slice(0, 3)"
          :key="comment.id"
        >
          {{ comment.text }}
          <p>
            {{ comment.user.firstName }} {{ comment.user.lastName }}
            {{ comment.date }}
          </p>
          <button
            v-if="isAdmin"
            type="button"
            class="btn btn-link"
            @click="deleteComment(comment.id)"
          >
            Delete comment
          </button>
        </div>
      </div>
      <div v-else>
        <div v-for="comment in comments" :key="comment.id">
          {{ comment.text }}
          <p>
            {{ comment.user.firstName }} {{ comment.user.lastName }}
            {{ comment.date }}
          </p>
          <button
            v-if="isAdmin"
            type="button"
            class="btn btn-link"
            @click="deleteComment(comment.id)"
          >
            Delete comment
          </button>
        </div>
      </div>
      <button
        v-if="this.comments.length > 3"
        type="button"
        class="btn btn-link"
        @click="showLessMeth()"
      >
        {{ btnName }}
      </button>
      <CommentComponent v-if="token" :articleId="articleId" />
    </div>
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
      btnName: "Show more",
      show: false,
      isAdmin: false,
    };
  },
  methods: {
    showComments() {
      this.show = !this.show;
      this.showLess = true;
      this.btnName = "Show more";
    },
    showLessMeth() {
      this.showLess = !this.showLess;
      this.showLess == true
        ? (this.btnName = "Show more")
        : (this.btnName = "Show less");
    },
    async deleteComment(commentId) {
      if (confirm("Do you really want to delete this comment?")) {
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