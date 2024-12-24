<template>
  <footer class="footer-container">
    <div class="footer-content">
      <p class="footer-text">© 2024 Pet Adoption. Contact us:</p>
      <div class="contact">
        <div class="contact-option">pet.adopt@gmail.com</div>
        <div class="contact-option">+40734568789</div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterSection",
};
</script>

<style scoped>
.footer-container {
  background-color: #3f8cff; 
  padding: 20px 0px;
  padding-bottom: 30px;
  color: white; 
  text-align: center;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
  width: 105%;
  position: relative;
  left: -10px;
  bottom: -8px;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-text {
  margin-bottom: 10px;
  font-size: 1rem;
}

.contact {
  display: flex;
  gap: 15px;
}

.contact-option {
  text-decoration: none;
  color: white; 
  font-weight: bold;
  transition: color 0.3s ease;
}

</style>
