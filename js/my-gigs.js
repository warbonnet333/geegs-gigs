class MyGigsPage {
    constructor() {
        this.init();
    }

    init() {
        this.initEvents();
        this.initUpcomingCalendar();
        this.initGigSlider();
        this.initLockedSlider();
    };

    initEvents() {
    }

    initUpcomingCalendar() {
        const $comingGigs = $('.js-coming-gigs');
        const events = {};

        $comingGigs.datepicker({
            defaultDate: "07/17/2022",
            nextText: "",
            prevText: "",
            onSelect: function () {
                const $dateString = $(this).parents('.current_datepicker--row').find('.js-date-string');
                const dateAsObject = $(this).datepicker('getDate');
                $dateString.text(updateDateString(dateAsObject));
            },
            beforeShowDay: function (date) {
                const $dateString = $(this).parents('.current_datepicker--row').find('.js-date-string');
                const dateAsObject = $(this).datepicker('getDate');
                $dateString.text(updateDateString(dateAsObject));
                const event = events[date];
                if (event) {
                    return [true, event.className, event.text];
                } else {
                    return [true, '', ''];
                }
            }
        })
    }

    initGigSlider() {
        const $slider = $('.js-current-slider');
        if (!$slider.length) return;

        $slider.slick({
            dots: true,
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
        });
    }

    initLockedSlider() {
        const $slider = $('.js-locked-slider');
        if (!$slider.length) return;

        $slider.slick({
            dots: true,
            speed: 300,
            arrows: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
        });
    }

}

new MyGigsPage();

