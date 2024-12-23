<template>
  <v-sheet class="login-container" width="400" max-width="100%" elevation="5" rounded>
    <v-form @submit.prevent="submitForm" class="login-form">
      <v-row class="mb-4 back-row" justify="center" align="center" >
        <!-- Back Button with Arrow -->
        <router-link to="/" class="back-button">
          <btn class="back-circle" elevation="1" rounded>
            <i class="fa-solid fa-left-long"></i>
          </btn>
        </router-link>
        <h2>Sign up</h2>
      </v-row>

      <!-- <v-img src="your-logo-path.png" alt="Logo" class="logo" contain></v-img> -->

      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        :rules="[required]"
        required
        outlined
        dense
        class="input-field"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        :rules="[required]"
        required
        outlined
        dense
        class="input-field"
      ></v-text-field>

        <div
        v-if="errorMessage"
        type="error"
        class="mt-4 error-alert"
        dismissible
      >
        {{ errorMessage }}
      </div>

      <v-btn type="submit" color="primary" class="btn-submit" block>
        Sign up
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
export default {
  name:"SignupForm",
  data: () => ({
    email: '',
    password: '',
    errorMessage: ''
  }),
    methods: {
    async submitForm() {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      try {
        const credentials = {
          email: this.email,
          password: this.password,
        };

        const baseUrl = 'http://localhost:3000'

        const response = await fetch(baseUrl + '/users', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        const data = await response.json();

        if (response.ok) {
          console.log('Signup successful!', data);
          this.$router.push('/home');
        }else {
          console.error('Signup failed:', data.errors[0].msg);
          this.errorMessage = data.errors && data.errors[0]?.msg || 'Signup failed. Please try again.';
        }
      } catch (error) {
        console.error('Error during Signup:', error);
      }
    },
    required (v) {
        return !!v || 'Field is required'
    }
  }, 
 }
 </script>

<style scoped>
.back-row {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.back-button {
  margin-right: 30%;
  text-decoration: none;
}

.back-circle {
  background-color: #3f8cff;
  color: white;
  width: 40px;
  height: 40px;
  min-width: 40px; 
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.back-circle:hover {
  background-color: white;
  color: #3f8cff;
  border: 1px solid #3f8cff;
}

.login-container {
  max-width: 400px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.input-field {
  margin-bottom: 10px;
}

.btn-submit {
  background-color: #3f8cff;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  text-align: center;
}

.btn-submit:hover {
  background-color: #3579e3;
}

.v-img {
  margin-bottom: 24px;
  max-width: 80px;
  margin-left: auto;
  margin-right: auto;
}

.v-btn {
  font-size: 14px;
  padding: 6px 0;
  cursor: pointer;
}

h2 {
  text-align: center;
  font-size: 24px;
  color: #3f8cff;
  margin-bottom: 20px;
}

.mt-6 {
  margin-top: 22px !important;
}

.error-alert {
  margin-bottom: 20px;
  background-color: #ffdddd;
  color: #d32f2f;
  border: 1px solid #d32f2f;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.error-alert {
  display: flex;
  align-items: center;
}
</style>
