<template>
  <div class="marker-training">
    <div class="marker-frame" :style="{background: frameColor}">
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
        <div v-if="error">画像でない</div>
      </div>
    </div>

    <button @click="toPatt">toPatt</button>
  </div>
</template>

<script>
import firebase from "firebase";
import three from "./threex-arpatternfile";

export default {
  data() {
    return {
      markerWidth: 300,
      markerHeight: 300,
      magni: 0.5,
      frameColor: "#000",
      markerImg: require("@/assets/img/pattern-marker.png"),
      error: false
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