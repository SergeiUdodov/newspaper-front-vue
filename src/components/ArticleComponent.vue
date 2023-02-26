
<template>
    <form @submit.prevent="addArticle">

        <ErrorComponent v-if="error" :error="error" />

        <h3>Add new article</h3>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:150px;" class="form-control" id="floatingInput"
                v-model="header" />
            <label for="floatingInput">Add header...</label>
        </div>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:400px;" class="form-control" id="floatingInput"
                v-model="content" />
            <label for="floatingInput">Add content...</label>
        </div>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:200px;" class="form-control" id="floatingInput"
                v-model="imageURL" />
            <label for="floatingInput">Add image url...</label>
        </div>

        <button class="btn btn-primary btn-block">Save</button>
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
            error: '',
            token: ''
        }
    },
    methods: {
        async addArticle() {

            if (localStorage.getItem('token')) {
                this.token = 'Bearer ' + localStorage.getItem('token');
            }
            else {
                this.token = ''
            }
            try {
                await axios.post('api/addArticle',
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

                this.$router.push('/')
                // window.location.replace('/');
                // document.location.reload()

            } catch (e) {
                this.error = 'Header more than 255 symbols'
            }
        }
    }
}

</script>