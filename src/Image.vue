<template>
    <div class="container" v-if="url">
        <div class="slide-content center vertical-center-wrapper flex-column">
          <div class="image-container" :class="{ marginImg: hasMargins}" :style="{ backgroundImage: 'url(\'' + url + '\')', backgroundColor: slide.data.color}"></div>
          <p class="caption" v-if="slide.data.caption" :style="{ backgroundColor: slide.data.color, color: slide.data.caption_color}">{{ slide.data.caption }}</p>
          <p class="caption">{{ trans('app.description') }}</p>
        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";
  import i18next from "i18next";
  import en from "./../languages/en.json";
  import fr from "./../languages/fr.json";

    export default defineComponent({
      name: "Image",
        props: { context: {type: Object} },
        data() {
            return {
                url: null,
            }
        },
        mounted() {
          this.initI18n();
            this.initMedia();
        },
        activated() {
            this.initMedia();
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
          initI18n() {
            i18next.init({
              fallbackLng: 'en',
              lng: 'fr',
              resources: {
                en: { translation: en },
                fr: { translation: fr },
              },
              debug: true,
              ns: {
                namespaces: ['translation'],
                defaultNs: 'translation'
              }
            }, (err, t) => {
              if (err) return console.log('something went wrong loading translations', err);
            });
          },
          trans(key) {
            return i18next.t(key);
          },
            initMedia() {
                this.url = this.media.url;
            },
        },
    })
</script>

<style scoped>
  .container {
    background: white;
    height: 100%;
    width: 100%;
  }

  .slide-content {
    height: 100%;
    width: 100%;
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
    width: 100%;
    height: 100%;
    flex: 1;
    background: no-repeat center center;
    -webkit-background-size: contain;
    background-size: contain;
  }
</style>
