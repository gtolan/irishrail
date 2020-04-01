<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/current-trains">Current Trains</router-link>
      <router-link to="/train/">By Train ID</router-link>
    </div>
    <router-view />
  </div>
</template>



<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: white;
  max-width: 600px;
  width: 70vw;
  display: flex;
  margin: 70px auto;
  padding: 0;
  background-color: white;

  a {
    width: 33%;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    border: 1px solid #42b983;
    padding: 1rem;
    &:hover {
      background: #117347;
      color: white;
    }
    &.router-link-exact-active {
      background: #42b983;
      color: white;
      &:hover {
        background: #117347;
        color: white;
      }
    }
  }
}
</style>
