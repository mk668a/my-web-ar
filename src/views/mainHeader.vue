<template>
  <div id="mainHeader">
    <div class="title" @click="toRoute('/')">
      <div id="logo"></div>
      <h1>WebAR Generator</h1>
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
#mainHeader {
  background: #ef2d5e;
  height: 5vh;

  .title {
    display: flex;
    height: 100%;
    cursor: pointer;

    justify-content: center;
    align-items: center;
    color: white;

    #logo {
      border-left: 3px solid #fff;
      border-right: 3px solid #fff;
      width: 9px;
      height: 50%;
      margin: 0 15px;

      &::before {
        content: "";
        background: #fff;
        width: 3px;
        height: 2.5%;
        position: absolute;
        margin-left: -9px;
      }

      &::after {
        content: "";
        background: #fff;
        width: 3px;
        height: 2.5%;
        position: absolute;
        margin-left: 3px;
      }
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
      color:#fff;
      text-align: center;
      line-height: 1.2rem;
    }
  }
}
</style>