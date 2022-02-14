<template>
  <div class="home">
    <div class="py-md-5 py-4 editContent">
      <div class="container py-md-4 ps-5">
        <div class="row gx-5">
          <div class="col-md-8">
            <div v-for="post in posts" :key="post.id" class="post-item">
              <h4>
                <a @click="$emit('go-to-single', post.id)" class="content">{{
                  post.headline
                }}</a>
              </h4>
              <small v-if="showCategory" class="mark">{{
                post.category
              }}</small>
              <div class="mt-3">
                <span v-html="post.content" class="content"></span>
              </div>
              <div class="d-flex p-2">
                <div class="p-2">Рейтинг: {{ post.rating }}</div>
                <div class="p-2">Просмотров: {{ post.view_count }}</div>
                <div class="p-2">Комментариев: {{ post.comments_count }}</div>
                <div class="p-2">
                  Дата: {{ new Date(post.date_create).toDateString() }}
                </div>
              </div>
              <hr />
            </div>
          </div>
          <div class="col-md-3 py-md-4">
            <posts-side-bar />
          </div>
        </div>
        <app-pagination
          :totalItems="countPosts"
          :pageSize="countPostsOnPage"
          @page-changed="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PostsSideBar from "@/components/posts/PostsSideBar.vue";
import AppPagination from "@/components/AppPagination.vue";
export default {
  name: "PostsList",
  components: { PostsSideBar, AppPagination },
  props: {
    posts: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    countPosts: {
      type: Number,
      required: true,
      default: 1,
    },
    countPostsOnPage: {
      type: Number,
    },
  },
  emits: {
    "go-to-single": null,
    "page-changed": null,
  },
  methods: {
    changePage(pageNumber) {
      this.$emit("page-changed", pageNumber);
    },
  },
  computed: {
    showCategory() {
      return "category" in this.posts[0] ? true : false;
    },
  },
};
</script>

<style scoped>
.editContent {
  padding-left: 3rem;
  padding-right: 3rem;
}
.content {
  word-wrap: break-word;
}
</style>
