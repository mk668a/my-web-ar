<template>
  <div id="model">
    <a-scene embedded id="createdScene" vr-mode-ui="enabled: false">
      <a-text :value="text" :color="fontColor" position="0 1 0" :rotation="rotation"></a-text>
      <a-box
        :position="position.x+' '+position.y+' '+position.z"
        :color="color"
        :rotation="rotation"
        :width="width"
        :height="height"
      ></a-box>
      <a-entity id="camera" camera look-controls position="0 0 4"></a-entity>
    </a-scene>
    <div id="setParams">
      <span>
        <label for="model">色</label>
        <input type="color" id="model-color" name="model-color" value="color" v-model="color" />
      </span>
      <span>
        <label for="model">縦</label>
        <input type="range" id="model-depth" name="model-depth" value="depth" v-model="depth" />
        {{depth}}
      </span>
      <span>
        <label for="model">横</label>
        <input type="range" id="model-width" name="model-width" value="width" v-model="width" />
        {{width}}
      </span>
      <span>
        <label for="model">高さ</label>
        <input type="range" id="model-height" name="model-height" value="height" v-model="height" />
        {{height}}
      </span>
      <!-- <span>
        <label for="model">形</label>
        <el-select name="shape" v-model="shape">
          <el-option value="a-box">BOX</el-option>
        </el-select>
      </span>-->
      <span>
        <label for="model">文字色</label>
        <input
          type="color"
          id="model-fontColor"
          name="model-fontColor"
          value="fontColor"
          v-model="fontColor"
        />
      </span>
      <span>
        <label for="model">テキスト</label>
        <input type="text" id="model-text" name="model-text" value="text" v-model="text" />
      </span>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      color: "#e66465",
      fontColor: "#2B39CC",
      text: "Hello, World!",
      shape: "a-box",
      rotation: "0 0 0",
      depth: 1,
      width: 1,
      height: 1,
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      camera_length: 4,
      camera_theata: 0
    };
  },
  methods: {
    createModel() {
      var createdModel = document.getElementById("model");

      var modelList = [];

      if (createdModel) {
        var model = createdModel.childNodes;
        var ascene = model[0];
        var asceneChild = ascene.childNodes;

        for (var i in asceneChild) {
          var Node_i = asceneChild[i];
          var nodeName = Node_i.nodeName;
          if (
            asceneChild[i].nodeName &&
            nodeName.slice(0, 2) == "A-" &&
            nodeName != "A-ENTITY"
          ) {
            // プリミティブなHTMLに存在しないAttributeの値を設定

            for (var j in Node_i.attributes) {
              // console.log(Node_i.attributes[j]);

              // Attribute名を取得
              var attributeName = Node_i.attributes[j].localName;
              // material, geometry以外のAttributeを設定
              if (attributeName != "material" && attributeName != "geometry") {
                // Attributeの値を取得
                var attribute = Node_i.getAttribute(attributeName);

                if (attribute) {
                  // console.log("attribute");
                  // console.log(attribute);

                  var nodeValue = "";

                  if (typeof attribute == "string") {
                    nodeValue = attribute;
                  } else {
                    var keys = Object.keys(attribute);
                    for (var k in keys) {
                      var name = keys[k];
                      var value = attribute[keys[k]];
                      if (typeof value != "object") {
                        nodeValue += `${value} `;
                        // nodeValue += `${name}: ${value}; `;
                      }
                    }
                  }
                  // Attributeの値をセットする
                  Node_i.attributes[j].nodeValue = nodeValue;
                }
              }
            }
            modelList.push(Node_i.outerHTML);
          }
        }
      }
      // modelList = modelList.join("");
      return modelList;
    },
    rotate() {
      this.camera_theata++;
      $("#camera").attr(
        "position",
        this.camera_length * Math.sin((this.camera_theata * Math.PI) / 180) +
          " 0 " +
          this.camera_length * Math.cos((this.camera_theata * Math.PI) / 180)
      );
      $("#camera").attr("rotation", "0 " + this.camera_theata + " 0");
    }
  },
  mounted() {
    let camera_length = 4;
    let camera_theata = 0;

    setInterval(this.rotate, 10);
  }
};
</script>

<style lang="scss">
// @import "../assets/style/vr.scss";
#model {
  display: flex;

  #createdScene {
    pointer-events: none;
  }

  #setParams {
    margin: 10px !important;
    display: block;
    width: 50%;

    span {
      display: block;
      width: 100%;

      label {
        display: block;
      }
    }
  }
}
</style>
