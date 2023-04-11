<template>
  <div id="app"> 
    
    <NavComponent />

    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view />
      </div>
    </div>

  </div>
</template>

<script>
  import NavComponent from './components/NavComponent.vue'

export default {
  name: 'App',
  components: {
    NavComponent
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');

  * {
    box-sizing: border-box;
  }

  body {
    background: #b39a842f !important;
    min-height: 100vh;
    display: flex;
    font-weight: 400;
    font-family: 'Fira Sans', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, label, span {
    font-weight: 500;
    font-family: 'Fira Sans', sans-serif;
  }

  body, html, #app, #root, .auth-wrapper {
    width: 100%;
    height: auto;
  }

  #app {
    text-align: center;
  }

  .navbar-light {
    background-color: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  }

  .auth-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    margin: auto;
    padding: 100px;
    
  }

  .auth-inner {
    width: 50%;
    height: 100%;
    margin: auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 20px 30px 25px 30px;
    border-radius: 15px;
    transition: all .3s;
  }

  img {  
        display: flex;
        max-width: 200px;  
        height: 160px;  
        float: left;
        margin-right: 20px;
        margin-bottom: 10px;
        }

  .form-group{
    padding: 15px;
  }

  button{
    margin: 0px;
    padding: 0px;
  }

  .auth-wrapper .form-control:focus {
    box-shadow: none;
  }

  .auth-wrapper h3 {
    text-align: center;
    line-height: 1;
    /* padding: 20px; */
  }

  .custom-control-label {
    font-weight: 400;
  }

  .theme {
    font-style: italic;
    font-weight: bold;
  }

.block {margin: 1rem;}
 
/* Показать больше/показать меньше */
.limiter {
  max-height: 240px;
  overflow: hidden;
  position: relative;
}
.limiter .bottom {
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgb(255 217 29 / 0%),
    rgb(255 255 255)85%);
  width: 100%;
  height: 60px;
  opacity: 1;
  transition: 0.3s;
}
 
[data-more-checker^="read-more"] {
  opacity: 0;
  position: absolute;
}
[data-more-checker^="read-more"]:checked ~ .limiter {
  max-height: none;
}
[data-more-checker^="read-more"]:checked ~ .limiter .bottom {
  opacity: 0;
  transition: 0.3s;
}
[data-more-checker^="read-more"] ~ .read-more-button:before  {
  content: "Показать больше »";
}
[data-more-checker^="read-more"]:checked ~ .read-more-button:before {
  content: "Показать меньше «";
}
 
.read-more-button {
  cursor: pointer;
  display: inline-block;
  color: #777;
  text-decoration: underline;
}

</style>
