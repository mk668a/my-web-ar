<template>
  <div class="marker-training">
    <div class="marker-frame" id="marker-frame" :style="{background: frameColor}">
      <div
        class="marker-img"
        :style="{width: (markerWidth*magni)+'px', height: (markerHeight*magni)+'px'}"
      >
        <img v-if="markerImg" :src="markerImg" />
      </div>
    </div>

    <div class="params">
      <div class="frame-size">
        <input type="range" v-model="magni" step="0.01" min="0.1" max="0.9" />
        {{magni}}
      </div>

      <div class="frame-color">
        <input type="color" v-model="frameColor" />
      </div>

      <div class="marker-img">
        <input type="file" name="marker-img" accept="image/*" @change="uploadImg" />
        <div v-if="error">対応していない形式のファイルです</div>
      </div>

      <div class="buttons">
        <button @click="toPatt">マーカー形式(patt)でダウンロード</button>
        <button @click="toPng">png形式でダウンロード</button>
        <!-- 非表示 -->
        <a id="getImage" href style="display:none;" download="pattern-marker.png"></a>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import three from "./threex-arpatternfile";
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      markerWidth: 300,
      markerHeight: 300,
      magni: 0.5,
      frameColor: "#000",
      markerImg: require("@/assets/img/pattern-marker.png"),
      error: false,
      canvasData: null
    };
  },
  methods: {
    uploadImg(e) {
      e.preventDefault();
      this.markerImg = e.target.files[0];

      if (this.markerImg && this.markerImg.type.match(/^image\/(png|jpeg)$/)) {
        this.markerImg = URL.createObjectURL(this.markerImg);
        this.error = false;
      } else {
        this.error = true;
      }
    },
    toPatt() {
      var THREEx = three.THREEx;
      var innerImageURL = this.markerImg;
      console.log(THREEx);

      if (innerImageURL === null) {
        alert("upload a file first");
        return;
      }
      console.assert(innerImageURL);
      THREEx.ArPatternFile.encodeImageURL(innerImageURL, function onComplete(
        patternFileString
      ) {
        THREEx.ArPatternFile.triggerDownload(
          patternFileString,
          "pattern-" + "marker" + ".patt"
        );
      });
    },
    // html2canvas実行
    toPng() {
      var self = this;
      html2canvas(document.getElementById("marker-frame"), {
        allowTaint: true
      }).then(canvas => {
        self.downloadImage(canvas.toDataURL());
      });
    },
    // 画像のダウンロード
    downloadImage(data) {
      var fname = "pattern-marker.png";
      var encdata = atob(data.replace(/^.*,/, ""));
      var outdata = new Uint8Array(encdata.length);
      for (var i = 0; i < encdata.length; i++) {
        outdata[i] = encdata.charCodeAt(i);
      }
      var blob = new Blob([outdata], ["image/png"]);

      if (window.navigator.msSaveBlob) {
        //IE用
        window.navigator.msSaveOrOpenBlob(blob, fname);
      } else {
        //それ以外
        document.getElementById("getImage").href = data; //base64そのまま設定
        document.getElementById("getImage").download = fname; //ダウンロードファイル名設定
        document.getElementById("getImage").click(); //自動クリック
      }
    }
  }
};
</script>

<style lang="scss">
.marker-training {
  display: flex;

  .marker-frame {
    display: flex;
    width: 300px;
    height: 300px;

    .marker-img {
      margin: auto;
      background: #fff;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>