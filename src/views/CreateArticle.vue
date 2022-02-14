<template>
  <create-post :categorys="categorys" @send-post="createArticle" />
</template>

<script>
import CreatePost from "@/components/posts/CreatePost";
import { sendArticle, loadCategorys } from "@/apiPosts.js";

export default {
  name: "CreateArticle",
  components: { CreatePost },
  data() {
    return {
      categorys: [],
    };
  },
  created() {
    this.setCategorys();
  },
  methods: {
    async createArticle(headline, content, category) {
      const formData = {
        headline: headline,
        category: category,
        content: content,
      };
      await sendArticle(formData).then(() => {
        this.$router.push("/");
      });
    },
    async setCategorys() {
      this.categorys = await loadCategorys();
    },
  },
};
</script>

<style scoped></style>
