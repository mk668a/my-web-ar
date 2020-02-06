<template>
  <div id="sideMenu">
    <div id="menu">
      <a @click="toRoute('/create')">作成する</a>
      <a @click="toRoute('/list')">リスト</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toRoute: Function
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
    display: none;
  }
}
</style>

