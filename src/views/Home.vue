<template>
  <posts-list
    :posts="listArticles"
    :countPosts="countArticles"
    :countPostsOnPage="countArticlesOnPage"
    @go-to-single="goToSingleArticle"
    @page-changed="updateListArticles"
  />
</template>

<script>
import PostsList from "@/components/posts/PostsList.vue";
import { loadListArticles } from "@/apiPosts.js";

export default {
  name: "Home",
  components: { PostsList },
  props: {
    categoryId: {
      type: String,
    },
  },
  data() {
    return {
      listArticles: [],
      countArticles: 0,
      countArticlesOnPage: 30,
      currentPage: 1,
    };
  },
  created() {
    this.updateListArticles(this.currentPage, this.categoryId);
  },
  methods: {
    async updateListArticles(pageNumber, categoryId) {
      const exchangeData = await loadListArticles(pageNumber, categoryId);

      this.listArticles = exchangeData.results;
      this.countArticles = exchangeData.count;
    },
    goToSingleArticle(articleId) {
      this.$router.push({ name: "article", params: { articleId: articleId } });
    },
  },
  beforeRouteUpdate(to) {
    this.currentPage = 1;
    this.updateListArticles(this.currentPage, to.params.categoryId);
  },
};
</script>

<style scoped></style>
