import {
  IAssetsStorageAbility,
  ISlideContext,
  IPublicSlide,
  IAssetDownload,
  SlideModule, VueInstance
} from "dynamicscreen-sdk-js"

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
  async onReady() {
    // const guard = this.context.guardManager.add('ready', this.context.slide.id);
    await this.context.assetsStorage().then(async (ability: IAssetsStorageAbility) => {
      await ability.download(this.context.slide.data.url, (assetDownload: IAssetDownload) => {
          assetDownload.onProgress.subscribe((progress, ev) => {
            ev.unsub();
          });
          assetDownload.onCompleted.subscribe((asset, ev) => {
            ev.unsub();
          });
        });
      });

    // guard.remove();
    return true;
  };

  setup(props: Record<string, any>, vue: VueInstance, context: ISlideContext) {
    const { h, ref, reactive, computed } = vue;
    let slide = reactive(this.context.slide) as IPublicSlide;

    const url = ref("");

    const bgColor = computed(() => {
      // @ts-ignore
      return COLOR_CLASSES[slide.data.color];
    })

    this.context.onPrepare(async () => {
      await this.context.assetsStorage().then(async (ability: IAssetsStorageAbility) => {
        url.value = await ability.getDisplayableAsset(slide.data.url).then((asset) => asset.displayableUrl());
      });
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
          h("div", {
            style: [
              {width: '100%'}, {height: '100%'},
              {position: 'absolute'},
              {textOverflow: 100},
              {overflow: 100},
            ]
          }),
        ]),
      ]),
    ])
  }
}