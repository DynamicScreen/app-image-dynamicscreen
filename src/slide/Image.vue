<template>
    <div class="container">
      <div>
        <p class="a">{{ trans('app.name') }}</p>
        <p class="b">{{ trans('modules.image.description') }}</p>
        <div class="slide-content center vertical-center-wrapper flex-column">
          <div class="image-container" :style="{ backgroundImage: urlBg, backgroundColor: slide.data.color }"></div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">

// import {IPublicSlide} from "../../../../../../../dynamicscreen-sdk-js/dist";

interface ISlideContext extends BaseContext {
  guardManager: IGuardsManager;
  slide: IPublicSlide;
  onReady(callback: () => Promise<void>): void
  onPrepare(callback: () => Promise<void>): void
  onPlay(callback: () => Promise<void>): void
  onReplay(callback: () => Promise<void>): void
  onEnded(callback: () => Promise<void>): void
}

import {defineComponent, computed, onMounted, PropType, reactive, getCurrentInstance, ref} from "vue";
import i18next from "i18next";
import { ISlide, IAssetsStorageAbility, IGuardsManager, BaseContext, IPublicSlide } from "dynamicscreen-sdk-js";
const en = require("../../languages/en.json");
const fr = require("../../languages/fr.json");

//@ts-ignore
const useCurrentInstance = () => {
  const vm = getCurrentInstance();
  console.log('hello from ', vm)
}
    export default defineComponent({
      name: "Image",
      props: { context: {type: Object as PropType<ISlideContext>, required: true},
        currentInstance:  {type: Object as any, required: true},
        mount: {type: Object as any, required: true}
      },
      setup(props, ctx) {
        console.log('IN SETUP FUNCTION', ctx)
        //@ts-ignore
        console.log('GET INSTANCE', currentInstance(), useCurrentInstance(), getCurrentInstance())

        let slide = reactive(props.context.slide) as IPublicSlide;
        const url = ref("");
        const urlBg = computed(() => 'url(\'' + url.value + '\')')

        try {
          console.log('before registering onmounted')

          onMounted(props.mount);
          console.log(';after registering onmounted')

          // onActivated(() => {
          //   console.log ("onActivated", getCurrentInstance())
          // });
          //
          // onRenderTracked(() => {
          //   console.log ("onRenderTracked", getCurrentInstance())
          // });
          //
          // onErrorCaptured(() => {
          //   console.log ("onErrorCaptured", getCurrentInstance())
          // });
        } catch (e) {
          console.log('error catched', e);
        }


        setTimeout(() => {
          console.log('GET INSTANCE TIMEOUT 5sec', getCurrentInstance())
          console.log('Timeout 5sec')

        }, 5000);

        props.context.onPrepare(async () => {
          console.log('IN ON PREPARE')
          // const guard = props.context.guardManager.add('prepare', props.context.slide.id);

          setTimeout(() => {
            console.log('Timeout exceeded in OnPrepare()')
          }, 10000);



          await props.context.assetsStorage().then(async (ability: IAssetsStorageAbility) => {
            console.log('before init I18N')
            initI18n();
            //@ts-ignore
            console.log('before getting displayable asset.')
            console.log('ability: ', ability)
            url.value = await ability.getDisplayableAsset(props.context.slide.data.url).then((asset) => asset.displayableUrl());

            console.log('with ability url OBJECT = ', url.value);

            setTimeout(() => {
              console.log('Timeout exceeded in OnPrepare()')
            }, 10000);

          });

          console.log('BONNE VALEUR ?', url.value)


          // guard.remove();

          return
        });




        props.context.onReplay(async () => {
          console.log('onReplay')

          setTimeout(() => {
            console.log('Timeout exceeded in OnReplay()')
          }, 6000);


          return ;
        });

        props.context.onPlay(async () => {
          console.log('onPlay')

          // const guard = context.guardManager.add('ready', context.slide.id);

          setTimeout(() => {
            console.log('Timeout exceeded in OnPlay()')
          }, 5000);

          // guard.remove();

          return ;
        });

        props.context.onEnded(async () => {
          console.log('onEnded')

          // const guard = props.context.guardManager.add('ended', props.context.slide.id);

          setTimeout(() => {
            console.log('Timeout exceeded in onEnded()')
            // guard.remove();

          }, 3000);


          return ;
        });

        const trans = (key: string) => {
          return i18next.t(key);
        };

        const initI18n = () => {
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

        // console.log("url value = ", url.value);
        console.log("url value = ", url.value);
        setTimeout(() => {
          console.log('Apres 10 secondes...', url.value)
        }, 10000);

        return {
          trans, slide, url, urlBg
        };
      }
    });
</script>

<style>
  .container {
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
    height: 400px;
    flex: 1;
    background: no-repeat center center;
    -webkit-background-size: contain;
    background-size: contain;
  }
</style>

