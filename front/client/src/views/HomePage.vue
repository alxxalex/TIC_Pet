<template>
<div class="home-container">
  <NavBar/>
  <p>Homeee</p>
</div>

</template>

<script>

import NavBar from "../components/NavBar.vue"

export default ({
  name: 'HomePage',

  components: {
    NavBar,
  },
});
</script>

<style scoped>

</style>
