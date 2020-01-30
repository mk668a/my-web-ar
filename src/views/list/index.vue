<template>
  <div id="list">
    <h2>リスト</h2>
    <div v-for="(item, i) in arData" :key="i" :id="'data-'+i" class="list-data">
      <div class="list-title">
        <h3>{{item.title}}</h3>
        <img :src="external" @click="toItem(item.key)" />
      </div>
      <span>
        <div class="list-a-frame"></div>
        <img v-if="item.original" :src="item.marker" id="marker" />
        <img v-else :src="hiro" id="marker" />
        <img :src="item.qr" id="qr" />
      </span>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      deleteAR: undefined,
      arData: [],
      hiro: require("@/assets/img/HIRO.jpg"),
      external: require("@/assets/svg/external-link-symbol.svg")
    };
  },
  watch: {
    arData: function() {
      var self = this;
      setTimeout(function() {
        self.setDom();
      }, 1000);
      this.$nextTick(() => {});
    }
  },
  methods: {
    getArData() {
      var self = this;
      var arData = [];

      return firebase
        .database()
        .ref("/data")
        .once("value")
        .then(function(snapshot) {
          var res = snapshot.val();

          for (let i in res) {
            arData.push({
              key: i,
              title: res[i].title,
              marker: res[i].marker,
              qr: res[i].qr,
              model: res[i].model,
              original: res[i].original
            });

            console.log(arData);
          }

          // 逆順にする
          self.arData = arData.reverse();
        });
    },
    htmlToNode(htmlStr) {
      if (!htmlStr || typeof htmlStr !== "string") return;

      var tmpElmt = document.createElement("div"),
        i = 0,
        len = 0,
        nodes = [];

      // 高速処理するが対応ブラウザを考えinnerHTMLを使用
      tmpElmt.innerHTML = htmlStr; // tmpElmt.insertAdjacentHTML('beforeend', htmlStr);

      return tmpElmt.childNodes;
    },
    // unused
    setDom() {
      console.log("set");

      var arData = this.arData;

      for (let i in arData) {
        var model = arData[i].model;

        // get div
        var div = document.getElementById(`data-${i}`);
        console.log(div);

        // get span
        var span = div.getElementsByTagName("span")[0];
        // console.log(span);
        // get list-a-frame
        var listAFrame = span.getElementsByClassName("list-a-frame")[0];
        // console.log(listAFrame);

        // create a-scene
        // <a-scene embedded></a-scene>;
        var ascene = document.createElement("a-scene");
        ascene.setAttribute("embedded", "");
        ascene.setAttribute("vr-mode-ui", "enabled: false");

        // set model to a-scene
        // <a-scene embedded>
        //   <model></model>
        // </a-scene>;
        for (let j in model) {
          console.log(model[j]);

          var modelChild = this.htmlToNode(model[j]);
          if (modelChild) ascene.appendChild(modelChild[0]);
        }
        // console.log("set model to a-scene");
        // console.log(ascene);

        // set human camera to a-scene
        // <a-scene embedded>
        //   <model></model>
        //   <a-entity camera></a-entity>
        // </a-scene>;
        var camera = document.createElement("a-entity");
        camera.setAttribute("camera", "");
        camera.setAttribute("look-controls", "");
        camera.setAttribute("position", "0 0 4");
        ascene.appendChild(camera);

        // set ascene to list-a-frame
        //     <div class="list-a-frame">
        //       <a-scene embedded>
        //         <model></model>
        //         <a-entity camera></a-entity>
        //       </a-scene>
        //     </div>
        listAFrame.insertBefore(ascene, listAFrame.firstChild);
        console.log(listAFrame);
      }
    },
    //
    toItem(key) {
      window.open(
        `https://web-ar-change-ar-page.firebaseapp.com/?q=${key}`,
        "_blank"
      );
    }
  },
  created() {
    this.getArData();
  }
};
</script>

<style lang="scss">
#list {
  .list-data {
    margin: 0 0 15px 0;
    padding: 0 10px 30px 10px;
    border-bottom: 1px solid #c3c3c3;

    .list-title {
      margin-bottom: 10px;
      display: flex;

      h3 {
        margin: 0;
      }

      img {
        height: 16px;
        margin: auto auto auto 10px;
        cursor: pointer;

        &:hover {
          transform: scale(1.2);
          transition: 0.3s;
        }
      }
    }

    span {
      display: flex;

      * {
        margin: auto;
      }

      .list-a-frame {
        height: 260px;
        width: 260px;
        background: #c3c3c3;
        margin: auto auto auto 0;
      }

      #marker {
        width: 180px;
        margin: auto 0 auto auto;
      }

      #qr {
        width: 240px;
        margin: auto auto auto 0;
      }
    }
  }

  a-scene {
    display: block;
    width: 260px;
    height: 260px;
    background: #c3c3c3;
  }
}
</style>