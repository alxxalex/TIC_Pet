<template>
  <div class="about-container">
    <NavBar />
    <div class="about-content">
      <h1 class="about-heading">About Us</h1>
      <p class="about-description">
        Welcome to Pet Adoption, where every pet's journey to a loving home begins. We are passionate about helping animals in need and connecting them with families who can provide them with a lifetime of care and companionship.
      </p>
      <h2 class="sub-heading">Our Mission</h2>
      <p class="about-description">
        At Pet Adoption, we believe that every pet deserves a chance to experience love, safety, and happiness. Our mission is to:
      </p>
      <ul class="mission-list">
        <li>Find forever homes for pets in need.</li>
        <li>Raise awareness about the importance of adoption over buying.</li>
        <li>Support local shelters and rescues through community-driven initiatives.</li>
        <li>Educate families about responsible pet ownership.</li>
      </ul>
      <h2 class="sub-heading">Our Values</h2>
      <p class="about-description">
        Compassion, dedication, and community are the core values that drive everything we do. We strive to create a world where every pet has a family and every family has the opportunity to make a difference.
      </p>
      <h2 class="sub-heading">Meet Our Team</h2>
      <p class="about-description">
        Our dedicated team of volunteers and animal lovers work tirelessly to provide support and guidance throughout the adoption process. From matching you with the perfect pet to offering post-adoption resources, we're here for you every step of the way.
      </p>
      <h2 class="sub-heading">Why Choose Adoption?</h2>
      <p class="about-description">
        Adopting a pet is a rewarding experience. Not only are you giving a pet a second chance at life, but you're also making room for shelters to save more animals. By choosing adoption, you become part of a community that values love, kindness, and hope.
      </p>
      <div class="quote-section">
        <blockquote class="quote">
          "Saving one animal won't change the world, but for that one animal, the world changes forever."
        </blockquote>
      </div>
    </div>
    <FooterSection />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import FooterSection from "../components/FooterSection.vue";

export default {
  name: "AboutPage",

  components: {
    NavBar,
    FooterSection,
  },
};
</script>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: white; 
  color: black; 
  font-family: "Arial", sans-serif;
}

.about-content {
  max-width: 80%;
  margin: 40px auto; 
}

.about-heading {
  font-size: 2.8rem;
  font-weight: bold;
  color: #3f8cff; 
  text-align: center;
  margin-bottom: 20px;
}

.sub-heading {
  font-size: 2rem;
  font-weight: bold;
  color: #3f8cff; 
  margin: 30px 0 15px;
}

.about-description {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 20px;
  color: black; 
}

.mission-list {
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
}

.mission-list li {
  font-size: 1rem;
  margin-bottom: 10px;
  padding-left: 20px;
  text-indent: -20px;
  position: relative;
}

.mission-list li::before {
  content: "•";
  color: #3f8cff; 
  position: absolute;
  left: 0;
}

.quote-section {
  margin: 50px auto;
  text-align: center;
}

.quote {
  font-size: 1.8rem;
  font-style: italic;
  color: black;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
}
</style>
