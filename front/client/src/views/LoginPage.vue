<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>

<script>

import LoginForm from "../components/LoginForm.vue"

export default ({
  name: 'LoginPage',

  components: {
    LoginForm,
  },
});
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center; 
  align-items: center;     
  height: 100vh;           
  background-color: #f5f5f5; 
  padding: 0;              
  margin: 0;              
}
</style>
