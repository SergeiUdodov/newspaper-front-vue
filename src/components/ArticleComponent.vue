
<template>
    <form v-if="isAdmin" @submit.prevent="addArticle">

        <ErrorComponent v-if="error" :error="error" />

        <h3>Создать новую статью</h3>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:150px;" class="form-control" id="floatingInput"
                v-model="header" />
            <label for="floatingInput">Добавьте заголовок...</label>
        </div>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:400px;" class="form-control" id="floatingInput"
                v-model="content" />
            <label for="floatingInput">Добавьте содержание...</label>
        </div>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:120px;" class="form-control" id="floatingInput"
                v-model="imageURL" />
            <label for="floatingInput">Добавьте ссылку на картинку...</label>
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
import axios from 'axios'
import ErrorComponent from './ErrorComponent.vue'

export default {
    name: 'ArticleComponent',
    components: {
        ErrorComponent
    },
    data() {
        return {
            header: '',
            content: '',
            imageURL: '',
            newThemes: '',
            error: '',
            token: '',
            isAdmin: false,
            existingThemes: [],
            chosenThemes: []
        }
    },
    methods: {
        async addArticle() {
            try {
                if (this.header.trim() === '' || this.content.trim() === '') {
                    window.scrollTo(0,0);
                    throw new Error('Заголовок и содержание не должны быть пустыми');
                }

                if (this.header.trim().length > 255) {
                    window.scrollTo(0,0);
                    throw new Error('Заголовок не должен быть длиннее 255 символов');
                }

                await axios.post('api/addArticle',
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

        await axios
            .get("api/themes", { headers: { Authorization: this.token } })
            .then((response) => {
                this.existingThemes = response.data;
            });
    }
}

</script>