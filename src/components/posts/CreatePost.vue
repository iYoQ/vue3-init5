<template>
  <section class="ab-info-main py-md-5 py-4 editContent single">
    <div class="container py-md-5">
      <div class="container py-md-5">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="headline">Заголовок:</label>
            <input
              v-model="headline"
              type="text"
              class="form-control"
              placeholder="Введите название"
            />
          </div>
          <div v-if="!isNews" class="form-group">
            <label for="category">Категория:</label>
            <select v-model="category" class="form-control" id="category">
              <option hidden disabled selected value>Выберите категорию</option>
              <option v-for="category in categorys" :key="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="content">Текст:</label>
            <textarea v-model="content" id="content"></textarea>
          </div>
          <button type="submit" class="btn customBtn btn-block">
            Отправить
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import CKEditor from "@ckeditor/ckeditor5-vue";

export default {
  name: "CreatePost",
  //   components: {
  //     ckeditor: CKEditor.component,
  //   },
  props: {
    categorys: {
      type: Array,
    },
    isNews: {
      type: Boolean,
    },
  },
  emits: {
    "send-post": null,
  },
  created() {},
  data() {
    return {
      headline: null,
      category: "",
      content: "",
      //   editor: ClassicEditor,
      //   editorConfig: {},
    };
  },
  methods: {
    submitForm() {
      this.$emit("send-post", this.headline, this.content, this.category);
    },
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 400px;
}
</style>
