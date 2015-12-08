;(function($) {
    $.fn.PlaceHolder = function(className) {
        var _set = function($em, opt) {
            for (i in opt) {
                switch(i) {
                    case 'value': $em.val(opt[i]); break;
                    case 'class':
                        if (opt[i].length) {
                            $em.toggleClass(opt[i]);
                        }
                        break;
                    default: $em.attr(i, opt[i]);
                }
            }
        };
         
        if ('placeholder' in $('<input />')[0]) {
            return this;
        }
         
        return this.each(function() {
            var $this = $(this), 
                init = {
                    'type': $this.attr('type'),
                    'placeholder': $this.attr('placeholder')
                };
             
            $this.bind({
                'init': function(){
                    _set($(this), {
                        'type': init.type,
                        'class': className ? className : '',
                        'value': ''
                    });
                },
                 
                'opts': function() {
                    _set($(this), {
                        'type': 'text',
                        'class': className ? className : '',
                        'value': init.placeholder
                    });
                },
                 
                'focus': function() {
                    var $this = $(this);
                    if ($this.val() == init.placeholder) {
                        $this.trigger('init');
                    }
                },
                 
                'blur': function() {
                    var $this = $(this);
                    if ($this.val() == '') {
                        $this.trigger('opts');
                    }
                }
            });
             
            if (init.placeholder && $this[0].value != undefined) {
                $this.trigger('blur');
            }
        });
    };
})(jQuery);