<template>
  <posts-list
    :posts="listNews"
    :countPosts="countNews"
    :countPostsOnPage="countNewsOnPage"
    @go-to-single="goToSingleNews"
    @page-changed="updateListNews"
  />
</template>

<script>
import PostsList from "@/components/posts/PostsList.vue";
import { loadListNews } from "@/apiPosts.js";

export default {
  name: "News",
  components: { PostsList },

  data() {
    return {
      listNews: [],
      countNews: 0,
      countNewsOnPage: 30,
      currentPage: 1,
    };
  },
  created() {
    this.updateListNews(this.currentPage);
  },
  methods: {
    async updateListNews(pageNumber) {
      const exchangeData = await loadListNews(pageNumber);

      this.listNews = exchangeData.results;
      this.countNews = exchangeData.count;
    },
    goToSingleNews(newsId) {
      this.$router.push({ name: "news-single", params: { newsId: newsId } });
    },
  },
};
</script>

<style scoped></style>
