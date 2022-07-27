class OverviewPage {
    constructor() {
        this.init();
    }

    init() {
        this.initEvents();
        this.initUpcomingCalendar();
        this.initEarningsChart();
        this.initNewGigsSlider();
    }

    initEvents() {
        $(document).on('click', '.js-open-popup', this.openPopup.bind(this))
        $(document).on('click', '.js-popup-backdrop, .js-close-popup', this.closePopup.bind(this))
        $(document).on('click', '.js-more-categories', this.moreCategories.bind(this))
        document.addEventListener('keypress', (e) => (e.key === "Escape") && this.closePopup.bind(this));
    }

    initUpcomingCalendar() {
        const $comingGigs = $('.js-coming-gigs');
        const events = {
            [new Date("07/28/2022")]: new CustomEvent("Event 1", 'with-event'),
            [new Date("07/20/2022")]: new CustomEvent("Event 1", 'with-event'),
        };

        $comingGigs.datepicker({
            defaultDate: "07/17/2022",
            nextText: "",
            prevText: "",
            onSelect: function () {
                const dateAsObject = $(this).datepicker('getDate');
                console.log(dateAsObject);
            },
            beforeShowDay: function (date) {
                const event = events[date];
                if (event) {
                    return [true, event.className, event.text];
                } else {
                    return [true, '', ''];
                }
            }
        })
    }

    initEarningsChart() {
        const ctx = document.querySelector('.user_earnings canvas')?.getContext('2d');
        if (!ctx) return;

        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0.1, '#5E97FF');
        gradient.addColorStop(0.9, '#fff');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'],
                datasets: [{
                    label: 'Test',
                    data: [0, 100, 50, 150, 100, 160, 80, 190, 180, 145, 210],
                    backgroundColor: gradient,
                    borderColor: "#5E97FF",
                    borderWidth: 1,
                    fill: true,
                    tension: 0.5,
                    pointRadius: 0,
                }],
            },
            options: {
                plugins: {
                    title: {
                        display: false,
                    },
                    legend: {
                        display: false
                    },
                },
                scales: {
                    x: {
                        grid: {display: false},
                        xAxes: [{
                            display: false //this will remove all the x-axis grid lines
                        }]
                    },
                    y: {
                        title: {
                            display: false
                        },
                        grid: {display: false},
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return '$' + value;
                            }
                        }
                    },
                },
            }
        });
    }

    initNewGigsSlider() {
        const $slider = $('.js-new-gigs-slider');
        if (!$slider.length) return;

        $slider.slick({
            dots: true,
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
    }

    openPopup(e) {
        const btn = e.currentTarget;
        const {popupTrigger = null} = btn.dataset;
        if (!popupTrigger) return;
        const target = document.querySelector(`.js-popup[data-popup-target="${popupTrigger}"]`);
        target && target.classList.add('active'), toggleBackdrop(true);
    }

    closePopup() {
        const target = document.querySelector('.js-popup.active');
        target && target.classList.remove('active'), toggleBackdrop(false);
    }

    moreCategories(e) {
        e.preventDefault();
        const btn = e.currentTarget;
        const list = btn.closest('.user_categories--list')

        list.classList.toggle('opened');
    }

};

new OverviewPage();

