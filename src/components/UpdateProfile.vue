<template>
  <div class="desc1-right col-md-11 pl-lg-4">
    <div class="d-flex">
      <div class="d-flex flex-column">
        <img
          :src="new_image"
          class="mr-3 img-fluid"
          alt=""
          height="150"
          width="150"
        />
        <br />
        <input @change="onFileChange" type="file" accept="image/*" />
      </div>
      <div class="align-self-center">
        <h5 class="wrapped">{{ user.username }}</h5>
        <li class="li-article pb-3 font-italic li-user">
          <span
            ><mark>{{ user.role }}</mark></span
          >
        </li>
        <li class="li-article pb-3 font-italic li-user">
          <mark><span>Email: </span>{{ user.email }}</mark>
        </li>
      </div>
    </div>
    <div class="pl-3 pt-3 d-flex flex-column">
      <span class="span-user">День рождения:</span
      ><input v-model="new_birth" class="li-user" />
      <span class="span-user">Пол:</span
      ><input v-model="new_gender" class="li-user" />
      <span class="span-user">Описание:</span
      ><input v-model="new_description" class="li-user" />
      <div v-if="$store.state.is_admin">
        <input type="checkbox" id="newsmaker" v-model="newsmaker" /><span
          class="span-user"
          >newsmaker?</span
        >
      </div>
      <button
        type="button"
        class="mt-3 btn btn-block py-3"
        @click="sendUpdate()"
      >
        Обновить
      </button>
      <button
        type="button"
        class="mt-3 btn btn-block py-3"
        @click="$emit('back')"
      >
        Отмена
      </button>
    </div>
  </div>
</template>

<script>
import { api } from "../http";
export default {
  name: "UpdateProfile",
  props: ["user"],
  data() {
    return {
      new_image: this.user.avatar,
      new_birth: this.user.birth_date,
      new_gender: this.user.gender,
      new_description: this.user.description,
      newsmaker: this.user.is_newsmaker,
    };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      //   var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.new_image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async sendUpdate() {
      const updateData = {
        description: this.new_description,
        birth_date: this.new_birth,
        gender: this.new_gender,
      };
      if (this.new_image !== this.user.avatar) {
        console.log(this.new_image);
        updateData["avatar"] = this.new_image;
      }
      if (this.newsmaker !== this.user.is_newsmaker) {
        updateData["is_newsmaker"] = this.newsmaker;
      }
      await api
        .patch(`/users/${this.user.username}/`, updateData)
        .then(() => {
          this.$emit("reload_page", this.user.username);
          this.$emit("back");
        })
        .catch((error) => {
          var key = Object.keys(error.response.data);
          alert(error.response.data[key]);
        });
    },
  },
};
</script>

<style scoped>
.li-user {
  list-style: none;
}
.span-user {
  font-weight: bold;
}
</style>
