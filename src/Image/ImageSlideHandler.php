<?php

namespace DynamicScreen\Image\Image;

use DynamicScreen\SdkPhp\Handlers\SlideHandler;
use DynamicScreen\SdkPhp\Interfaces\ISlide;
use Illuminate\Support\Arr;

class ImageSlideHandler extends SlideHandler
{

    public function fetch(ISlide $slide): void
    {
        $mediaAccessKey = $this->needed_medias();

        if (is_array($mediaAccessKey)) {
            $mediaAccessKey = Arr::first($mediaAccessKey);
        }

        $medias = $slide->getMedia($mediaAccessKey);

        collect($medias)->map(function ($media) use ($slide) {
            $this->addSlide([
                'url' => Arr::get($media, 'url'),
                'color' => $slide->getOption('color', 'black'),
                'media_id' => Arr::get($media, 'id'),
                'margin' => $slide->getOption('margin', '0'),
                'caption' => $slide->getOption('caption', ''),
                'caption_color' => rescue(function () use ($slide) {
                    return $this->getContrastColor($slide->getOption('color'));
                }, 'black'),
            ]);
        });
    }

    function getContrastColor($hexColor)
    {

        //////////// hexColor RGB
        $R1 = hexdec(substr($hexColor, 0, 2));
        $G1 = hexdec(substr($hexColor, 2, 2));
        $B1 = hexdec(substr($hexColor, 4, 2));

        //////////// Black RGB
        $blackColor = "#000000";
        $R2BlackColor = hexdec(substr($blackColor, 0, 2));
        $G2BlackColor = hexdec(substr($blackColor, 2, 2));
        $B2BlackColor = hexdec(substr($blackColor, 4, 2));

        //////////// Calc contrast ratio
        $L1 = 0.2126 * pow($R1 / 255, 2.2) +
            0.7152 * pow($G1 / 255, 2.2) +
            0.0722 * pow($B1 / 255, 2.2);

        $L2 = 0.2126 * pow($R2BlackColor / 255, 2.2) +
            0.7152 * pow($G2BlackColor / 255, 2.2) +
            0.0722 * pow($B2BlackColor / 255, 2.2);

        $contrastRatio = 0;
        if ($L1 > $L2) {
            $contrastRatio = (int) (($L1 + 0.05) / ($L2 + 0.05));
        } else {
            $contrastRatio = (int) (($L2 + 0.05) / ($L1 + 0.05));
        }

        //////////// If contrast is more than 5, return black color
        if ($contrastRatio > 5) {
            return 'black';
        } else { //////////// if not, return white color.
            return 'white';
        }
    }
}
