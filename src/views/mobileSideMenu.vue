<template>
  <div id="mobileSideMenu">
    <menu-button :isOpen="isOpen" :openMenu="openMenu"></menu-button>
    <div id="menu" v-bind:class="{ active: isOpen }">
      <a @click="toRoute('/create')">作成する</a>
      <a @click="toRoute('/list')">リスト</a>
    </div>
  </div>
</template>

<script>
import menuButton from "@/views/menuButton.vue";

export default {
  data() {
    return {
      isOpen: false
    };
  },
  components: {
    menuButton
  },
  methods: {
    openMenu() {
      this.isOpen = !this.isOpen;
      console.log(this.isOpen);
    },
    toRoute(to) {
      this.isOpen = !this.isOpen;
      this.$router.push(to);
    }
  }
};
</script>

<style lang="scss">
#mobileSideMenu {
  display: none;
}

@media screen and (max-width: 768px) {
  #mobileSideMenu {
    display: block;
    position: absolute;
    width: 150px;
    right: 10px;
    top: 0;
    overflow: hidden;
    z-index: 10000;

    #menu {
      display: flex;
      height: 200px;
      width: 150px;
      flex-direction: column;
      position: relative;
      top: 92.5px;
      left: 160px;

      a {
        display: block;
        padding: 5px;
        border-radius: 10px;
        background: #ef2d5e;
        border: 1px solid #ef2d5e;
        color: #fff;
        text-align: center;
        margin: 2.5px 0;

        &:hover {
          background: #fff;
          color: #ef2d5e;
          transition: 0.3s;
        }
      }

      a:nth-of-type(1) {
        animation-name: slideInLeft;
        animation-duration: 0.4s;
        animation-timing-function: ease;
      }

      a:nth-of-type(2) {
        animation-name: slideInLeft;
        animation-duration: 0.5s;
        animation-timing-function: ease;
      }

      &.active {
        left: 0;

        a:nth-of-type(1) {
          animation-name: slideInRight;
          animation-duration: 0.4s;
          animation-timing-function: ease;
        }

        a:nth-of-type(2) {
          animation-name: slideInRight;
          animation-duration: 0.5s;
          animation-timing-function: ease;
        }
      }
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(150px);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 1;
      transform: translateX(-150px);
    }

    to {
      opacity: 0;
      transform: translateX(0px);
    }
  }
}
</style>

