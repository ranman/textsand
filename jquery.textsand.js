/*
TextSand .1

Use Quicksand to reorder text with a nice animation.

Copyright (c) 2011 Joseph Randall Hunt (ranman.org)
Thanks to: 
Jacek Galanciak (razorjack.net) for the Quicksand plugin 
and Dave Rupert (daverupert.com) for lettering.js injector method

Dual licensed under the MIT and GPL version 2 licenses.
http://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt
http://github.com/jquery/jquery/blob/master/GPL-LICENSE.txt

Project site: http://ranman.org/textsand
Github site: http://github.com/ranman/textsand
*/

(function( $ ){
    $.fn.textsand = function(newText, options) {
        function injector(txt, splitter) {
            var letter_array = txt.text().split(splitter), inject = '', dict = {};
            if (letter_array.length) {
                $(letter_array).each(function(i, item) {
                    if(item in dict) {
                        dict[item]++;
                    } else {
                        dict[item] = 0;
                    }
                    inject += '<span data-id="txtsnd_'+item.charCodeAt(0)+'_'+dict[item]+'">'+item+'</span>';
                });
                txt.empty().append(inject);
            }
        }
        function cleanDOM(lbl) {
            var to_clean = lbl.children('span').filter(function() {
                return $(this).attr('data-id').indexOf('txtsnd') != -1;
            });
            to_clean.each(function() {
                $(this).replaceWith(function() { return this.innerHTML; });
            });
        }
        var settings = {
            'duration': 2000,
            'adjustHeight': 'auto',
            'easing' : 'easeInOutQuad',
            'useScaling': true,
        };
        return this.each(function() {
            var $this = $(this);
            if( options ) {
                $.extend(settings, options);
            }
            injector($this, '');
            injector(newText, '');
            $this.quicksand(newText.children('span'), settings);
            setTimeout(function(){cleanDOM($this);}, settings.duration+50);
        });
    };
})( jQuery );
