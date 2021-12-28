<template>
  <div class="row">
    <div class="col-md-6">
        <h4>Buscar</h4>
        <form v-on:submit.prevent="searchLibrary">
            <input type="text" placeholder="Buscar por nombre" class="form-control mb-2" v-model="search"
             @keyup="$emit('searchLibrary', search)" />
        </form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'search-library',
    data() {
        return {
            search: ''
        }
    },
}
</script>