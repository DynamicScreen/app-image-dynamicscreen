import {
  ISlideOptionsContext,
  SlideOptionsModule,
  VueInstance,
} from "dynamicscreen-sdk-js"

export default class ImageOptionsModule extends SlideOptionsModule {
  async onReady() {
    return true;
  };

  setup(props: Record<string, any>, vue: VueInstance, context: ISlideOptionsContext) {
    const { h } = vue;

    const update = context.update;
    const { Field, TextInput, NumberInput, MediaPicker, ColorPicker} = context.components;

    return () => [
        h(Field, { label: this.t('modules.image.options.media-picker.label') }, [
          h(MediaPicker, { type: 'image', ...update.option('image-medias') })
        ]),
        h(Field, { label: this.t('modules.image.options.color') }, [
          h(ColorPicker, { ...update.option("color") })
        ]),
        h(Field, { label: this.t('modules.image.options.caption') }, [
          h(TextInput, { ...update.option("caption") })
        ]),
        h(Field, { label: this.t('modules.image.options.margin') }, [
          h(NumberInput, { ...update.option("margin") })
        ]),
      ]
  }
}
