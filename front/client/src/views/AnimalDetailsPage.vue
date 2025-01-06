<template>
  <div class="animal-details-container">
    <NavBar />
    <div v-if="isLoading">
      <SpinnerIcon />
    </div>
    <div v-if="animal" class="animal-details-card">
      <img
        :src="animal.image"
        :alt="animal.name"
        class="animal-details-image"
      />
      <h2 class="update-section-title">Update Animal Details</h2>
      <form @submit.prevent="updateAnimalDetails">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            placeholder="Enter name"
          />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea
            id="description"
            v-model="formData.description"
            placeholder="Enter description"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="type">Type:</label>
          <select id="type" v-model="formData.type" class="form-input">
            <option value="" disabled>Select animal type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Parrot">Parrot</option>
            <option value="Rabbit">Rabbit</option>
          </select>
        </div>

        <!-- <div class="form-group">
          <label for="file">Upload New Image:</label>
          <input type="file" id="file"  @change="handleImageUpload" />
        </div> -->

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
            />
          </div>
        </div>

        <div v-if="selectedImage" class="form-group">
          <label for="file-name">Chosen file name:</label>
          <p id="file-name">{{ selectedImage.name }}</p>
        </div>
        <button type="submit" class="update-button">Update</button>
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
  name: "AnimalDetailsPage",
  components: {
    NavBar,
    FooterSection,
    SpinnerIcon,
  },
  data() {
    return {
      animal: {
        id: "",
        name: "",
        description: "",
        type: "", 
        image: ""
      },
      isLoading: true,
      formData: {
        name: "",
        description: "",
        type: "", 
        image: ""
      },
      selectedImage: null, 
    };
  },
  async created() {
    const animalId = this.$route.params.id;
    await this.fetchAnimalDetails(animalId);
  },
  methods: {
    async fetchAnimalDetails(id) {
      try {
        const response = await fetch(`http://localhost:3000/animal/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        this.animal = data;
        console.log(this.animal);

        this.formData.name = data.name;
        this.formData.description = data.description;
        this.formData.type = data.type;
        this.formData.image = data.image;

      } catch (error) {
        console.error("Error fetching animal details:", error);
      } finally {
        this.isLoading = false;
      }
    },
    handleImageUpload(event) {
      this.selectedImage = event.target.files[0];
    },
    async updateAnimalDetails() {
      try {
        this.isLoading = true;
        const formData = new FormData();
        if (this.selectedImage) {
            formData.append("image", this.selectedImage); 
                    const uploadResponse = await fetch(
            "http://localhost:3000/animal/image",
            {
                method: "POST",
                credentials: "include",
                body: formData,
            }
            );
            const { imageUrl } = await uploadResponse.json();

            this.animal.image = imageUrl;

            if (!uploadResponse.ok) {
                throw new Error("Failed to upload image");
            }
        }else{
            this.animal.image = this.formData.image;
        }
        this.animal.name = this.formData.name;
        this.animal.description = this.formData.description;
        this.animal.type = this.formData.type

        const response = await fetch(
          `http://localhost:3000/animal`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.animal),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        this.isLoading = false;

        const updatedAnimal = await response.json();
        this.animal = updatedAnimal;

        Swal.fire({
          position: "center",
          icon: "success",
          title: "The animal has been updated",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          this.$router.push("/gallery");
        }, 1500);
      } catch (error) {
        console.error("Error updating animal details:", error);
        alert("Failed to update animal details. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.animal-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  color: black;
  min-height: 100vh;
}

.animal-details-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 1000px;
  text-align: center;
}

.animal-details-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
}

.update-section-title {
  font-size: 1.8rem;
  margin-top: 20px;
  color: #3f8cff;
}

form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

textarea {
  resize: none;
  height: 80px;
}

.update-button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #3579e3;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.update-button:hover {
  background-color: #2c66c0;
}

.file-upload-text {
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

.file-upload-text :hover {
  background-color: #2c66c0;
}

.form-label {
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  color: black;
  margin-bottom: 5px;
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

select.form-input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: black;
  box-sizing: border-box;
}

select.form-input:focus {
  outline: none;
  border-color: #3f8cff;
}

</style>
