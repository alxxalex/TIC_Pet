<template>
  <div class="add-animal-container">
    <div v-if="isLoading">
        <SpinnerIcon/>
    </div>
    <NavBar />
    <div class="form-container">
      <h1 class="form-title">Add New Animal</h1>
      <form @submit.prevent="submitForm" class="animal-form">
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

        <div class="form-group">
          <label for="type" class="form-label">Type</label>
          <select id="type" v-model="animal.type" class="form-input" required>
            <option value="" disabled selected>Select animal type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Parrot">Parrot</option>
            <option value="Rabbit">Rabbit</option>
          </select>
        </div>

        <div class="form-group">
          <div class="form-group">
            <label for="image" class="form-label">Image</label>
            <div class="custom-file-upload">
              <label for="image" class="file-upload-text">Choose Image</label>
              <input
                type="file"
                id="image"
                @change="handleImageUpload"
                accept="image/*"
                class="custom-file-input"
                required
              />
            </div>
          </div>
        </div>

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
import SpinnerIcon from "../components/SpinnerIcon.vue";
import Swal from "sweetalert2";

export default {
  name: "AddAnimalPage",
  components: {
    NavBar,
    FooterSection,
    SpinnerIcon,
  },
  data() {
    return {
      animal: {
        name: "",
        type: "",
        image: null,
        description: "",
      },
      isLoading : false
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.animal.image = file;
      }
    },
async submitForm() {
  if (!this.animal.name || !this.animal.type || !this.animal.image || !this.animal.description) {
    Swal.fire({
    position: "center",
    icon: "error",
    title: "All fields are required",
    showConfirmButton: false,
    timer: 1500
    });
    return;
  }
    this.isLoading = true;
  try {
    const imageFormData = new FormData();
    imageFormData.append("image", this.animal.image);

    const uploadResponse = await fetch("http://localhost:3000/animal/image", {
      method: "POST",
      credentials: "include",
      body: imageFormData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload image");
    }

    const { imageUrl } = await uploadResponse.json();

    const animalData = {
      name: this.animal.name,
      type: this.animal.type,
      description: this.animal.description,
      image: imageUrl,
    };

    const response = await fetch("http://localhost:3000/animal", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animalData),
    });

    if (!response.ok) {
      throw new Error("Failed to add animal");
    }

    const data = await response.json();
    console.log("Animal added successfully:", data);
    this.isLoading = false;

    Swal.fire({
    position: "center",
    icon: "success",
    title: "The animal has been added",
    showConfirmButton: false,
    timer: 1500
    })

    setTimeout(() => {
    this.$router.push("/gallery");
    }, 1500);
    
    // this.animal = { name: "", type: "", image: null, description: "" };

  } catch (error) {
    console.error("Error adding animal:", error);
    Swal.fire({
    position: "center",
    icon: "error",
    title: "Failed to add animal",
    showConfirmButton: false,
    timer: 1500
    });
  }
}
,
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
  background-color: white;
  border-radius: 10px;
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
  margin-bottom: 60px;
}

.submit-button:hover {
  background-color: #2c66c0;
}
</style>
