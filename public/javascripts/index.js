/**
 * Created by pan on 14-7-15.
 */

+function ($) {
    var Scrollwhere = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.scrollwhere, options);
        this.items = this.$element.children('a');
        this.items.on('click.ew', $.proxy(this.click, this));
        this.aoffsetTops = [];
        this.getoffsetTops();
        $(window).on('scroll.ew', $.proxy(this.scroll, this))
    };
    Scrollwhere.prototype = {
        click: function (e) {
            e.preventDefault();
            var e = e || window.event;
            var obj = e.target || e.srcElement;
            var parent = $(obj);
            parent = parent.is('a') ? parent : parent.parent();
            var h = $(this.aoffsetTops[parent.index()].id).offset().top;
            $("html,body").stop(!0).animate({scrollTop: h}, this.options.speed, this.options.easingType)
        },
        getoffsetTops: function () {
            var i = this.items.length;
            while (i--) {
                var item = {id: this.items[i].getAttribute('href')}
                this.aoffsetTops.push(item);
            }
            this.aoffsetTops.reverse();
        },
        actived: function (element) {
            var parent = $('[href="' + element + '"]');
            parent = parent.is('a') ? parent : parent.parent();
            parent.siblings().children('i').removeClass('active');
            parent.children('i').addClass('active');
        },
        scroll: function () {
            var i = this.aoffsetTops.length;
            var windowoffsetTop = $(window).scrollTop() + 200;
            while (i--) {
                var section = $(this.aoffsetTops[i].id),
                    top = section.offset().top,
                    bottom = section.outerHeight(true) + top;

                if (windowoffsetTop >= top && windowoffsetTop <= bottom) {
                    this.actived(this.aoffsetTops[i].id);
                }
            }
            if (windowoffsetTop + $(window).height() >= $(document).height()) {
                this.actived(this.aoffsetTops[3].id);
            }
        }
    };
    $.fn.scrollwhere = function (option) {
        var methodReturn;
        var $set = this.each(function () {
            var $this = $(this);
            var data = $this.data('rank');
            var options = typeof option === 'object' && option;
            if (!data) $this.data('rank', (data = new Scrollwhere(this, options)));
            if (typeof option === "string") methodReturn = data[option](value);
        })
        return (methodReturn === undefined) ? $set : methodReturn;
    }

    $.fn.scrollwhere.defaults = {};

    $.fn.scrollwhere.Constructor = Scrollwhere;


}(window.jQuery);


$(function () {
    $('.rl .nav a').on('click', function () {
        var $self = $(this);
        $self.toggleClass('close-me');
    });
    function getcode(e) {
        var $self = $(e), count = $self.data('count') || 30,
            Interval = setInterval(function () {
                if (count--) {
                    $self.text('获取验证码 ' + count.toString()).addClass('disabled');
                }
                else {
                    $self.text('获取验证码').removeClass('disabled');
                    clearInterval(Interval);
                }
            }, 1000);
    }

    $(document).scroll(function () {
        var $header = $('.header');
        $('body')[0].scrollTop > 91 ? $header.addClass('scroll') : $header.removeClass('scroll');
    });
    $('.quick-nav').scrollwhere({
        speed: 500,
        easingType: "easeOutQuart"
    });
});
