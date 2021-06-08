<template>
    <div class="container" v-if="url">
        <slide-title v-if="slide.show_title" :slide="slide"></slide-title>
        <div class="slide-content center vertical-center-wrapper flex-column">
<!--          <div class="image-container" :class="{ marginImg: hasMargins}" :style="{ backgroundImage: 'url(\'' + url + '\')', backgroundColor: slide.data.color}"></div>-->
          <div class="image-container" :class="{ marginImg: hasMargins}" :style="{ backgroundImage: 'url(\'' + url + '\')', backgroundColor: slide.data.color}"></div>
            <p class="caption" v-if="slide.data.caption" :style="{ backgroundColor: slide.data.color, color: slide.data.caption_color}">{{ slide.data.caption }}</p>
        </div>
    </div>
</template>

<script>
    // import {instDatabase} from "database";
    // import {instMediaManager} from "mediaManager";
    // import {CHROME_APP} from "../js/helpers"
    // import {findMedias} from "utils/functions";

    export default {
        props: { context: {type: Object} },
        data() {
            return {
                url: null,
                db: null,
                imgHTML: ""
            }
        },
        mounted() {
            this.initMedia();
        },
        activated() {
            this.initMedia();
        },
        deactivated() {
            //URL.revokeObjectURL(this.url);
        },
        computed: {
            slide() {
              return this.context.slide;
            },
            hasMargins() {
                return this.slide.data.margin === "1"
            },
            media() {
                return this.slide.data.media
            },
        },
        methods: {
            initMedia() {
                // if (!this.media.cachedUrl) {
                //     this.loadAsset(this.media.id);
                // } else {
                //     instMediaManager.lastUseMediaUpdating(this.media.id)
                // }
                this.url = this.media.url;
            },
            // loadAsset(id) {
            //     window.$host.retrieveAsset(id).then((media) => {
            //             this.media.cachedUrl = media.blob
            //             this.url = media.blob
            //             instMediaManager.lastUseMediaUpdating(media.data.mediaId)
            //     }).catch((err) => {
            //         window.$logger.log("Slides Essentials: Image: Can\'t retrieve asset: " + err, false)
            //     });
            // },
        },
    }
</script>

<style scoped>
  .container {
    background: white;
  }
  .center {
    text-align: center;
  }

  .caption {
    margin: 0;
    padding: 1em .5em;
    font-size: 1em;
    font-weight: 300;
  }

  .marginImg {
    margin: 0.7em;
  }

  .image-container {
    flex: 1;
    background: no-repeat center center;
    -webkit-background-size: contain;
    background-size: contain;
  }
</style>
