import {
  BaseContext,
  AssetDownload,
  IAssetsStorageAbility,
  IGuardsManager,
  ISlideContext,
  IPublicSlide,
  SlideModule
} from "dynamicscreen-sdk-js"

import { VNode, ComponentPublicInstance, computed } from 'vue';
import i18next from "i18next";

const en = require("../../languages/en.json");
const fr = require("../../languages/fr.json");

export const COLOR_CLASSES = {
  "green": 'lime-600', // text-lime-600 bg-lime-600 focus:ring-lime-600 border-lime-600
  "cyan": 'teal-400', // text-teal-400 bg-teal-400 focus:ring-teal-400 border-teal-400
  "blue": 'sky-500', // text-sky-500 bg-sky-500 focus:ring-sky-500 border-sky-500
  "blue-gray": 'blueGray-500', // text-blueGray-500 bg-blueGray-500 focus:ring-blueGray-500 border-blueGray-500
  "indigo": 'indigo-700', // text-indigo-700 bg-indigo-700 focus:ring-indigo-700 border-indigo-700
  "purple": 'purple-600', // text-purple-600 bg-purple-600 focus:ring-purple-600 border-purple-600
  "pink": 'pink-500', // text-pink-500 bg-pink-500 focus:ring-pink-500 border-pink-500
  "red": 'red-600', // text-red-600 bg-red-600 focus:ring-red-600 border-red-600
  "orange": 'orange-500', // text-orange-500 bg-orange-500 focus:ring-orange-500 border-orange-500
  "brown": 'yellow-800', // text-yellow-800 bg-yellow-800 focus:ring-yellow-800 border-yellow-800
  "yellow": 'yellow-500', // text-yellow-500 bg-yellow-500 focus:ring-yellow-500 border-yellow-500
  "gray": 'trueGray-400', // text-trueGray-400 bg-trueGray-400 focus:ring-trueGray-400 border-trueGray-400
  "black": 'black'
};

export default class ImageSlideModule extends SlideModule {
  constructor(context: ISlideContext) {
    super(context);
  }

  trans(key: string) {
    return i18next.t(key);
  };

  async onReady() {
    // const guard = this.context.guardManager.add('ready', this.context.slide.id);
    await this.context.assetsStorage().then(async (ability: IAssetsStorageAbility) => {
      await ability.download(this.context.slide.data.url, (assetDownload: AssetDownload) => {
          assetDownload.onProgress.subscribe((progress, ev) => {
            ev.unsub();
          });
          assetDownload.onCompleted.subscribe((asset, ev) => {
            console.log('media: ', asset);
            ev.unsub();
          });
        });
      });

    // guard.remove();
    return true;
  };

  onMounted() {
    console.log('SYNCED')
  }

  onUpdated() {
  }

  initI18n() {
    i18next.init({
      fallbackLng: 'en',
      lng: 'fr',
      resources: {
        en: { translation: en },
        fr: { translation: fr },
      },
      debug: true,
    }, (err, t) => {
      if (err) return console.log('something went wrong loading translations', err);
    });
  };

  // @ts-ignore
  setup(props, ctx) {
    const { h, ref, reactive} = ctx;
    let slide = reactive(props.slide) as IPublicSlide;
    const context = reactive(props.slide.context);

    this.context = context
    const url = ref("");

    const bgColor = computed(() => {
      // @ts-ignore
      return COLOR_CLASSES[slide.data.color];
    })
    
    context.onPrepare(async () => {
      await context.assetsStorage().then(async (ability: IAssetsStorageAbility) => {
        this.initI18n();
        console.log("SLIDE DATA URL", slide.data.url)
        await ability.getDisplayableAsset(slide.data.url).then((asset) => console.log("DISPLAYABLE ASSET",asset.displayableUrl()))
        url.value = await ability.getDisplayableAsset(slide.data.url).then((asset) => asset.displayableUrl());
      });
    });

    context.onReplay(async () => {
    });

    context.onPlay(async () => {
    });

    // context.onPause(async () => {
    //   console.log('Image: onPause')
    // });

    context.onEnded(async () => {
    });

    return () => h("div", {
      class: "container"
    }, [
      h("div", {}, [
        h("div", {
          class: "slide-content center vertical-center-wrapper flex-column"
        }, [
          h("div", {
            class: "image-container bg-cover bg-no-repeat bg-center bg-" + bgColor.value,
            style: [
              { backgroundImage: "url(" + url.value + ")" },
              {width: '100%'}, {height: '100%'},
              {position: 'absolute'},
              {top: 0},
              {left: 0},
            ]
          }),
        ]),
      ]),
    ]) as VNode
  }
}
