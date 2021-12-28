<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container">
        <router-link to="/" class="navbar-brand">Biblioteca</router-link>
        <div class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/add" class="nav-link">Agregar</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/rent" class="nav-link">Rentar</router-link>
          </li>
        </div>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>