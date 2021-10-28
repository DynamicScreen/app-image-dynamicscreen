<?php

namespace DynamicScreen\Image\Image;

use App\Domain\Module\Model\Module;
use DynamicScreen\SdkPhp\Handlers\SlideHandler;
use DynamicScreen\SdkPhp\Interfaces\ISlide;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

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

    public function processOptions($options)
    {
        /** @var Request $request */
        $request = app('request');
        if ($request->has('media')) {
            $options['media'] = $request->get('media');
            return $options;
        }

        if ($request->hasFile('options.image')) {
//            $options['image'] = $this->getExtension()->uploadFile('image', 'images');
//            $options['hash'] = $this->generateHash($request->file('options.image')->path());
            return $options;
        }

        return $options;
    }

    public function getAttachedMedias(ISlide $slide)
    {
        $media = $slide->getOption('media');
        return $media === null ? [] : [$media];
    }

    public function getValidations(Request $request = null)
    {
        $media_rules = ['required_if:options.type,media', 'array'];

        $options = $request->get('options');
//        if ($request && Arr::get($options, 'type') === 'media') {
//            $media_rules[] = new AreAvailable;
//        }

        return [
            'rules' => [
                'media' => $media_rules,
                'remote_file_id' => ['required_if:options.type,drive']
            ],
            'messages' => [
                'media.required_if' => __('dynamicscreen.slides-essentials::image.validations.media_required'),
            ],
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
