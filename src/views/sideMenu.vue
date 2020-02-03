<template>
  <div id="sideMenu">
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
#sideMenu {
  #menu {
    width: 20vw;
    height: 100%;
    background: #f8f8f8;

    a {
      cursor: pointer;
      width: auto;
      margin: 0;
      padding: 15px 10px;
      display: block;
      font-size: 1rem;
      color: #646464;

      &:hover {
        background: #e9e9e9;
        transition: 0.3s;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  #sideMenu {
    #menu {
      background: transparent;
      position: absolute;
      width: auto;
      height: auto;
      right: -100px;
      top: 90px;

      &.active {
        right: 16px;

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

      a {
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
    transform: translateX(-100px);
  }

  to {
    opacity: 0;
    transform: translateX(0px);
  }
}
</style>

