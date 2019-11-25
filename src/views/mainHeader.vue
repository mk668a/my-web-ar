<template>
  <div id="mainHeader">
    <div class="title" @click="toRoute('/')">
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
  background: #000;
  height: 5vh;

  .title {
    display: flex;
    height: 100%;
    cursor: pointer;

    justify-content: center;
    align-items: center;
    color: white;

    h1 {
      margin: 0;
      font-size: 1.5rem;
      text-align: center;
      line-height: 1.2rem;
    }
  }
}
</style>