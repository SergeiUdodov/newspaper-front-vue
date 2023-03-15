
<template>
    <form @submit.prevent="addComment">

        <ErrorComponent v-if="error" :error="error" />

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:150px;" class="form-control" id="floatingInput" v-model="text"/>
            <label for="floatingInput">Add comment...</label>
        </div>

        <button class="btn btn-primary btn-block">Send</button>
    </form>

</template>

<script>
import axios from 'axios'
import ErrorComponent from './ErrorComponent.vue'

    export default {
        name: 'CommentComponent',
        components: {
            ErrorComponent
        },
        props: ['articleId'],
        data(){
            return {
                text: '',
                error: '',
                token: ''
            }
        },

        methods:{
            async addComment(){

            if(this.text.trim() === ''){
                return;
            }

            if(localStorage.getItem('token')){
              this.token = 'Bearer ' + localStorage.getItem('token');
            }
            else{
              this.token = ''
            }
                try{
                await axios.post('api/addComment/' + this.articleId, {text: this.text }, { headers: {
              Authorization: this.token     
            }
        });
                
                // this.$router.push('/')
                // window.location.replace('/');
                document.location.reload()

                } catch (e){
                    this.error = 'Your comment more than 1000 symbols'
                    // this.error = e.message
                }
            }
        }
    }

</script>