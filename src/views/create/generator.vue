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
        <div>枠のサイズ</div>
        <input type="range" v-model="magni" step="0.01" min="0.1" max="0.9" />
        {{magni}}
      </div>

      <div class="frame-color">
        <div>枠の色</div>
        <input type="color" v-model="frameColor" />
      </div>

      <div class="marker-img">
        <div>マーカーの画像</div>
        <label for="file_upload">
          ファイルを選択して下さい
          <input
            type="file"
            name="marker-img"
            id="file_upload"
            accept="image/*"
            @change="uploadImg"
          />
        </label>
        <div v-if="error">対応していない形式のファイルです</div>
      </div>

      <div class="buttons">
        <div>マーカーのダウンロード</div>
        <button @click="getPatt">マーカー形式(patt)でダウンロード</button>
        <button @click="getPng">png形式でダウンロード</button>
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
      fullMarkerURL: null,
      pngData: null
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
      const self = this;

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
        self.fullMarkerURL = patternFileString;
      });

      return this.fullMarkerURL;
    },
    getPatt() {
      var patternFileString = this.toPatt();

      var THREEx = three.THREEx;
      THREEx.ArPatternFile.triggerDownload(
        patternFileString,
        "pattern-marker.patt"
      );
    },
    getPng() {
      const self = this;
      this.toPng();

      window.setTimeout(function() {
        self.downloadImage(self.pngData);
      }, 1000);
    },
    setPng(data) {
      this.pngData = data;
    },
    // html2canvas実行
    toPng() {
      const self = this;

      html2canvas(document.getElementById("marker-frame"), {
        allowTaint: true
      }).then(canvas => {
        self.setPng(canvas.toDataURL());
      });

      return this.pngData;
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
    },
    getMarker() {
      const self = this;
      // debugger
      if (self.innerImageURL === null) {
        alert("画像をアップロードしてください");
        return;
      }
      // tech from https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
      var domElement = window.document.createElement("a");
      if (!this.fullMarkerURL) {
        domElement.href = this.toPatt();
      } else {
        domElement.href = this.fullMarkerURL;
      }
      // set fileName
      domElement.download = "pattern-marker.png";

      document.body.appendChild(domElement);

      // クリックイベントでダウンロード
      // domElement.click();
      //
      // console.log("getMarker");

      document.body.removeChild(domElement);

      return domElement.getAttribute("href");
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

  .params {
    margin-left: 10px;

    .marker-img {
      label {
        cursor: pointer;
        width: 140px;
        height: 40px;
        border: 2px solid #cfcfcf;
        border-radius: 5px;
        font: 400 11px system-ui;
        padding: 0.5rem;

        input {
          display: none;
        }
      }
    }

    input,
    button {
      cursor: pointer;
    }

    & > div {
      margin: 10px;

      button {
        &:nth-of-type(1) {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>