<template>
  <search-library @searchLibrary="search" />

  <div class="list row my-5">
    <div class="col-md-6">
      <h4>Biblioteca</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          style="cursor: pointer"
          v-for="library in libraries.data"
          :key="library.id"
          @click="rent(library.id)"
        >
          {{ library.name }} - rentar
        </li>
      </ul>
    </div>

    <div class="col-md-6">
      <h4>Mi Biblioteca</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="user in user_libraries.data"
          :key="user.id"
        >
          {{ user.name }}
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import LibraryDataService from "../services/LibraryDataService";
import SearchLibrary from "../components/SearchLibrary.vue";
import RentDataService from "../services/RentDataService";

export default {
  components: { SearchLibrary },
  name: "rent-library",
  data() {
    return {
      libraries: [],
      user_libraries: []
    };
  },
  methods: {
    retrieveLibrary() {
      LibraryDataService.getAll()
        .then((response) => {
          this.libraries = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    retrieveUserLibrary() {

      const user_id = 1; //ID del usuario logueado

      RentDataService.get(user_id)
        .then((response) => {
          this.user_libraries = response.data;
          console.log(this.user_libraries);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    rent(library) {
      if (window.confirm("¿Quieres rentar este libro?")) {
        const data = {
          library_id: library,
          user_id: 1,
        };

        RentDataService.create(data)
          .then((response) => {
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    search(name) {
      if (name) {
        LibraryDataService.findByTitle(name)
          .then((response) => {
            this.libraries = response.data;
            this.library = "";
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.retrieveLibrary();
      }
    },
  },
  mounted() {
    this.retrieveLibrary();
    this.retrieveUserLibrary();
  },
};
</script>
