<template>
  <div></div>
</template>

<script>
import { activation } from "@/apiUsers.js";
export default {
  name: "Activation",
  props: {
    uid: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  created() {
    this.sendActivation(this.uid, this.token);
  },
  methods: {
    async sendActivation(currentUID, currentToken) {
      await activation(currentUID, currentToken).then(() => {
        this.$router.push({ path: "/" });
      });
    },
  },
};
</script>

<style scoped></style>
