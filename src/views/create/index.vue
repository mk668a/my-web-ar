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
        <!-- <model ref="model"></model> -->
      </div>

      <div class="marker">
        <h3>マーカー</h3>
        <div id="switch">
          <div v-if="original">オリジナルマーカーを使う</div>
          <div v-else>デフォルトマーカーを使う</div>
          <select class="switch" v-model="original" active-color="#13ce66" inactive-color="#ff4949">
            <option :value="false">false</option>
            <option :value="true">true</option>
          </select>
        </div>
        <div id="markerArea">
          <generator v-if="original" ref="generator" @blob="postAr"></generator>
          <img v-else id="hiro" :src="hiro" :alt="hiro" />
        </div>
      </div>
    </div>
    <div class="alert" v-if="titleAlert" title="タイトルを入力してください" type="error" :closable="false"></div>
    <div class="alert" v-if="imgAlert" title="画像をアップロードしてください" type="error" :closable="false"></div>
    <div id="create-buttons">
      <button type="danger" @click="getPattOfPostData">作成</button>
    </div>
  </div>
</template>

<script>
// import model from "@/view/model.vue";
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
    // model,
    generator
  },
  methods: {
    getModel(modelList) {
      return modelList;
    },
    titleChk() {
      if (this.title == "") {
        this.titleAlert = true;
        return true;
      } else {
        this.titleAlert = false;
      }
    },
    imgChk(marker) {
      // this.original == true && 画像がない
      if (this.original == true && marker == this.$store.state.defaultMarker) {
        this.imgAlert = true;
        return true;
      } else {
        this.imgAlert = false;
      }
    },
    getModelListOfPostData() {
      const refs = this.$refs;
      this.modelList = refs.model.createModel();
      console.log(this.modelList);
    },
    getPattOfPostData() {
      if (this.titleChk()) {
        return;
      }

      const refs = this.$refs;
      this.modelList = refs.model.createModel();

      if (this.original == true) {
        console.log(this.$refs.generator);
        refs.generator.getPatt();
      } else {
        this.postAr(null);
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
    postAr(blob) {
      // Get a key for a new Post.
      var newPostKey = firebase
        .database()
        .ref()
        .child("posts")
        .push().key;

      // A post entry.
      var postData = {};
      if (this.original) {
        const refs = this.$refs;
        var marker = refs.generator.getMarker();
        if (this.imgChk(marker)) {
          return;
        }
        console.log("blob by $emit");
        console.log(blob);
        this.uploadPatt(blob, newPostKey);

        postData = {
          title: this.title,
          marker: marker,
          qr: this.createQrCode(newPostKey),
          model: this.modelList,
          original: this.original
        };
      } else {
        postData = {
          title: this.title,
          qr: this.createQrCode(newPostKey),
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
    div {
      margin: 0 auto 15px 0;

      h3 {
        padding: 10px 0 5px 0;
        margin: 0;
      }

      input {
        width: 80%;
      }
    }

    .marker {
      #switch {
        display: flex;
        div {
          font-size: 1rem;
          vertical-align: 0;
          margin-right: 15px;
        }

        .switch {
          margin-left: 0;
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
    margin: 10px 0 50px 0;
  }

  .alert {
    margin: 0 0 10px 0;
  }
}
</style>
