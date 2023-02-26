<template>
    <div>
        {{ user.firstName }} {{ user.lastName }}
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UserComponent',
    data() {
        return {
            user: {},
            token: ''
        }
    },
    async created() {

        if(localStorage.getItem('token')){
              this.token = 'Bearer ' + localStorage.getItem('token');
            }
            else{
              this.token = ''
            }

        await axios.get('api/userByToken' , { headers: { Authorization: this.token }})
        .then((response) => {
            this.user = response.data;
        });
    }
}
</script>