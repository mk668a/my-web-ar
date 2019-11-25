<template>
  <div>
    <mainHeader :toRoute="toRoute"></mainHeader>
    <div id="main">
      <sideMenu :toRoute="toRoute"></sideMenu>
      <div class="container">
        <router-view />
      </div>
    </div>
    <mainFooter></mainFooter>
  </div>
</template>

<script>
import mainHeader from "@/views/mainHeader.vue";
import sideMenu from "@/views/sideMenu.vue";
import mainFooter from "@/views/mainFooter.vue";

export default {
  components: {
    mainHeader,
    sideMenu,
    mainFooter
  },
  methods: {
    toRoute(to) {
      this.$router.push(to);
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:300&display=swap");
$fonts: Fira Sans, Helvetica, Arial, sans-serif;

body {
  margin: 0;
  font: $fonts;

  a,
  a:visited {
    text-decoration: none;
    color: inherit;
  }

  & > div {
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    #main {
      height: 92vh;
      display: flex;

      .container {
        display: flex;
        width: 87vw;
        padding: 0 2.5vw;
        overflow: scroll;

        & > div {
          width: 100%;
          height: 100%;
        }

        h2 {
          border-bottom: 1px solid #dddddd;
        }
      }
    }
  }
}
</style>