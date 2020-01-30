<template>
  <div id="create">
    <h2>作成する</h2>
    <div id="params">
      <div class="title">
        <h3>タイトル</h3>
        <input placeholder="タイトル" v-model="title" />
      </div>
      <div id="createdModel">
        <h3>モデル</h3>
        <model ref="model"></model>
      </div>

      <div class="marker">
        <h3>マーカー</h3>
        <div id="switch">
          <select class="switch" v-model="original" active-color="#13ce66" inactive-color="#ff4949">
            <option :value="false">デフォルトマーカーを使う</option>
            <option :value="true">オリジナルマーカーを使う</option>
          </select>
        </div>
        <div id="markerArea">
          <generator v-if="original" ref="generator"></generator>
          <!-- <generator v-if="original" ref="generator" @blob="postAr"></generator> -->
          <img v-else id="hiro" :src="hiro" :alt="hiro" />
        </div>
      </div>
    </div>
    <div class="alert" v-if="titleAlert">タイトルを入力してください</div>
    <div class="alert" v-if="imgAlert">画像をアップロードしてください</div>
    <div id="create-buttons">
      <button type="danger" @click="postAr">作成</button>
    </div>
  </div>
</template>

<script>
import model from "@/views/create/model.vue";
import generator from "@/views/create/generator.vue";
import firebase from "firebase";

export default {
  data() {
    return {
      title: "",
      models: [],
      modelList: [],
      original: false,
      hiro: require("@/assets/img/HIRO.jpg"),
      titleAlert: false,
      imgAlert: false,
      pattUrl: ""
    };
  },
  components: {
    model,
    generator
  },
  methods: {
    getModel(modelList) {
      return modelList;
    },
    titleChk() {
      if (this.title == "") {
        this.titleAlert = true;
        // console.log(this.titleAlert, "titleChk: ", this.title);
        return true;
      } else {
        this.titleAlert = false;
        // console.log(this.titleAlert, "titleChk: ", this.title);
        return false;
      }
    },
    imgChk(marker) {
      // this.original == true && 画像がない

      if (marker == this.$store.state.defaultMarker || marker == "null") {
        this.imgAlert = true;
        return true;
      } else {
        this.imgAlert = false;
      }
    },
    // getModelListOfPostData() {
    //   const refs = this.$refs;
    //   this.modelList = refs.model.createModel();
    // },
    getPattOfPostData() {
      if (this.original == true) {
        // pattファイルを取得
        const refs = this.$refs;
        console.log(refs.generator);
        refs.generator.getPatt();
      } else {
        // this.postAr(null);
      }
    },
    createQrCode(key) {
      return `https://chart.apis.google.com/chart?chs=300x300&cht=qr&chl=https://web-ar-change-ar-page.firebaseapp.com/?q=${key}`;
    },
    NodeToHtml(node) {
      if (!node || !Array.isArray(node)) return;

      var tmpElmt = document.createElement("div");
      var i = 0;
      var len = 0;
      var nodes = [];

      // 高速処理するが対応ブラウザを考えinnerHTMLを使用
      // tmpElmt.innerHTML = htmlStr;
      // tmpElmt.insertAdjacentHTML('beforeend', htmlStr);

      return tmpElmt.childNodes;
    },
    uploadPatt(blob, fileName) {
      // Create a root reference
      var storageRef = firebase.storage().ref();

      // Create a reference to 'images/mountains.jpg'
      var mountainImagesRef = storageRef.child(`patt/${fileName}.patt`);

      if (blob) {
        console.log("file");
        console.log(blob);

        mountainImagesRef.put(blob).then(function(snapshot) {
          console.log("Uploaded a blob");
          console.log(snapshot);
        });
      }
    },
    postAr() {
      const refs = this.$refs;
      console.log(refs);

      // アップロード項目が揃っているか確認作業
      console.log("push");
      // * title
      if (this.titleChk()) {
        return;
      }
      console.log("title", this.title);
      // * model
      this.modelList = refs.model.createModel();
      console.log("model", this.modelList);

      // Get a key for a new Post.
      var newPostKey = firebase
        .database()
        .ref()
        .child("posts")
        .push().key;

      // * qr
      var QR = this.createQrCode(newPostKey);

      // A post entry.
      var postData = {};
      // * original
      if (this.original) {
        const refs = this.$refs;

        // * marker
        var marker = refs.generator.toPng();
        console.log("marker", marker);

        if (this.imgChk(marker)) {
          return;
        }
        // console.log("blob by $emit");
        // console.log(blob);
        // this.uploadPatt(blob, newPostKey);
        postData = {
          title: this.title,
          marker: marker,
          qr: QR,
          model: this.modelList,
          original: this.original
        };
      } else {
        postData = {
          title: this.title,
          qr: QR,
          model: this.modelList,
          original: this.original
        };
      }

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates["/data/" + newPostKey] = postData;

      console.log("post:", postData);

      this.$router.push("/list");
      return firebase
        .database()
        .ref()
        .update(updates);
    }
  }
};
</script>

<style lang="scss">
#create {
  #params {
    width: 100%;
    & > div {
      margin: 0 auto 15px 0;

      & > h3 {
        padding: 10px 0 5px 0;
        margin: 0;
      }

      & > input {
        width: 80%;
      }
    }

    .marker {
      #switch {
        display: flex;
        margin-bottom: 10px;

        p {
          font-size: 1rem;
          vertical-align: 0;
          margin-right: 15px;
        }

        .switch {
          cursor: pointer;
          margin: auto auto auto 0;
        }
      }

      #markerArea {
        #hiro {
          max-height: 300px;
        }
      }
    }
  }

  a-scene {
    display: block;
    width: 300px;
    height: 300px;
    background: #c3c3c3;
  }

  #create-buttons {
    text-align: center;
    margin: 25px 0 50px 0;

    button {
      width: 150px;
      cursor: pointer;
      font-weight: bold;
      color: rgb(255, 64, 64);
      border: 2px solid rgb(255, 64, 64);
      transition: all ease 0.26s;

      &:hover {
        background: rgb(255, 64, 64);
        color: #fff;
        transition: all ease 0.26s;
      }
    }
  }

  .alert {
    margin: 0 0 10px 0;
    color: rgb(255, 88, 88);
  }
}
</style>
