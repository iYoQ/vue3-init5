<template>
  <nav-header :categorys="categorys" @logout="logout" />
  <router-view />
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import { loadUser, logout } from "@/apiUsers.js";
import { loadCategorys } from "@/apiPosts.js";

export default {
  components: { NavHeader },
  data() {
    return {
      categorys: [],
    };
  },
  beforeCreate() {
    this.$store.commit("initializeStore");
  },
  created() {
    if (this.$store.state.access) {
      this.setUser();
    }
    this.setCategorys();
  },
  methods: {
    async setUser() {
      await loadUser().then((response) => {
        this.$store.commit("setUsername", response.username);
        this.$store.commit("setRole", response.role);
        this.$store.commit("setIsNewsmaker", response.is_newsmaker);
        return response;
      });
    },
    async setCategorys() {
      this.categorys = await loadCategorys();
    },
    logout() {
      console.log("app");
      logout();
      this.$router.go();
    },
  },
};
</script>

<style>
@import "assets/style.css";
</style>
