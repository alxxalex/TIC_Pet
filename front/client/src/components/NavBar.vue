<template>
  <header class="navbar">
    <div class="navbar-left">
      <router-link to="/home">
        <img src="../assets/petLogo.png" alt="Logo" class="logo" />
      </router-link>
      <h1 class="app-name">Adopt a best friend</h1>
    </div>
    <nav class="navbar-right">
        <router-link class="nav-link" to="/gallery">
            <div >Gallery</div>
        </router-link>
        <router-link class="nav-link" to="/aboutus">
            <div>About Us</div>
        </router-link>
        <div @click="logout">
          <i class="fa fa-sign-out nav-link" aria-hidden="true" ></i>
        </div>
    </nav>
  </header>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "NavBar",
  methods: {
    async logout(){
      const { isConfirmed } = await Swal.fire({
        title: `Are you sure you want to logout?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No!',
      });
      if(isConfirmed){
        const response = await fetch(
            "http://localhost:3000/logout",
            {
              method: "POST",
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          this.$store.commit('clearAuthState');

          Swal.fire({
            position: "center",
            icon: "success",
            title: "You succesfully logged out",
            showConfirmButton: false,
            timer: 1500,
          });

          setTimeout(() => {
            this.$router.push("/");
          }, 1500);
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Pacifico&display=swap");

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  color: black;
  padding: 0px 20px;
  border-bottom: 3px solid #3f8cff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: relative;
  left: -10px;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 65px;
  width: 65px;
  margin-right: 10px;
  cursor: pointer;
}

.app-name {
  font-family: "Pacifico";
  font-size: 2rem;
  font-weight: bold;
  color: #428af7;
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
  cursor: pointer;
}

.nav-link:hover {
  color: #3f8cff;
  border-bottom: 2px solid #3f8cff;
}

/* .sign-out{
  font-size: 30px;
  margin-right: 15px;
} */
</style>
