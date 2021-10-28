<template>
    <div>
      <p class="mt-2 text-sm text-red-600">Your password must be less than 4 characters.</p>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType} from "vue";
import i18next from "i18next";
import {ISlideContext} from "dynamicscreen-sdk-js";
const en = require("../languages/en.json");
const fr = require("../languages/fr.json");

export default defineComponent({
    name: "ImageOptions",
    props: { context: {type: Object as PropType<ISlideContext>, required: true} },
    setup(props, ctx) {
      onMounted(() => {
        initI18n();
      });

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

      const trans = (key: string) => {
        return i18next.t(key);
      };

      return { initI18n, trans }
    },
})

</script>

<style scoped>

</style>
