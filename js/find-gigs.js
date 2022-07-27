class FindGigsPage {
    constructor() {
        this.init();
    }

    init() {
        this.initEvents();
        this.initSortSelectric();
        this.initScrollTopBtn();
    };

    initEvents() {
        $(document).on('click', '.js-load-more-gigs', this.loadMore.bind(this));
    }

    loadMore(e) {
        const btn = e.currentTarget;
        btn.classList.add('loading');

        /*Delete after adding request*/
        setTimeout(() => btn.classList.remove('loading'), 3000)
    }

    initSortSelectric() {
        const $select = $('#sort-select');
        $select.selectric({
            inheritOriginalWidth: false,
            nativeOnMobile: true,
            // openOnHover: true,
        });
        $select.on('selectric-change', (event, element, selectric) => {
            console.log('selectric-change', selectric);
        });
    }

    initScrollTopBtn() {
        const select = document.querySelector('#sort-select');
        const btn = document.querySelector('.js-scroll-to-top');
        const onScroll = throttle(() => {
            const {top} = select.getBoundingClientRect();
            top > 0
                ? btn.classList.remove('shown')
                : btn.classList.add('shown')
        }, 100);

        btn.addEventListener('click', () => window.scrollTo({
            top: 0,
            behavior: "smooth"
        }))
        document.addEventListener('scroll', onScroll)
    }

}

new FindGigsPage();

