<template>
  <CreatePost :isNews="isNews" @send-post="createNews" />
</template>

<script>
import CreatePost from "@/components/posts/CreatePost";
import { sendNews } from "@/apiPosts.js";

export default {
  name: "CreateNews",
  components: { CreatePost },
  data() {
    return {
      isNews: true,
    };
  },
  methods: {
    async createNews(headline, content) {
      const formData = {
        headline: headline,
        content: content,
      };
      await sendNews(formData).then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped></style>
