<template>
  <v-sheet class="mx-auto" width="300">
    <v-form disabled>
      <v-text-field
        v-model="firstName"
        label="First name"
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        label="Last name"
      ></v-text-field>
    </v-form>
  </v-sheet>
</template>

<script>
export default {
  name: 'LoginComponent',
  data: () => ({
      firstName: '',
      lastName: '',
    }),
  }
</script>

<style scoped>

</style>
