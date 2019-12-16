<template>
  <div id="app">
    <div id="form" v-if="!loggedIn&&registration">
     <h1 id="title">Registration</h1>
      <input class="panel text-input" type="text" placeholder="email" v-model="email"/> 
      <input class="panel text-input" type="text" placeholder="username" v-model="username"/>
      <input class="panel text-input" type="password" placeholder="password" v-model="password"/>
      <input class="panel" id="submit-button" type="submit" value="submit" @click="onSubmitRegistratiom"/>
      <button v-on:click='registration = !registration'>Login</button>
    </div>
    <div id="form" v-else-if="!loggedIn&&!registration">
      <h1 id="title">Login</h1>
      <input class="panel text-input" type="text" placeholder="email" v-model="email"/> 
      <input class="panel text-input" type="password" placeholder="password" v-model="password"/>
      <input class="panel" id="submit-button" type="submit" value="submit" @click="onSubmitLogin"/>
      <button v-on:click='registration = !registration'>Registration</button>
    </div>
    <div v-else-if="loggedIn">
      
    </div>
  </div>
</template>

<script>
import { SHA256 } from "crypto-js";
import * as jwt from 'jsonwebtoken';

export default{
  name: 'app',
  data: function() {
    return {
      email : '',
      username: '',
      password: '',
      loggedIn: false,
      token: '', 
      registration: false
    }
  },
  methods: {
    onSubmitLogin() {
      fetch('http://it-projekt19-6.informatik.fh-nuernberg.de:8081/api/auth/salt', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "email": this.email
        }
      })
      .then(response => response.json())
        .then(salt => {
          /* eslint-disable no-console */
          console.log(salt.salt)
          /* eslint-disable no-console */
          var hashedpassword =  SHA256(this.password + salt.salt).toString();
          return hashedpassword;
        })
         .then(hashedpassword => {
            return fetch('http://it-projekt19-6.informatik.fh-nuernberg.de:8081/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "hashedpassword": hashedpassword,
                "email": this.email,
              }
            });
          })
          .then(response => response.json())
            .then(token => {
              /* eslint-disable no-console */
              console.log(token)
              /* eslint-disable no-console */
              //jwt decode needs to be added
            })
    .catch(error => {
       /* eslint-disable no-console */
        console.log(error)
        /* eslint-disable no-console */
    })
    },
    onSubmitRegistratiom() {
      var salt = (Math.random()*123456789).toString();
      var hashedpassword =  SHA256(this.password + salt).toString();
      fetch('http://it-projekt19-6.informatik.fh-nuernberg.de:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "username": this.username,
          "hashedpassword": hashedpassword,
          "email": this.email,
          "salt": salt
        }
      })
      .then(response => response.json())
      .then(token => {
        /* eslint-disable no-console */
        console.log(jwt.decode(token))
        /* eslint-disable no-console */
      })
      .catch(error => {
        /* eslint-disable no-console */
        console.log(error)
        /* eslint-disable no-console */
      })
    }
  }
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-image: radial-gradient(white, white, #f2f2f2);
}

#form{
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center; 
}

#title{
  font-size: 2.5em;
}

#submit-button{
  width: 10em;
  padding: 0;

  cursor: pointer;
}

#submit-button:hover{
  background-image: radial-gradient(#c8daea, #6c9dc6);
  border-color: #6c9dc6;
}

.panel{
  width: 20em;
  height: 2.5em;

  margin: 1em;
  padding: 0 0 0 1em;

  font-size: 1.2em;

  border: 2px solid #d9d9d9;
  border-radius: 0.8em;
  outline-style: none;

  background-color: #f2f2f2;
}

.text-input:focus{
  background-color: #d9d9d9;
}
</style>
