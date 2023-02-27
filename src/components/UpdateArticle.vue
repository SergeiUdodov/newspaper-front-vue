
<template>
    <form @submit.prevent="updateArticle">

        <ErrorComponent v-if="error" :error="error" />

        <h3>Update article</h3>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:150px;" class="form-control" id="floatingInput"
                v-model="header" />
        </div>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:400px;" class="form-control" id="floatingInput"
                v-model="content" />
        </div>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:200px;" class="form-control" id="floatingInput"
                v-model="imageURL" />
        </div>

        <button class="btn btn-primary btn-block">Update</button>
        <router-link to="/" class="btn btn-primary btn-block">Back</router-link>
    </form>
</template>

<script>
import axios from 'axios'
import ErrorComponent from './ErrorComponent.vue'

export default {
    name: 'UpdateArticle',
    components: {
        ErrorComponent
    },
    data() {
        return {
            articles: [],
            articleId: '',
            header: '',
            content: '',
            imageURL: '',
            error: '',
            token: ''
        }
    },
    methods: {
        async updateArticle() {

            try {

                if (this.header.trim() === '' || this.content.trim() === '') {
                    throw new Error('Header and content must not be empty');
                }

                if (this.header.trim().length > 255) {
                    throw new Error('Header more than 255 symbols');
                }

                if (localStorage.getItem('token')) {
                    this.token = 'Bearer ' + localStorage.getItem('token');
                }
                else {
                    this.token = ''
                }

                await axios.put('api/updateArticle/' + this.articleId,
                    {
                        header: this.header,
                        content: this.content,
                        imageURL: this.imageURL
                    },
                    {
                        headers: {
                            Authorization: this.token
                        }
                    });

                localStorage.removeItem('articleId');

                this.$router.push('/')
                // window.location.replace('/');
                // document.location.reload()

            } catch (e) {
                this.error = e.message;
            }
        }
    },
    async created() {

        if (localStorage.getItem('articleId')) {
            this.articleId = localStorage.getItem('articleId');

        }
        else {
            this.articleId = ''
        }

        await axios.get('api/articles').then((response) => {
            this.articles = response.data;
            for (let i in this.articles) {
                if (this.articles[i].id == this.articleId) {
                    this.header = this.articles[i].header;
                    this.content = this.articles[i].content;
                    this.imageURL = this.articles[i].imageURL;
                }
            }
        });
    }
}

</script>