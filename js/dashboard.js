class DashboardPage {
    constructor() {
        this.types = {
            weekData: [0, 100, 50, 150, 100, 160, 80,],
            monthData: [0, 50, 100, 80, 180, 145, 210],
            yearData: [0, 100, 50, 150, 100, 160, 80, 190, 180, 145, 210, 160],
            allTimeData: [0, 100, 50, 150, 100, 160, 80, 190, 180, 145, 210, 160, 180, 190, 140],
            weekLabels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Sat', 'Mon'],
            monthLabels: [1, 5, 10, 15, 20, 25, 30],
            yearLabels: ['DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
            allTimeLabels: ['OCT', 'NOV', 'DEC', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
        }
        this.onDatepickerType = this.onDatepickerType.bind(this);
        this.init();
    }

    init() {
        this.initEarningsChart();
        this.initEvents();
    }

    initEvents() {
        $(document).on('click', '.js-date-type-trigger', this.onDatepickerType)
    }

    initEarningsChart() {
        const ctx = document.querySelector('.user_earnings canvas')?.getContext('2d');
        if (!ctx) return;
        this.ctx = ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0.1, '#5E97FF');
        gradient.addColorStop(0.9, '#fff');

        this.data = {
            labels: [1, 5, 10, 15, 20, 25, 30],
            datasets: [{
                label: 'Test',
                data: [0, 50, 100, 80, 180, 145, 210],
                backgroundColor: gradient,
                borderColor: "#5E97FF",
                borderWidth: 1,
                fill: true,
                tension: 0.5,
                pointRadius: 0,
            }],
        };
        this.options = {
            animation: false,
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
                        display: false
                    }]
                },
                y: {
                    title: {
                        display: false
                    },
                    grid: {display: false},
                    ticks: {
                        callback: function (value, index, ticks) {
                            return '$' + value;
                        }
                    }
                },
            },
        };
        this.config = {
            type: 'line',
            data: this.data,
            options: this.options
        }

        this.chart = new Chart(ctx, this.config);
    }

    onDatepickerType(e) {
        const btn = e.currentTarget;
        $('.js-date-type-trigger.active').removeClass('active');
        btn.classList.add('active');

        const {type} = btn.dataset;
        this.config.data.labels = this.types[`${type}Labels`]
        this.config.data.datasets[0].data = this.types[`${type}Data`];
        this.chart.destroy();
        this.chart = new Chart(this.ctx, this.config);
        this.chart.update();
    }

}

new DashboardPage();