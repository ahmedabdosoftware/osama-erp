<template>
    <div :class="{ 'dark-mode': getDarkMode }" id="login-page">
      <section class="side">
        <img src="@/assets/images/img.svg" alt="">
      </section>
  
      <section class="main">
        <div class="login-container">
          <p class="title">Welcome back</p>
          <div class="separator"></div>
          <p class="welcome-message">Please, provide login credential to proceed and have access to all our services</p>
  
          <form class="login-form" @submit.prevent="handleLogin">
            <div class="form-control">
              <input v-model="email" type="text" placeholder="Username">
              <font-awesome-icon icon="user" class="icon" />
            </div>
            <div class="form-control">
              <input v-model="password" type="password" placeholder="Password">
              <font-awesome-icon class="icon" icon="lock" />
            </div>
  
            <button class="submit" type="submit">Login</button>
          </form>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from 'pinia';
  import { useUserStore } from '@/store/auth/auth.js';
  
  export default {
    name: "Login",
    data() {
      return {
        email: '',
        password: '',
      };
    },
    computed: {
      ...mapState(useUserStore, ['role','isAdmin','isTechnical','isClint']),
      getDarkMode() {
        return this.$store.state.darkMode;
      },
    },
    
    methods: {
      ...mapActions(useUserStore, ['login']),
      async handleLogin() {
        try {
           const userId =  await this.login( this.email, this.password );
         
          if ( this.isAdmin ) {
            this.$router.push('/dashboard');
          } else if ( this.isTechnical || this.isClint) {
            console.log(userId)
            this.$router.push(`/profile/${userId}`);

          }
        } catch (error) {
          console.error('Login failed:', error);
          alert('Failed to login. Please check your credentials and try again.');
        }
      },
    },
  };
  </script>

  <style scoped lang="scss">
  %flex_center{
    display: flex;
    justify-content: center;
    align-items: center;    
  }
#login-page {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;

  &.dark-mode {
    background-color: rgb(19, 19, 19);
  }
}

section {
 @extend %flex_center;
  &.side {
    background: url(../../assets/images/bk.png) no-repeat;
    background-size: 100% 102%;
  }

  img {
    width: 50%;
    max-width: 50%;
  }
}

.login-container {
  max-width: 450px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    text-transform: uppercase;
    font: {
        size: 3em;
        weight: bold;
    }
    text-align: center;
    letter-spacing: 1px;
  }

  .separator {
    width: 150px;
    height: 4px;
    background-color: #843bc7;
    margin: 24px;
  }

  .welcome-message {
    text-align: center;
    font-size: 1.1em;
    line-height: 28px;
    margin-bottom: 30px;
    color: #696969;
  }

  .login-form {
    width: 100%;
    display: flex;
    flex-direction: column;

    .form-control {
      width: 100%;
      position: relative;
      margin-bottom: 24px;

      input,
      button {
        border: none;
        outline: none;
        border-radius: 30px;
        font-size: 1.1em;
      }

      input {
        width: 100%;
        background: #e6e6e6;
        color: #333;
        letter-spacing: 0.5px;
        padding: 14px 64px;

        & ~ .icon {
          position: absolute;
          left: 32px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
          transition: color 0.4s;
        }

        &:focus ~ .icon {
          color: #843bc7;
        }
      }
    }

    button.submit {
      color: #fff;
      padding: 14px 64px;
      margin: 32px auto;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: bold;
      background-image: linear-gradient(to right, #8b33c5, #15a0e1);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 0.9;
      }
    }
  }
}

/* ----  Responsiveness   ----  */
@media (max-width: 780px) {
  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .side {
    display: none;
  }
}
</style>