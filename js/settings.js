class Settings {
    constructor() {
        this.cardList = [];
        this.form = {
            cardName: '',
            cardNumber: '',
            expireDate: '',
            cvv: '',
            type: '',
        }
        this.init();
    }

    init() {
        this.initEvents();
    }

    initEvents() {
        $(document).on('click', '.__add-payment', this.addWithdraw.bind(this))
    }

    addWithdraw() {

    }

}

new Settings();