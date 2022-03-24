<template>
  <section class="ab-info-main py-md-5 py-4 editContent single">
    <div class="container py-md-4">
      <div class="d-flex">
        <div class="left-ads-display col-lg-10">
          <div class="d-flex justify-content-center">
            <div v-if="showInfo" class="desc1-right col-md-11 pl-lg-4">
              <div class="d-flex">
                <img :src="user.avatar" class="mr-3 img-fluid" alt="" />
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
              <ul class="pl-3 pt-3">
                <li class="li-user">
                  <span class="span-user">День рождения:</span>
                  {{ new Date(user.birth_date).toDateString() }}
                </li>
                <li class="li-user">
                  <span class="span-user">Дата регистрации:</span>
                  {{ new Date(user.date_registration).toDateString() }}
                </li>
                <li class="li-user">
                  <span class="span-user">Заходил:</span>
                  {{ new Date(user.last_login).toDateString() }}
                </li>
                <li class="li-user">
                  <span class="span-user">Пол:</span> {{ user.gender }}
                </li>
                <li class="li-user">
                  <span class="span-user">Рейтинг:</span> {{ user.rating }}
                </li>
                <li class="li-user">
                  <span class="span-user">Постов:</span> {{ user.post_count }}
                </li>
                <li class="li-user">
                  <span class="span-user">Комментариев:</span>
                  {{ user.comments_count }}
                </li>
                <li class="li-user">
                  <span class="span-user">Описание:</span>
                  {{ user.description }}
                </li>
              </ul>
            </div>
            <UpdateProfile
              v-if="showUpdate"
              :user="user"
              @back="btnShowInfo"
              @reload_page="loadUser"
            />
            <div v-if="showComments">
              <div
                class="media py-5 comments"
                v-for="comment in comments"
                :key="comment.id"
              >
                <img :src="comment.avatar" class="mr-3 img-fluid" alt="" />
                <div class="media-body mt-4">
                  <div class="d-flex">
                    <a
                      ><h5 class="mt-0 editContent">{{ comment.author }}</h5></a
                    >
                    <span class="pl-2 date-comment">{{
                      new Date(comment.date_create).toDateString()
                    }}</span>
                  </div>
                  <p class="mt-2 editContent">{{ comment.content }}</p>
                  <a @click="goToPost(comment.post_url)"
                    ><span class="editContent source">Источник</span></a
                  >
                  <hr />
                </div>
              </div>
              <div class="container py-md-4">
                <AppPagination
                  :total="totalComments"
                  :page_size="15"
                  @page-changed="loadComments"
                />
              </div>
            </div>
            <div v-if="showArticles">
              <div class="ab-info-main py-md-5 py-4">
                <div class="container py-md-4">
                  <div class="d-flex flex-column align-items-center">
                    <div
                      v-for="article in articles"
                      :key="article.id"
                      class="col-md-10 product-men"
                    >
                      <div class="product-shoe-info editContent mt-lg-4">
                        <div class="item-info-product">
                          <h4 class="">
                            <a @click="goTo(article.id)" class="wrapped">{{
                              article.headline
                            }}</a>
                          </h4>
                          <div class="product_price">
                            <div class="grid-price">
                              <span
                                v-html="article.content"
                                class="content"
                              ></span>
                            </div>
                          </div>
                          <div class="row pt-4">
                            <div class="pl-2">Rating: {{ article.rating }}</div>
                            <div class="pl-2">
                              Views: {{ article.view_count }}
                            </div>
                            <div class="pl-2">
                              Comments: {{ article.comments_count }}
                            </div>
                            <div class="pl-2">
                              Date:
                              {{ new Date(article.date_create).toDateString() }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="container py-md-4">
                    <AppPagination
                      :total="totalArticles"
                      :page_size="page_size"
                      @page-changed="loadArticles"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="btnContainer d-flex flex-column">
            <a v-if="isUserOrAdmin()" class="update" @click="updateProfile()"
              >Редактировать профиль</a
            >
            <br />
            <a @click="btnShowComments()">Комментарии</a>
            <a @click="btnShowArticles()">Статьи</a>
            <a @click="btnShowInfo()">Инфо</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppPagination from "@/components/AppPagination.vue";
import UpdateProfile from "../components/UpdateProfile";
import { api } from "../http";
export default {
  name: "Profile",
  props: ["username"],
  components: { AppPagination, UpdateProfile },
  data() {
    return {
      user: {},
      comments: [],
      totalComments: null,
      articles: [],
      totalArticles: null,
      showInfo: true,
      showArticles: false,
      showComments: false,
      page: 1,
      page_size: 30,
      showUpdate: false,
    };
  },
  created() {
    this.loadUser(this.username);
  },
  methods: {
    async loadUser(username) {
      this.user = await api
        .get(`/users/${username}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    btnShowComments() {
      (this.showInfo = false),
        (this.showArticles = false),
        (this.showUpdate = false),
        (this.showComments = true),
        this.loadComments(this.page);
    },
    btnShowArticles() {
      (this.showInfo = false),
        (this.showArticles = true),
        (this.showUpdate = false),
        (this.showComments = false),
        this.loadArticles(this.page);
    },
    btnShowInfo() {
      (this.showInfo = true),
        (this.showArticles = false),
        (this.showUpdate = false),
        (this.showComments = false);
    },
    async loadComments(pageNumber) {
      this.comments = await api
        .get(`/users/${this.username}/comments?page=${pageNumber}`)
        .then((response) => {
          this.totalComments = response.data.links.count;
          return response.data.results;
        });
    },
    async loadArticles(pageNumber) {
      this.articles = await api
        .get(`/users/${this.username}/articles?page=${pageNumber}`)
        .then((response) => {
          this.totalArticles = response.data.links.count;
          return response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goTo(id) {
      this.$router.push({ name: "Single", params: { id: id } });
    },
    updateProfile() {
      this.showInfo = false;
      this.showUpdate = true;
      (this.showArticles = false), (this.showComments = false);
    },
    isUserOrAdmin() {
      if (
        this.$store.state.role != "admin" &&
        this.$store.state.username != this.user.username
      ) {
        return false;
      }
      return true;
    },
    goToPost(url) {
      this.$router.push({ path: url });
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.loadUser(to.params.username);
    next();
  },
};
</script>

<style scoped>
.single {
  outline: none;
  outline-offset: -2px;
  cursor: inherit;
  color: rgb(33, 37, 41);
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0);
  font-family: Lato, sans-serif;
}
.li-user {
  list-style: none;
}
.span-user {
  font-weight: bold;
}
.btnContainer {
  position: sticky;
  top: 20%;
  cursor: pointer;
}
.editContent {
  padding-left: 3rem;
  padding-right: 3rem;
}
.update {
  font-weight: bold;
}
.source {
  font-style: italic;
  text-decoration: underline;
}
</style>
