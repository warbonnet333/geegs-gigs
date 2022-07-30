const getMarkup = ({cardNumber, expireDate, type, isDefault = false}) => `<div class="settings_infoline">
                <div class="settingspayments_infoline-card">
                    <img src="../img/settings_ico/${type}_ico.webp" alt="${capitalizeFirstLetter(type)}">
                </div>
                <p class="settings_infoline-title" data-value="${type}">${capitalizeFirstLetter(type)} •••• ${getLastCardNums(cardNumber)}
                    ${isDefault ? '<span class="settingspayments_infoline-default">DEFAULT</span' : ''}
                </p>
                <div class="settings_infoline-area">
                    <p class="settings_infoline-value" data-value="${expireDate}">Expiration ${expireDate.slice(0, 2)}/20${expireDate.slice(3)}</p>
                    <a href="#" class="settings_button-blue __edit-payment">Edit</a>
                </div>
            </div>`;

class Settings {
    constructor() {
        this.status = '';
        this.showErrorPopup = this.showErrorPopup.bind(this);
        this.showSuccessPopup = this.showSuccessPopup.bind(this);
        this.addFormValue = this.addFormValue.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.replaceListItem = this.replaceListItem.bind(this);
        this.onBackdropClick = this.onBackdropClick.bind(this);
        this.onSubmitCard = this.onSubmitCard.bind(this);
        this.init();
    }

    init() {
        this.initEvents();
    }

    initEvents() {
        $(document).on('click', '.__add-payment', this.addWithdraw.bind(this))
        $(document).on('click', '.__edit-payment', this.editWithdraw.bind(this))
        $(document).on('click', '.__view_hostory', () => $('.add_card_details').hide())
        $(document).on('input', '#cardNumber', this.onCardNumberChange.bind(this))
        $(document).on('input', '#expireDate', this.onExpiryDateChange.bind(this))
        $(document).on('input', '#cvv', this.onCvvChange.bind(this))
        $(document).on('click', '.js-resolve-btn', this.onSubmitCard)
        $(document).on('click', '.js-reject-btn', this.onCloseForm.bind(this))
        $(document).on('click', '.modal-backdrop', this.onBackdropClick)
        $(document).keyup(e => ((e.key === "Escape") && this.onBackdropClick()));
    }

    onBackdropClick() {
        $('.js-notification.active').removeClass('active');
        $('.history_payment').hide();

        if (this.status === 'addingError' || this.status === 'editingError') {
            $('.add_card_details').show();
            this.status = this.status === 'addingError' ? 'adding' : 'editing';
            return;
        }

        this.onCloseForm(null, false);
    }

    addWithdraw(e) {
        e.preventDefault();
        this.status = 'adding';
        const notifications = $('.js-notification');
        const $form = $('.add_card_details');
        $form.removeClass('edit-form').addClass('add-form');
        notifications.removeClass('active');
        $form.show();
    }

    editWithdraw(event) {
        event.preventDefault();
        $('.modal').addClass('show');

        this.status = 'editing';
        const notifications = $('.js-notification');
        const $form = $('.add_card_details');
        const itemToEdit = event.currentTarget.closest('.settings_infoline');
        $form.removeClass('add-form').addClass('edit-form');
        itemToEdit.classList.add('editing');
        notifications.removeClass('active');

        const data = {
            cardName: 'John Doe', // get card number from back-end
            cardNumber: '4444 1111 4444 1111', // get card number from back-end
            expireDate: $(itemToEdit).find('.settings_infoline-value').data('value'),
            cvv: '444', // get cvv number from back-end
            type: $(itemToEdit).find('.settings_infoline-title').data('value'),
            postalCode: '44400', // get postal code from back-end
            country: 'USA', // get country from back-end
        }

        this.addFormValue($form, data)
        $form.show();
    }

    addFormValue($form, data = {}) {
        if (!$form.length) return;
        this.status = 'editing';

        const dataObj = Object.entries(data);

        for (let i = 0; i < dataObj.length; i++) {
            const id = dataObj[i][0];
            const value = dataObj[i][1];
            $form.find(`#${id}`).val(value);

            if (id === 'type') {
                $form.find(`.add_card_details--type`)[0].dataset.type = value;
            }
        }
    }

