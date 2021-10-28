<?php

namespace Vendor\MyApp;


use App\Models\Media;
use DynamicScreen\SdkPhp\Slide\SlideHandler;
use DynamicScreen\SdkPhp\Slide\ISlide;

class Image extends SlideHandler {

    public function fetch(ISlide $slide): array
    {
        if (isset($options['media'])) {
            $ids = $options['media'];

            Media::whereIn('id', $ids)->each(function ($media) use ($slide) {
                if ($media->isExpired || !$media->metadata("transcoded", true)) {
                    return;
                }

                $this->slide([
                    'media'         => $media,
                    'size'          => $media->size,
                    'url'           => $media->url,
                    'hash'          => $media->hash,
                    'color'         => $slide->getOption('color'),
                    'media_id'      => $media->id,
                    'margin'        => $slide->getOption('margin'),
                    'caption'       => $slide->getOption('caption'),
                    'caption_color' => rescue(function () use ($slide) {
                        return getContrastColor($slide->getOption('color'));
                    }, 'black'),
                ]);
            });
        }

        return [
            'title' => $slide->getOption('title'),
            'message' => $slide->getOption('message'),
            'backgroundColor' => $slide->getOption('backgroundColor'),
        ];
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
