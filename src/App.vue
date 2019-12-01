<template>
  <div id="app">

    <h1 id="title">Registration</h1>

    <input class="panel text-input" type="text" placeholder="email" v-model="email"/> 

    <input class="panel text-input" type="text" placeholder="username" v-model="username"/>

    <input class="panel text-input" type="password" placeholder="password" v-model="password"/>

    <input class="panel" id="submit-button" type="submit" value="submit" @click="onSubmit"/>

  </div>
</template>

<script>
import { SHA256 } from "crypto-js";

export default{
  name: 'app',
  data: function() {
    return {
      email : '',
      username: '',
      password: '',
      userExists: false
    }
  },
  methods: {
    onSubmit() {

      const userAction = async () => {
      var salt = (Math.random()*123456789).toString();
      var hashedpassword =  SHA256(this.password + salt).toString();
      const response = await fetch('http://it-projekt19-6.informatik.fh-nuernberg.de:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "username": this.username,
          "hashedpassword": hashedpassword,
          "email": this.email,
          "salt": salt
        }
      });
      let text = await response.text();
      return text;
    }
    let registerResponse = userAction();
    /* eslint-disable no-console */
    console.log(this.email)
    console.log(this.username)
    console.log(this.password)
    console.log(registerResponse)
    /* eslint-disable no-console */
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
