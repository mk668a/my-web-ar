<template>
  <div id="menu-button">
    <a class="menu-trigger" href="#" @click="openMenu" v-bind:class="{ active: isOpen }">
      <span></span>
      <span></span>
      <span></span>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    openMenu() {
      this.isOpen = !this.isOpen;
      console.log(this.isOpen);
    }
  }
};
</script>

<style lang="scss">
#menu-button {
  display: none;
}

@media screen and (max-width: 768px) {
  #menu-button {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 40px;
    right: 2.5vw;
    padding: 10px 4px 4px 4px;
    width: 50px;
    height: 50px;
    border-radius: 1000px;
    background: #ef2d5e;
    box-shadow: 5px 5px 15px -10px;

    .menu-trigger {
      display: inline-block;
      transition: all 0.4s;
      box-sizing: border-box;
      position: relative;
      width: 25px;
      height: 22px;
      margin: 4px 8px;

      span {
        display: inline-block;
        transition: all 0.4s;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #fff;
        border-radius: 2px;

        &:nth-of-type(1) {
          top: 0;
          -webkit-animation: menu-bar01 0.75s forwards;
          animation: menu-bar01 0.75s forwards;
        }

        &:nth-of-type(2) {
          top: 10px;
        }

        &:nth-of-type(3) {
          bottom: 0;
        }
      }
    }
    @-webkit-keyframes menu-bar01 {
      0% {
        -webkit-transform: translateY(10px) rotate(45deg);
      }
      50% {
        -webkit-transform: translateY(10px) rotate(0);
      }
      100% {
        -webkit-transform: translateY(0) rotate(0);
      }
    }
    @keyframes menu-bar01 {
      0% {
        transform: translateY(10px) rotate(45deg);
      }
      50% {
        transform: translateY(10px) rotate(0);
      }
      100% {
        transform: translateY(0) rotate(0);
      }
    }
    .menu-trigger span:nth-of-type(2) {
      transition: all 0.25s 0.25s;
      opacity: 1;
    }
    .menu-trigger span:nth-of-type(3) {
      -webkit-animation: menu-bar02 0.75s forwards;
      animation: menu-bar02 0.75s forwards;
    }
    @-webkit-keyframes menu-bar02 {
      0% {
        -webkit-transform: translateY(-10px) rotate(-45deg);
      }
      50% {
        -webkit-transform: translateY(-10px) rotate(0);
      }
      100% {
        -webkit-transform: translateY(0) rotate(0);
      }
    }
    @keyframes menu-bar02 {
      0% {
        transform: translateY(-10px) rotate(-45deg);
      }
      50% {
        transform: translateY(-10px) rotate(0);
      }
      100% {
        transform: translateY(0) rotate(0);
      }
    }
    .menu-trigger.active span:nth-of-type(1) {
      -webkit-animation: active-menu-bar01 0.75s forwards;
      animation: active-menu-bar01 0.75s forwards;
    }
    @-webkit-keyframes active-menu-bar01 {
      0% {
        -webkit-transform: translateY(0) rotate(0);
      }
      50% {
        -webkit-transform: translateY(10px) rotate(0);
      }
      100% {
        -webkit-transform: translateY(10px) rotate(45deg);
      }
    }
    @keyframes active-menu-bar01 {
      0% {
        transform: translateY(0) rotate(0);
      }
      50% {
        transform: translateY(10px) rotate(0);
      }
      100% {
        transform: translateY(10px) rotate(45deg);
      }
    }
    .menu-trigger.active span:nth-of-type(2) {
      opacity: 0;
    }
    .menu-trigger.active span:nth-of-type(3) {
      -webkit-animation: active-menu-bar03 0.75s forwards;
      animation: active-menu-bar03 0.75s forwards;
    }
    @-webkit-keyframes active-menu-bar03 {
      0% {
        -webkit-transform: translateY(0) rotate(0);
      }
      50% {
        -webkit-transform: translateY(-10px) rotate(0);
      }
      100% {
        -webkit-transform: translateY(-10px) rotate(-45deg);
      }
    }
    @keyframes active-menu-bar03 {
      0% {
        transform: translateY(0) rotate(0);
      }
      50% {
        transform: translateY(-10px) rotate(0);
      }
      100% {
        transform: translateY(-10px) rotate(-45deg);
      }
    }
  }
}
</style>

