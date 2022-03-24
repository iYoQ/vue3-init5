<template>
  <div id="nav-header">
    <header class="header">
      <div class="container">
        <nav class="py-1 nav">
          <div>
            <h1 class="editContent">Init5</h1>
          </div>
          <ul class="menu mt-3">
            <li class="active">
              <router-link to="/">Главная</router-link>
            </li>
            <li><router-link to="/news">Новости</router-link></li>
            <li><router-link to="/users">Пользователи</router-link></li>
            <li>
              <a>Категории</a>
              <ul>
                <li v-for="category in categorys" :key="category.id">
                  <router-link
                    :to="{
                      name: 'home',
                      params: {
                        categoryId: category.id,
                      },
                    }"
                    >{{ category.name }}</router-link
                  >
                </li>
              </ul>
            </li>
            <li v-if="$store.state.access" class="border border-bottom-0">
              <router-link
                :to="{
                  name: 'create-article',
                }"
                >Добавить статью</router-link
              >
            </li>
            <li v-if="$store.state.isNewsmaker" class="border border-bottom-0">
              <router-link to="create_news">Добавить новость</router-link>
            </li>
          </ul>
          <div v-if="$store.state.access" class="mt-3">
            <a class="profile">{{ $store.state.username }} </a>
            <a @click="$emit('logout')" class="logout">Выход</a>
          </div>
          <div v-else class="mt-3">
            <router-link to="/login" class="loginBtn">Войти</router-link>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "NavHeader",
  props: {
    categorys: {
      type: Array,
    },
  },
  emits: {
    logout: null,
  },
};
</script>

<style scoped>
#nav-header {
  background-color: rgba(0, 0, 0, 0);
  margin-top: 0px;
  position: sticky;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 200;
}
.nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
header {
  position: absolute;
  z-index: 9;
  width: 100%;
  background-color: #00000045;
}
nav {
  margin: 0;
  padding: 0;
}
nav ul {
  padding: 0;
  margin: 0;
  list-style: none;
  position: relative;
}
nav ul li {
  float: left;
}
nav .menu li a:hover {
  color: #ff4c4c !important;
}
.menu li.active a {
  color: #ff4c4c !important;
}
nav ul ul {
  display: none;
  position: absolute;
  top: 30px;
  background: #fff;
  padding: 10px;
}
nav ul li:hover > ul {
  display: inherit;
}
nav ul ul li {
  width: 170px;
  float: none;
  display: list-item;
  position: relative;
  margin: 0;
}
nav ul ul li a {
  color: #333;
  padding: 5px 10px;
  display: block;
}
.menu li a {
  font-weight: 700;
  font-size: 0.8em;
  letter-spacing: 2px;
  padding-left: 0;
  padding-right: 0;
  padding: 10px 0;
  margin: 0px 1em;
  color: #fff;
  text-transform: uppercase;
  transition: 0.5s all ease;
}
.menu li ul li a {
  color: #555;
  padding: 10px 10px;
  font-size: 0.8em;
}
.menu li ul li:hover {
  background: #f8f9fa !important;
}
.editContent {
  color: rgb(255, 255, 255);
  text-shadow: 2px 5px 3px rgba(0, 0, 0, 0.06);
}
.loginBtn {
  color: rgb(255, 255, 255);
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
}
.profile {
  cursor: pointer;
  font-weight: 700;
  text-decoration: none;
  color: white !important;
  position: relative;
  padding: 5px 10px;
  border: 1px solid;
  border-right-width: 0;
  border-image: linear-gradient(180deg, #ff3000, #ed0200, #ff096c, #d50082);
  border-image-slice: 1;
  overflow: hidden;
  letter-spacing: 2px;
  transition: 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.profile:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 0;
  width: 100%;
  z-index: -1;
  color: white;
  background: linear-gradient(180deg, #ff3000, #ed0200, #ff096c, #d50082);
  transition: 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.profile:hover {
  background: rgba(255, 255, 255, 0);
}
.profile:hover:before {
  bottom: 0%;
  top: auto;
  height: 100%;
}
.logout {
  cursor: pointer;
  font-weight: 700;
  padding: 5px 10px;
  border: 1px solid;
  border-image: linear-gradient(180deg, #ff3000, #ed0200, #ff096c, #d50082);
  border-image-slice: 1;
  text-transform: uppercase;
  background-color: #1e272e;
  color: white !important;
}
</style>
