import {
  BaseContext,
  AssetDownload,
  IAssetsStorageAbility,
  IGuardsManager,
  ISlideContext,
  IPublicSlide,
  SlideModule
} from "dynamicscreen-sdk-js"

import i18next from "i18next";
import {SlideUpdateFunctions} from "../../../../../../../dynamicscreen-sdk-js/src/index";

const en = require("../../languages/en.json");
const fr = require("../../languages/fr.json");



export default class ImageOptionsModule extends SlideModule {
  constructor(context: ISlideContext) {
    super(context);
  }

  trans(key: string) {
    return i18next.t(key);
  };

  async onReady() {
    return true;
  };

  onMounted() {
    console.log('onMounted app-image OPTIONS')
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
  setup(props, ctx, update: SlideUpdateFunctions, OptionsContext) {
    const { h } = ctx;

    const { Field, TextInput, NumberInput, MediaPicker, ColorPicker } = OptionsContext.components

    return () => [
        h(Field, { label: "Image(s) à afficher" }, [
          h(MediaPicker, { ...update.option('image-medias') })
        ]),
        h(Field, { label: "Couleur" }, [
          h(ColorPicker, { ...update.option("color") })
        ]),
        h(Field, { label: "Légende" }, [
          h(TextInput, { ...update.option("caption") })
        ]),
        h(Field, { label: "Margin" }, [
          h(NumberInput, { ...update.option("margin") })
        ])
      ]
  }
}
