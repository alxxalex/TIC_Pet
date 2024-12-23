<template>
  <header class="navbar">
    <div class="navbar-left">
      <img src="../assets/petLogo.png" alt="Logo" class="logo" />
      <h1 class="app-name">Adopt a best friend </h1>
    </div>
    <nav class="navbar-right">
      <a href="#gallery" class="nav-link">Gallery</a>
      <a href="#about-us" class="nav-link">About Us</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Pacifico&display=swap');

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white; 
  color: black; 
  padding: 0px 20px;
  border-bottom: 3px solid #3f8cff; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 65px;
  width: 65px;
  margin-right: 10px;
}

.app-name {
  font-family: 'Pacifico';
  font-size: 2rem;
  font-weight: bold;
  color: #3f8cff; 
}

.navbar-right {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: black; 
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 500;
  transition: color 0.3s ease, border-bottom 0.3s ease;
  padding-bottom: 5px;
  margin-right: 30px;
}

.nav-link:hover {
  color: #3f8cff; 
  border-bottom: 2px solid #3f8cff; 
}
</style>
