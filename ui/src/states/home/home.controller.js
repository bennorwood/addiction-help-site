(function(){
    'use strict';
    module.exports = function(app, angular) {
        var jQuery = require('jquery');

        return function() {
            this.coverVideoUrl = 'videos/Valentines';

            this.initialize = function(){
                scaleVideoContainer();

                initBannerVideoSize('.video-container .poster img');
                initBannerVideoSize('.video-container .filter');
                initBannerVideoSize('.video-container video');
            };

            function scaleVideoContainer() {

                var height = jQuery(window).height() + 5;
                var unitHeight = parseInt(height) + 'px';
                jQuery('.homepage-hero-module').css('height',unitHeight);

            }

            function initBannerVideoSize(element){

                jQuery(element).each(function(){
                    jQuery(this).data('height', jQuery(this).height());
                    jQuery(this).data('width', jQuery(this).width());
                });

                scaleBannerVideoSize(element);

            }

            function scaleBannerVideoSize(element){

                var windowWidth = jQuery(window).width(),
                windowHeight = jQuery(window).height() + 5,
                videoWidth,
                videoHeight;

                // console.log(windowHeight);

                jQuery(element).each(function(){
                    var videoAspectRatio = jQuery(this).data('height')/jQuery(this).data('width');

                    jQuery(this).width(windowWidth);

                    if(windowWidth < 1000){
                        videoHeight = windowHeight;
                        videoWidth = videoHeight / videoAspectRatio;
                        jQuery(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

                        jQuery(this).width(videoWidth).height(videoHeight);
                    }

                    jQuery('.homepage-hero-module .video-container video').addClass('fadeIn animated');

                });
            }


            this.initialize();
        };
    };
})();
