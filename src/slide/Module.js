var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SlideModule } from "dynamicscreen-sdk-js";
let Image = require('../slide/Image');
export default class ImageSlideModule extends SlideModule {
    constructor(context) {
        super(context);
        this.component = Image.default;
    }
    onReady() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Image working to be ready...');
            const guard = this.context.guardManager.add('ready', this.context.slide.id);
            yield this.context.assetsStorage().then((ability) => __awaiter(this, void 0, void 0, function* () {
                yield ability.download(this.context.slide.data.url, (assetDownload) => {
                    assetDownload.onProgress.subscribe((progress, ev) => {
                        console.log('progress: ', progress);
                        ev.unsub();
                    });
                    assetDownload.onCompleted.subscribe((asset, ev) => {
                        console.log('media: ', asset);
                        ev.unsub();
                    });
                });
            }));
            console.log('slide is ready => assets should be now downloaded');
            guard.remove();
            return true;
        });
    }
    ;
    onPlay() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ON TA DIT DEPUIS LE COMPOSANT CONNARD');
            return true;
        });
    }
    onEnded() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ON TA DIT DEPUIS LE COMPOSANT CONNARD');
            return true;
        });
    }
    onReplay() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ON TA DIT DEPUIS LE COMPOSANT CONNARD');
            return true;
        });
    }
    onPrepare() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ON TA DIT DEPUIS LE COMPOSANT CONNARD');
            return true;
        });
    }
}
//# sourceMappingURL=Module.js.map