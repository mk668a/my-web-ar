<template>
  <div id="top">
    <h1>WebAR Generatorとは</h1>
    <p>3DモデルやAR用のマーカーを選び簡単にWebARが作成できます。</p>
    <p>以下のボタンから、WebARを作成、または作成されたWebARを参照することができます。</p>
    <div class="buttons">
      <button @click="toRoute('/create')">作成する</button>
      <button @click="toRoute('/list')">リスト</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toRoute(to) {
      this.$router.push(to);
    }
  }
};
</script>

<style lang="scss">
#top {
  h1 {
    border-bottom: 1px solid #dddddd;
  }

  p {
    color: rgb(75, 75, 75);
  }

  .buttons {
    display: flex;

    button {
      cursor: pointer;
      width: 150px;
      font-weight: bold;
      transition: all ease 0.26s;

      &:hover {
        background: #cfcfcf;
      }

      &:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  #top {
    h1 {
      padding-right: 60px;
    }
  }
}
</style>