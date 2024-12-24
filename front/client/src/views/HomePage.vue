<template>
<div class="home-container">
  <NavBar/>
  <div class="image-container">
    <img src="../assets/Bg2.jpg" alt="background" class="background" />
    <div class="overlay-content">
      <h1 class="overlay-text">Find Your Perfect Pet</h1>
      <router-link to="/gallery" class="gallery-button">View Gallery</router-link>
    </div>
  </div>
  <div class="testimonial-container">
    <div class="testimonial-text">
      <h2 class="testimonial-heading">"Adopt me, and I'll be your best friend forever!"</h2>
      <p class="testimonial-description">
        I'm waiting for someone who can give me a loving home. I'll bring joy,
        loyalty, and lots of tail wags to your life!
      </p>
    </div>
    <div class="testimonial-image">
      <img src="../assets/dog.jpeg" alt="Happy Dog" class="dog-picture" />
    </div>
  </div>
  <FooterSection/>
</div>
</template>

<script>

import NavBar from "../components/NavBar.vue";
import FooterSection from "../components/FooterSection.vue"

export default ({
  name: 'HomePage',

  components: {
    NavBar,
    FooterSection
  },
});
</script>

<style scoped>
/* Main image container */
.image-container {
  position: relative;
  width: 102%; 
  height: auto; 
  left: -10px;
}

.background {
  width: 100%;
  height: auto;
  display: block;
}

.overlay-content {
  position: absolute;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  text-align: center;
  color: white; 
}

.overlay-text {
  font-size: 3rem; 
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); 
}

.gallery-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #3f8cff; /* Blue button background */
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.gallery-button:hover {
  background-color: #3579e3; 
}

/* Testimonial Section */
.testimonial-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px auto;
  padding: 20px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 90%;
}

.testimonial-text {
  flex: 1;
  color: black;
  padding-right: 20px;
}

.testimonial-heading {
  font-size: 1.8rem;
  font-weight: bold;
  color: #3f8cff; 
  margin-bottom: 10px;
}

.testimonial-description {
  font-size: 1rem;
  line-height: 1.6;
}

.testimonial-image {
  flex: 0;
  text-align: center;
  margin-right: 15%;
}

.dog-picture {
  width: 200px;
  height: 200px;
  border-radius: 50%; /* Makes the image circular */
  border: 4px solid #3f8cff; /* Blue border */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
