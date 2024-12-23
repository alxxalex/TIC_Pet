<template>
  <div class="login-page">
    <SignupForm/>
  </div>
  
</template>

<script>

import SignupForm from "../components/SignupForm.vue"

export default {
  name: 'SignupPage',

  components: {
    SignupForm,
  },
 }
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
