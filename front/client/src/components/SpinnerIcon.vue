<template>
  <div class="loading-overlay">
    <i class="fas fa-circle-notch fa-spin spinner"></i>
  </div>
</template>

<script>
export default {
  name: "SpinnerIcon",
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}

.spinner {
  font-size: 3rem;
  color: black;
}
</style>
