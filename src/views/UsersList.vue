<template>
  <section class="d-flex py-md-5 py-4 flex-wrap justify-content-around">
    <div class="d-flex py-5 mx-5" v-for="user in users" :key="user.id">
      <div class="flex-shrink-0 pt-4">
        <img
          @click="goToUser(user.username)"
          :src="user.avatar"
          class="img-fluid rounded-circle"
          alt=""
          height="150"
          width="150"
        />
      </div>
      <div class="align-self-center ps-3">
        <h5 class="wrapped">{{ user.username }}</h5>
        <li class="li-article pb-3 font-italic li-user">
          <span
            ><mark>{{ user.role }}</mark></span
          >
        </li>
        <ul class="">
          <li class="li-user">
            <span class="span-user">Заходил:</span>
            {{ new Date(user.last_login).toDateString() }}
          </li>
          <li class="li-user">
            <span class="span-user">Рейтинг:</span> {{ user.rating }}
          </li>
        </ul>
      </div>
    </div>
  </section>
  <div class="container py-md-4">
    <AppPagination
      :totalItems="countUsers"
      :pageSize="pageSize"
      @page-changed="updateUsers"
    />
  </div>
</template>

<script>
import AppPagination from "@/components/AppPagination.vue";
import { loadUsers } from "@/apiUsers.js";
export default {
  name: "UsersList",
  components: { AppPagination },
  data() {
    return {
      users: [],
      page: 1,
      countUsers: 0,
      pageSize: 20,
    };
  },
  created() {
    this.updateUsers(this.page);
  },
  methods: {
    async updateUsers(pageNumber) {
      const exchangeData = await loadUsers(pageNumber);

      this.users = exchangeData.results;
      this.countUsers = exchangeData.count;
    },
    goToUser(username) {
      this.$router.push({ name: "Profile", params: { username: username } });
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
img {
  cursor: pointer;
}
</style>
