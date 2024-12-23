<template>
  <v-sheet class="login-container" width="400" max-width="100%"  elevation="5" rounded>
    <v-form @submit.prevent="submitForm" class="login-form">
      <h2>Login</h2>
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

      <v-btn
        type="submit"
        color="primary"
        class="btn-submit"
      >
        Login
      </v-btn>

      <div class="signupMessage">
          <span>Don’t have an account?</span> 
          <span class="sign-up-link"> <router-link to="/signup"> Sign Up </router-link></span> 
      </div>

    </v-form>
  </v-sheet>
</template>

<script>
export default {
  name:"LoginForm",
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

        const response = await fetch(baseUrl + '/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        const data = await response.json();

        if (response.ok) {
          console.log('Login successful!', data);
          this.$router.push('/home');
        }else if(response.status == 401){
          this.errorMessage = "Incorrect credentials";
        } else {
          console.error('Login failed:', data.errors[0].msg);
          this.errorMessage = data.errors && data.errors[0]?.msg || 'Login failed. Please try again.';
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
    required (v) {
        return !!v || 'Field is required'
    }
  },
};
</script>

<style scoped>
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
  cursor: pointer;
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

.sign-up-link {
  font-weight: bold;
  cursor: pointer;
  color: #3f8cff;
}

.sign-up-link:hover {
  text-decoration: underline;
}

.signupMessage{
  padding-top: 20px;
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
