<template>
  <div class="gallery-container">
    <NavBar />
    <div v-if="isLoading">
      <SpinnerIcon />
    </div>
    <div class="gallery-header">
      <h1 class="gallery-title">Adoptable Animals</h1>
      <router-link to="/addAnimal" class="add-animal-button"
        >Add New Animal</router-link
      >
    </div>
    <div v-if="animals.length > 0">
      <div class="gallery-grid">
        <div v-for="animal in animals" :key="animal.id" class="animal-card">
          <img :src="animal.image" :alt="animal.name" class="animal-image" />
          <h2 class="animal-name">{{ animal.name }}</h2>
          <p class="animal-description">{{ animal.description }}</p>
          <button class="adopt-button" @click="adoptAnimal(animal.id)">
            Adopt me
          </button>
        </div>
      </div>
    </div>
    <FooterSection />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import FooterSection from "../components/FooterSection.vue";
import SpinnerIcon from "../components/SpinnerIcon.vue";
import Swal from "sweetalert2";

export default {
  name: "GalleryPage",
  components: {
    NavBar,
    FooterSection,
    SpinnerIcon,
  },
  data() {
    return {
      animals: [],
      isLoading: false,
    };
  },
  mounted() {
    this.fetchAnimals();
  },
  methods: {
    async fetchAnimals() {
      this.isLoading = true;
      try {
        const response = await fetch("http://localhost:3000/animal", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.animals = data;
        console.log(this.animals);
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    },
    async adoptAnimal(animalId) {
      try {
        const response = await fetch(
          `http://localhost:3000/animal/${animalId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thank you for the adoption",
          showConfirmButton: false,
          timer: 1500,
        });

        this.animals = this.animals.filter((animal) => animal.id !== animalId);
      } catch (error) {
        console.error("Error adopting animal:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to process the adoption",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },
};
</script>

<style scoped>
.gallery-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: white;
  color: black;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10%;
  background-color: #3f8cff;
  color: white;
  width: 82%;
  position: relative;
  left: -10px;
}

.gallery-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}

.add-animal-button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #3579e3;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.add-animal-button:hover {
  background-color: #2c66c0;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px 10%;
}

.animal-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
}

.animal-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.animal-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3f8cff;
  margin: 10px 0;
}

.animal-type {
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
}

.animal-description {
  font-size: 1rem;
  color: #666;
}

.adopt-button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #3579e3;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.adopt-button:hover {
  background-color: #2c66c0;
}
</style>
