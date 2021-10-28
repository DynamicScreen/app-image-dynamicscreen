<?php

namespace DynamicScreen\Image\Image;

use App\Domain\Module\Model\Module;
use DynamicScreen\SdkPhp\Handlers\SlideHandler;
use DynamicScreen\SdkPhp\Interfaces\ISlide;

class ImageSlideHandler extends SlideHandler
{
    public function __construct(Module $module)
    {
        parent::__construct($module);
    }

    public function fetch(ISlide $slide): array
    {
        // TODO: parse options using priv identifier

        $options = $slide->getOptions();
        if (isset($options['media'])) {
            $medias = $options['media'];

//            $medias->each(function ($media) use ($slide) {
//                if ($media->isExpired || !$media->metadata("transcoded", true)) {
//                    return;
//                }
//
//                $this->slide([
//                    'media'         => $media,
//                    'size'          => $media->size,
//                    'url'           => $media->url,
//                    'hash'          => $media->hash,
//                    'color'         => $slide->getOption('color'),
//                    'media_id'      => $media->id,
//                    'margin'        => $slide->getOption('margin'),
//                    'caption'       => $slide->getOption('caption'),
//                    'caption_color' => rescue(function () use ($slide) {
//                        return getContrastColor($slide->getOption('color'));
//                    }, 'black'),
//                ]);
//            });
        }

        return $options;
    }

    public function getDefaultOptions(): array
    {
        return [
            'title' => '',
            'message' => '',
            'backgroundColor' => '#D42500',
        ];
    }
}
