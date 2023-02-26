<template>
    <form @submit.prevent="handleSubmit">

        <ErrorComponent v-if="error" :error="error" />

        <h3>Login</h3>

        <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" v-model="email" placeholder="Email"/>
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Password"/>
        </div>

        <button class="btn btn-primary btn-block">Login</button>
    </form>
</template>

<script>
    import axios from 'axios'
    import ErrorComponent from './ErrorComponent.vue'
    export default {
        name: 'LoginComponent',

        components: {
            ErrorComponent
        },

        data() {
            return {
                email: '',
                password: '',
                error: ''
            }
        },
        methods: {
            async handleSubmit(){
                try{
                const response = await axios.post('authenticate', {
                    email: this.email,
                    password: this.password
                });

                console.log(response);
                localStorage.setItem('token', response.data.token);

                // this.$router.push('/');
                window.location.replace('/');
            } catch (e){
                this.error = 'Invalid email/password'
            }
            } 
        }
    }
</script>
