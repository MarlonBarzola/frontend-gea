<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Biblioteca</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          style="cursor: pointer"
          v-for="library in libraries.data"
          :key="library.id"
          @click="currentLibrary(library)"
        >
          {{ library.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6" v-if="library">
        
      <h4>{{ titleLibrary }}</h4>

      <form v-on:submit.prevent="editLibrary" class="mb-2">
        <input
          class="form-control mb-2"
          type="text"
          placeholder="Nombre"
          v-model="name"
        />

        <textarea
          class="form-control mb-2"
          type="text"
          placeholder="Email"
          v-model="body"
        >
        </textarea>

         <select
          class="form-control"
          id="category"
          required
          v-model="category_id"
          name="category"
        >
            <option disabled value="">Selecciona una categoría</option>
            <option :value="category.id" v-for="category of categories.data" :key="category.id">
                {{ category.name }}
            </option>
        </select>
      </form>

      <button class="btn btn-success mr-2" @click="editLibrary(library.id)">
        Editar
      </button>
      <button class="btn btn-danger" @click="removeLibrary(library.id)">
        Eliminar
      </button>
    </div>
  </div>
</template>

<script>
import LibraryDataService from "../services/LibraryDataService";
import CategoryDataService from "../services/CategoryDataService";

export default {
  name: "library-list",
  data() {
    return {
      libraries: [],
      library: "",
      name: "",
      body: "",
      category_id: "",
      titleLibrary: "",
    };
  },
  methods: {
    retrieveLibrary() {
      LibraryDataService.getAll()
        .then((response) => {
          this.libraries = response.data;
          console.log(this.libraries.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    currentLibrary(library) {
      this.library = library;
      this.titleLibrary = library.name

      this.name = library.name;
      this.body = library.body;
      this.category_id = library.category_id;
    },
    removeLibrary(library) {
        if (window.confirm("¿Deseas eliminar esto?")) {
            LibraryDataService.delete(library)
                .then((response) => {
                this.refreshList();
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
            });
        }
    },
    refreshList() {
      this.retrieveLibrary();
      this.library = "";
    },
    retrieveCategories() {
        CategoryDataService.getAll()
        .then((response) => {
          this.categories = response.data;
          console.log(this.categories.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editLibrary() {
      const data = {
        name: this.name,
        body: this.body,
        category_id: this.category_id
      };
      LibraryDataService.update(this.library.id, data)
        .then(response => {
            console.log(response)
            this.titleLibrary = response.data.data.name
            this.retrieveLibrary();
            alert('Actualización completada');
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveLibrary();
    this.retrieveCategories();
  },
};
</script>
