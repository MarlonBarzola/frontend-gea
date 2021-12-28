<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="library.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="body">Contenido</label>
        <textarea
          class="form-control"
          id="body"
          required
          v-model="library.body"
          name="address"
        >
        </textarea>
      </div>

      <div class="form-group">
        <label for="category">Categoría</label>
        <select
          class="form-control"
          id="category"
          required
          v-model="library.category_id"
          name="category"
        >
            <option disabled value="">Selecciona una categoría</option>
            <option :value="category.id" v-for="category of categories.data" :key="category.id">
                {{ category.name }}
            </option>
        </select>
      </div>

      <button @click="saveLibrary" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>¡Libro guardado correctamente!</h4>
      <button class="btn btn-success" @click="newLibrary">Add</button>
    </div>
  </div>
</template>

<script>
import LibraryDataService from "../services/LibraryDataService";
import CategoryDataService from "../services/CategoryDataService";

export default {
  name: "add-library",
  data() {
    return {
      library: {
        name: '',
        body: '',
        category_id: ''
      },
      categories: [],
      submitted: false
    };
  },
  mounted() {
      this.retrieveCategories();
  },
  methods: {
    saveLibrary() {
      const data = {
        name: this.library.name,
        body: this.library.body,
        category_id: this.library.category_id,
      };
        console.log(data)
      LibraryDataService.create(data)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
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
    newLibrary() {
      this.submitted = false;
      this.library = {};
    }
  }
};
</script>

