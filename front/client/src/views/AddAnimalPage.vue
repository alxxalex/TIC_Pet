<template>
  <div class="add-animal-container">
    <NavBar />
    <div class="form-container">
      <h1 class="form-title">Add New Animal</h1>
      <form @submit.prevent="submitForm" class="animal-form">
        <!-- Name Field -->
        <div class="form-group">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            id="name"
            v-model="animal.name"
            class="form-input"
            placeholder="Enter animal's name"
            required
          />
        </div>

        <!-- Type Field -->
        <div class="form-group">
          <label for="type" class="form-label">Type</label>
          <select
            id="type"
            v-model="animal.type"
            class="form-input"
            required
          >
            <option value="" disabled selected>Select animal type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Parrot">Parrot</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <!-- Image Field -->
        <div class="form-group">
          <label for="image" class="form-label">Image</label>
          <div class="custom-file-upload">
            <input
              type="file"
              id="image"
              @change="handleImageUpload"
              accept="image/*"
              class="custom-file-input"
              required
            />
            <span class="file-upload-text">Choose Image</span>
          </div>
        </div>

        <!-- Description Field -->
        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            v-model="animal.description"
            class="form-input"
            rows="4"
            placeholder="Write a short description"
            required
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="form-group">
          <button type="submit" class="submit-button">Add Animal</button>
        </div>
      </form>
    </div>
    <FooterSection />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import FooterSection from "../components/FooterSection.vue";

export default {
  name: "AddAnimalPage",
  components: {
    NavBar,
    FooterSection,
  },
  data() {
    return {
      animal: {
        name: "",
        type: "",
        image: null,
        description: "",
      },
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.animal.image = URL.createObjectURL(file); // Store the image URL temporarily
      }
    },
    submitForm() {
      // Perform your form submission logic here, such as sending data to an API
      console.log(this.animal);
      // You can reset the form fields after submission if needed
      this.animal = { name: "", type: "", image: null, description: "" };
    },
  },
};
</script>

<style scoped>
.add-animal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  background-color: white;
  min-height: 100vh;
}

.form-container {
  width: 90%;
  max-width: 600px;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 2rem;
  font-weight: bold;
  color: #3f8cff;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  color: black;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: black;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #3f8cff;
}

textarea.form-input {
  resize: vertical;
}

.custom-file-upload {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.custom-file-upload .file-upload-text {
  display: inline-block;
  padding: 12px;
  font-size: 1rem;
  color: white;
  background-color: #3579e3;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
}

.custom-file-upload input[type="file"] {
  display: none;
}

.custom-file-upload:hover .file-upload-text {
  background-color: #2c66c0;
}

.submit-button {
  width: 100%;
  padding: 12px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #3579e3;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #2c66c0;
}
</style>
