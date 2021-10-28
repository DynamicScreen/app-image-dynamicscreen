import {
    BaseContext,
    AssetDownload,
    IAssetsStorageAbility,
    IGuardsManager,
    ISlideContext,
    IPublicSlide,
    SlideModule
} from "dynamicscreen-sdk-js"

import { VNode, ComponentPublicInstance } from 'vue';
import i18next from "i18next";

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
        console.log('SYNCED OU PASsssss')
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
        const { h, ref, reactive, computed} = ctx;
        let slide = reactive(props.slide) as IPublicSlide;
        const context = reactive(props.slide.context);

        this.context = context
        const url = ref("");
        const urlBg = computed(() => 'url(\'' + url.value + '\')')

        context.onPrepare(async () => {
            await context.assetsStorage().then(async (ability: IAssetsStorageAbility) => {
                this.initI18n();
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
                        class: "image-container bg-cover bg-no-repeat bg-center",
                        style: [
                            { backgroundImage: urlBg.value },
                            { backgroundColor: slide.data.color },
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