    onCvvChange(event) {
        event.currentTarget.value = event.target.value.replace(/\W/gi, '').replace(/[^\d ]/g, '');
    }

    onCardNumberChange(event) {
        let value = event.target.value.replace(/\W/gi, '').replace(/[^\d ]/g, '');
        event.currentTarget.value = value;
        const type = creditCardType(value.replace(/\W/gi, '')).toLowerCase();
        $('.add_card_details--type')[0].dataset.type = type;

        if (value.length >= 16) {
            value = event.currentTarget.value.replace(/(.{4})/g, '$1 ').slice(0, 19);
            event.currentTarget.value = value;
            return true;
        }
        return false;
    }

    onExpiryDateChange(event) {
        event.currentTarget.value = event.target.value.replace(/[^\d ]/g, '');

        if (event.currentTarget.value.length < 5) {
            let value = event.currentTarget.value.replace(/\W/gi, '').replace(/(.{2})/g, '$1/');
            if (value.length > 5) {
                value = value.slice(0, 5);
            }
            event.currentTarget.value = value;
            return true;
        }
        return false;
    }

    onSubmitCard(e) {
        const data = {
            cardName: $('#cardName').val(),
            cardNumber: $('#cardNumber').val(),
            expireDate: $('#expireDate').val(),
            cvv: $('#cvv').val(),
            type: document.querySelector('.add_card_details--type').dataset.type,
            postalCode: $('#postalCode').val(),
            country: $('#country').val(),
        }

        const valueData = Object.values(data);

        const errText = {
            title: this.status === 'adding'
                ? 'There was a problem with adding your card'
                : 'There was a problem with editing your card details',
            subtitle: 'Try it again or contact our support',
            status: this.status + 'Error'
        };

        const successText = {
            title: this.status === 'adding'
                ? 'You have successfully added a new card '
                : 'You have successfully edited the card details',
            status: this.status + 'Success'
        }

console.log(data)
        for (let i = 0; i < valueData.length; i++) {
            if (!valueData[i]) {
                this.showErrorPopup(errText);
                return;
            }
        }

        this.status === 'editing'
            ? this.replaceListItem(data)
            : this.addCartToList(data);
        this.showSuccessPopup(successText);
    }

    showErrorPopup({title = '', subtitle = '', status = ''}) {
        this.status = status;
        const popup = $('.__error_process');
        const form = $('.add_card_details');
        popup.find('.__error_process-title').text(title);
        popup.find('.__error_process-subtitle').text(subtitle);
        form.hide();
        popup.addClass('active');
    };

    showSuccessPopup({title = '', status = ''}) {
        this.status = status;
        const popup = $('.__successfully_process');
        const form = $('.add_card_details');
        popup.find('.__successfully_process-title').text(title);
        form.hide();
        popup.addClass('active');
        $('#cardName').val('');
        $('#cardNumber').val('');
        $('#expireDate').val('');
        $('#cvv').val('');
        $('#postalCode').val('');
        $('#country').val('');
    }

    addCartToList(data) {
        const list = $('.js-card-list');
        console.log(list);
        console.log(list.children());
        console.log(!list.children().length);
        const markup = getMarkup({...data, isDefault: !list.children().length});
        list.append(markup);
    }

    onCloseForm(e, deleteItem = true) {
        $('.modal').removeClass('show');
        const $item = $('.settings_infoline.editing');
        deleteItem
            ? $item.remove()
            : $item.removeClass('editing');
        this.status = 'adding' && this.clearFields();
        this.status = '';

    }

    clearFields() {
        $('.add_card_details input').val('');
    }

    replaceListItem(data) {
        const itemToEdit = $('.settings_infoline.editing');
        const isDefault = itemToEdit.find('.settingspayments_infoline-default').length;
        itemToEdit[0].outerHTML = getMarkup({...data, isDefault});
    }

}

new Settings();