
<template>
    <form v-if="isAdmin" @submit.prevent="updateArticle">

        <ErrorComponent v-if="error" :error="error" />

        <h3>Редактировать статью</h3>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:150px;" class="form-control" id="floatingInput"
                v-model="header" />
            <label for="floatingInput">Заголовок:</label>
        </div>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:400px;" class="form-control" id="floatingInput"
                v-model="content" />
            <label for="floatingInput">Содержание:</label>
        </div>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:200px;" class="form-control" id="floatingInput"
                v-model="imageURL" />
            <label for="floatingInput">Ссылка на картинку:</label>
        </div>

        <h5>Выберите темы из существующих</h5>
        <div v-for="theme in existingThemes" :key="theme.id">
            <label><input type="checkbox" v-model="chosenThemes" :value="theme.name">#{{ theme.name }}</label>
        </div>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:120px;" class="form-control" id="floatingInput"
                v-model="newThemes" />
            <label for="floatingInput">Добавьте новые темы...</label>
        </div>

        <button class="btn btn-primary btn-block" style="margin: 15px">Сохранить</button>
        <router-link to="/" class="btn btn-primary btn-block" style="margin: 15px">Назад</router-link>
    </form>
</template>

<script>
import axios from 'axios';
import ErrorComponent from './ErrorComponent.vue';

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
            token: '',
            isAdmin: false,
            existingThemes: [],
            chosenThemes: [],
            newThemes: ''
        }
    },
    methods: {
        async updateArticle() {

            try {

                if (this.header.trim() === '' || this.content.trim() === '') {
                    window.scrollTo(0,0);
                    throw new Error('Заголовок и содержание не должны быть пустыми');
                }

                if (this.header.trim().length > 255) {
                    window.scrollTo(0,0);
                    throw new Error('Заголовок не должен быть длиннее 255 символов');
                }

                await axios.put('api/updateArticle/' + this.articleId,
                    {
                        header: this.header,
                        content: this.content,
                        imageURL: this.imageURL,
                        themes: this.chosenThemes.toString() + ',' + this.newThemes
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

        if (!this.isAdmin) {
            return;
        }

        if (localStorage.getItem('articleId')) {
            this.articleId = localStorage.getItem('articleId');

        }
        else {
            this.articleId = ''
        }

        await axios
            .get("api/themes", { headers: { Authorization: this.token } })
            .then((response) => {
                this.existingThemes = response.data;
            });

        await axios.get('api/articles').then((response) => {
            this.articles = response.data;
            for (let i in this.articles) {
                if (this.articles[i].id == this.articleId) {
                    this.header = this.articles[i].header;
                    this.content = this.articles[i].content;
                    this.imageURL = this.articles[i].imageURL;

                    for (let j in this.articles[i].themes) {
                        this.chosenThemes.push(this.articles[i].themes[j].name);
                    }
                    break;
                }
            }
        });
    }
}

</script>