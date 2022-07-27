const BLUE_COLOR = '#5E97FF';
const YOUR_API_KEY = '';

class IndividualPage {
    constructor() {
        this.init();
    }

    init() {
        this.initEvents();
        this.initScheduleDatepicker();
        this.initScheduleRange();
        this.initRangeSelect();
        this.initMap();
    };

    initEvents() {
        $(document).on('click', '.js-slot-item', this.onSlotClick);
        $(document).on('input', '#range_input', this.onRangeChange);
        $(document).on('click', '.js-slot-chosen', this.showPriceRange);
        $(document).on('click', '.js-like-btn', this.onLikeClick);
        $(document).on('click', '.js-fixed-link', this.onNavClick);
        $(document).on('click', '.user_categories .settings_button-blue', this.onRequest);
    }

    initScheduleDatepicker() {
        const $comingGigs = $('.js-schedule-datepicker');
        const $dateString = $('.js-date-string');

        const events = {
            [new Date("07/28/2022")]: new CustomEvent("Event 1", 'with-event'),
            [new Date("07/20/2022")]: new CustomEvent("Event 1", 'with-event'),
            [new Date("07/14/2022")]: new CustomEvent("Event 1", 'great-day'),
            [new Date("07/16/2022")]: new CustomEvent("Event 1", 'great-day'),
        };

        $comingGigs.datepicker({
            defaultDate: "07/08/2022",
            nextText: "",
            prevText: "",
            onSelect: function () {
                $dateString.text(updateDateString($(this).datepicker('getDate')));
            },
            beforeShowDay: function (date) {
                $dateString.text(updateDateString($(this).datepicker('getDate')));
                const event = events[date];
                if (event) {
                    return [true, event.className, event.text];
                } else {
                    return [true, '', ''];
                }
            }
        })
    }

    onSlotClick(e) {
        $('.js-slot-item.active').removeClass('active');
        const $btn = $('.js-slot-chosen');
        const target = e.currentTarget;
        target.classList.add('active');
        $btn.attr('disabled', false);
    }

    onRangeChange(e) {
        const target = e.currentTarget.value;
        const $btn = $('.js-range-changed');
        $btn.attr('disabled', !target);
    }

    showPriceRange() {
        $('.schedule_section--step.active').removeClass('active');
        $('.schedule_section--step[data-schedule="range"]').addClass('active');
    }

    // schedule_section--step
    onLikeClick(e) {
        const btn = e.currentTarget;
        btn && btn.classList.toggle('active')
    }

    initScheduleRange() {
        const ctx = document.querySelector('.js-schedule-range')?.getContext('2d');
        if (!ctx) return;
        this.ctx = ctx;
        const dc = "#D9E6FF";
        const ac = BLUE_COLOR;
        const backgroundColor = [dc, dc, dc, ac, ac, ac, ac, dc, dc, dc, dc, dc, dc, dc, dc, dc,]
        const defaultOptions = {
            animation: false,
            plugins: {
                title: {
                    text: 'hourly rate (CAD)',
                    display: true,
                    font: 'Helvetica Neue',
                    color: "#7C7C7C",
                    size: 13,
                    lineHeight: '1.5',
                    align: 'end',
                },
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        borderColor: BLUE_COLOR,
                        hoverBackgroundColor: BLUE_COLOR,
                        hoverBorderColor: BLUE_COLOR,
                        borderWidth: 4,
                    },
                    ticks: {
                        maxTicksLimit: 6,
                        color: '#3D3D3D',
                        padding: 12,
                        font: {
                            family: "'Helvetica Neue', sans-serif",
                            weight: 400
                        }
                    }
                },
                y: {
                    ticks: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: '# of similiar jobs',
                        font: 'Helvetica Neue',
                        color: "#7C7C7C",
                        size: 13,
                        lineHeight: '1.5',
                    },
                    grid: {
                        display: false,
                        borderColor: "transparent",
                    },

                },
            },
        };
        this.config = {
            type: 'bar',
            data: {
                labels: [5, 8, 13, 15, 18, 23, 25, 28, 32, 35, 38, 43, 45, 48, 53, 55],
                datasets: [{
                    label: '',
                    data: [10, 100, 50, 150, 100, 160, 80, 190, 180, 145, 210, 50, 100, 50, 150, 0],
                    borderColor: BLUE_COLOR,
                    backgroundColor: backgroundColor,
                    fill: true,
                    pointRadius: 0,
                    borderSkipped: true,
                    borderWidth: {
                        top: 1,
                        bottom: 2,
                        right: 1,
                        left: 1
                    },
                }],
            },
            options: defaultOptions,
        }
        this.chart = new Chart(ctx, this.config);

        // document.addEventListener('click', () => changeBackground([15, 18, 23, 25]))
    }

    changeBackground(activeHours = []) {
        // const activeHours = [15, 18, 23, 25];
        const activeColor = BLUE_COLOR;
        const inActiveColor = "#D9E6FF";
        const activeTick = "#000000";
        const inActiveTick = "#3D3D3D";
        const family = "'Helvetica Neue', sans-serif";
        const dataset = this.chart.data.datasets[0];
        const labels = this.chart.data.labels;
        console.log(activeHours)

        for (let i = 0; i < dataset.data.length; i++) {
            const isActive = activeHours.includes(labels[i]);
            console.log(labels[i])
            isActive
                ? dataset.backgroundColor[i] = activeColor
                : dataset.backgroundColor[i] = inActiveColor;
        }

        const newConfig = {...this.config}
        newConfig.options.scales.x.ticks = {
            ...newConfig.options.scales.x.ticks,
            color: tick => (activeHours.includes(tick.tick.label) ? activeTick : inActiveTick),
            font: (tick) => activeHours.includes(tick.tick.label)
                ? {family, weight: 500}
                : {family, weight: 400},

        }
        this.chart.destroy();
        this.chart = new Chart(this.ctx, newConfig);
        this.chart.update();
    }

    onNavClick(e) {
        e.preventDefault();
        const btn = e.currentTarget;
        const link = btn.getAttribute('href');
        const section = document.querySelector(link);
        if (!section) return;
        const {top} = section.getBoundingClientRect();
        const {height} = document.querySelector('.header').getBoundingClientRect();

        window.scrollTo({
            top: top - (height * 1.25),
            behavior: "smooth"
        })

    }

    onRequest(e) {
        const row = e.currentTarget.closest('.flex_row');
        row.nextElementSibling
            ? row.nextElementSibling.classList.add('active')
            : row.previousElementSibling?.classList.add('active')

        row.classList.remove('active');
    }

    initRangeSelect() {
        const $select = $('#range-select');
        $select.selectric({
            inheritOriginalWidth: false,
            nativeOnMobile: true,
        });
        $select.on('selectric-change', (_, element, __) => {
            const value = element.value.split('-').map(item => +item);
            this.changeBackground(value)
        });
    }

    initMap() {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}&callback=initMap`;
        script.async = true;

        window.initMap = function () {
            const uluru = {lat: -34.397, lng: 150.644};
            const map = new google.maps.Map(document.getElementById("map"), {
                center: uluru,
                zoom: 8
            });

            const marker = new google.maps.Marker({
                position: map.getCenter(),
                icon: './img/ico/address-ico-filled.svg',
                map: map,
            });
        };

        document.head.appendChild(script);
    }


}

new IndividualPage();

