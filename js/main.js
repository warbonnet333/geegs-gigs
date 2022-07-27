
$( document ).ready(function() {
    $('.header_account-button, .topgeeks_item-like, .settings_checkbox').on('click', function(){
        $(this).toggleClass('active');
        if($(this).hasClass('header_account-button')){
            $('.header_account-dropdown_menu').toggleClass('active');
        }
    });
    
    $('.jobposting_area-image-slider').slick({
        dots: true,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    $('.catslider_area').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: '<div class="catslider_arrow catslider-right"></div>',
        nextArrow: '<div class="catslider_arrow catslider-left"></div>'
    });
    // Initital Radio
    if($('#turn_on').attr('checked')){
        $('.turn_offon_button').css('transform', 'translate(5px, -50%)');
        $('.turn_off_label').css('display', 'block');
        $('.turn_on_label').css('display', 'none');
        $('.createjob').children().each(function() {
            $(this).addClass('hits');
        });
        $('.background_blur').addClass('hits');
    }else{
        $('.turn_offon_button').css('transform', 'translate(calc(209px - 51px), -50%)');
        $('.turn_off_label').css('display', 'none');
        $('.turn_on_label').css('display', 'block');
        $('.createjob').children().each(function() {
            $(this).removeClass('hits');
        });
        $('.background_blur').removeClass('hits');
    }
    // Radio click 
    $('.turn_offon_button').on('click', function() {
        if($('#turn_on').attr('checked')){
            $('#turn_on').removeAttr('checked');
            $('#turn_off').attr('checked', true);
            $('.turn_off_label').css('display', 'none');
            $('.turn_on_label').css('display', 'block');
            $('.turn_offon_button').css('transform', 'translate(calc(209px - 51px), -50%)');

            $('.createjob').children().each(function() {
                $(this).removeClass('hits');
            });
            $('.background_blur').removeClass('hits');
        }else{
            $('#turn_off').removeAttr('checked');
            $('#turn_on').attr('checked', true);
            $('.turn_off_label').css('display', 'block');
            $('.turn_on_label').css('display', 'none');
            $('.turn_offon_button').css('transform', 'translate(5px, -50%)');
            $('.createjob').children().each(function() {
                $(this).addClass('hits');
            });
            $('.background_blur').addClass('hits');
        }
    });
    // Click body hide all popup
    $(document).mouseup(function(e){
        const posting = $('.header_posting');
        const formCreateJob = $('.createjob');
        const header_account = $('.header_account');
        const turn_of_insights = $('.turn_of_insights');
        const createjob_successfully = $('.createjob_successfully');

        if ((!posting.is(e.target) && posting.has(e.target).length === 0) 
            && (!formCreateJob.is(e.target) && formCreateJob.has(e.target).length === 0)
            && (!header_account.is(e.target) && header_account.has(e.target).length === 0)
            && (!turn_of_insights.is(e.target) && turn_of_insights.has(e.target).length === 0)
            && (!createjob_successfully.is(e.target) && createjob_successfully.has(e.target).length === 0)){
            $('.header_posting').removeClass('active');
            $('.createjob_step, .step1').removeClass('active');
            $('.header_account-button').removeClass('active');
            $('.header_account-dropdown_menu').removeClass('active');
            if(!$('.hits_block_eight').hasClass('active')){
                $('.background_blur').removeClass('active hits');
            }
            
            $('.header_posting-menu').children().each(function(){
                if($(this).hasClass('active')) $(this).removeClass('active');
            });
            
            $('.step1_maininput-button').addClass('disable');
            $('.step1_nav').addClass('active');
        };
    });

    $('.header_account-dropdown_menu > ul > li > a').on('click', function(e) {
        e.preventDefault();
        $('.header_account-dropdown_menu').toggleClass('active');
        $('.header_account-button').toggleClass('active');
    });

    //Click setting info 
    $('.settings_infoline-edit').on('click', function() {
        const position = $(this).attr('data-position');
        const nodeChange = $('.settings_infoline').eq(position);

        $(nodeChange).find('.settings_infoline-cancel').addClass('active');
        $(nodeChange).find('.settings_infoline-area_static').removeClass('active');
        $(nodeChange).find('.settings_infoline-area_action').addClass('active');

        $(nodeChange).find('.settings_infoline-cancel').on('click', function () {
            $(nodeChange).find('.settings_infoline-cancel').removeClass('active');
            $(nodeChange).find('.settings_infoline-area_action').removeClass('active');
            $(nodeChange).find('.settings_infoline-area_static').addClass('active');
        });
        $(nodeChange).find('.settings_infoline-area_action__confirm').on('click', function () {
            $(nodeChange).find('.settings_infoline-cancel').removeClass('active');
            $(nodeChange).find('.settings_infoline-area_action').removeClass('active');
            $(nodeChange).find('.settings_infoline-area_static').addClass('active');
        });
    });

    //Show modal
    $('.__view_hostory, .__edit-payment, .__add-payment, .__view_faqs').on('click', function (e) {
        $('.modal').toggleClass('show');
        if($('.__view_hostory').is(e.target)){
            $('.history_payment').css('display', 'flex');
        }else if($('.__edit-payment').is(e.target)){
            $('.edit_card_details').css('display', 'flex');
        }else if($('.__add-payment').is(e.target)){
            $('.add_card_details').css('display', 'flex');
        }else if($('.__view_faqs').is(e.target)){
            $('.faqs_refferal').css('display', 'flex');
        }
    });
    //Hide modal
    $('.modal').on('click', function (e) {
        if(e.target === this){
            $('.modal').toggleClass('show');
            $(this).children().each(function(){
                $(this).css('display', 'none');
            });
        };
    });

    $('.add_card_details__btns_reject, .edit_card_details__btns_reject').on('click', function(e){
        e.preventDefault();
        $('.modal').toggleClass('show');
        $('.modal').children().each(function(){
            $(this).css('display', 'none');
        });
    });

    $('.add_card_details__btns_resolve, .edit_card_details__btns_resolve').on('click', function(e){
        e.preventDefault();
        $('.modal').children().each(function(){
            $(this).css('display', 'none');
        });

        const status = {
            edit_resolve: {
                title: 'You have successfully edited the card details'
            }, 
            edit_reject: {
                title: 'There was a problem with editing your card details',
                subtitle: 'Try it again or contact our support'
            }, 
            add_resolve: {
                title: 'You have successfully added a new card '
            }, 
            add_reject: {
                title: 'There was a problem with adding your card',
                subtitle: 'Try it again or contact our support'
            }, 
        };

        const testRandomStatus = Math.floor(Math.random() * (3 - 1)) + 1; // 1 or 2
        if($('.add_card_details__btns_resolve').is(e.target)){
            const {add_resolve, add_reject} = status;
            if(testRandomStatus === 1){
                $('.__successfully_process').css('display', 'flex');
                $('.__successfully_process-title').text(add_resolve.title);
            }else{
                $('.__error_process').css('display', 'flex');
                $('.__error_process-title').text(add_reject.title);
                $('.__error_process-subtitle').text(add_reject.subtitle);
            }
        }else{
            const {edit_resolve, edit_reject} = status;
            if(testRandomStatus === 1){
                $('.__successfully_process').css('display', 'flex');
                $('.__successfully_process-title').text(edit_resolve.title);
            }else{
                $('.__error_process').css('display', 'flex');
                $('.__error_process-title').text(edit_reject.title);
                $('.__error_process-subtitle').text(edit_reject.subtitle);
            }
        };
    });

    // Click on steps nav tag
    const allStepsTag = $('.header_posting-menu').children();
    $('.header_posting-menu').children().each(function() {
        $(this).on('click', function() {
            if($(this).hasClass('complited') && !$(this).hasClass('active')) {
                allStepsTag.each(function() {
                    $(this).removeClass('active');
                });
                const stepField = $(this).attr('class')?.split('_')[0];
                $(this).addClass('active');
                $('.createjob').children().each(function() {
                    $(this).removeClass('active');
                });
                $(`.createjob > .${stepField}`).addClass('active');
            };
        });
    });

    //Edit profile click 
    $('.__edit_profile').on('click', function(e) {
        e.preventDefault();
        $(this).removeClass('active');
        $('.__save_profile').addClass('active');
        $('.profile__details_contact').find('p').each(function() {
            $(this).removeClass('active');
        });
        $('.profile__details_address p').removeClass('active');
        $('.profile__details_address label').addClass('active');
        $('.profile__details_contact').find('label').each(function() {
            $(this).addClass('active');
        });
        $('.profile__details_address').each(function() {
            $(this).addClass('editing');
        })
        $('.profile__main_header_img .person-img').addClass('active');
    });
    //Save profile 
    $('.__save_profile').on('click', function(e) {
        e.preventDefault();
        $(this).removeClass('active');
        $('.__edit_profile').addClass('active');
        $('.profile__details_contact').find('label').each(function() {
            $(this).removeClass('active');
        });
        $('.profile__details_address label').removeClass('active');
        $('.profile__details_address p').addClass('active');
        $('.profile__details_contact').find('p').each(function() {
            $(this).addClass('active');
        });
        $('.profile__details_address').each(function() {
            $(this).removeClass('editing');
        });
        $('.profile__main_header_img .person-img').removeClass('active');
    });
    // Step
    $('.header_posting').on('click', function(){
        if(!$(this).hasClass('active')){
            $('.background_blur').addClass('active');
            $(this).addClass('active');
            $('.step1').addClass('active');
        };

        const findBlurBackground = $(document).find('.background_blur').length;
        if(findBlurBackground){
            $('.background_blur').addClass('active');
        };
    });
    $('.background_blur').on('click', function(e) {
        e.preventDefault();
        if(e.target === this){
            if($('.hits_block_eight').hasClass('active')){
                $('.hits_block_eight').removeClass('active');
                $('.hits_block_nine').addClass('active');
                $('.banner_content-apparea').css({'position': 'relative', 'z-index': '99999'});
            }else{
                $('.background_blur').removeClass('active');
                $('.wrapper').css('display', 'block');
                $('.hits_block_nine').removeClass('active');
                $('.banner_content-apparea').css({'position': 'none', 'z-index': '1'});
            }
        }
    });
    $('.step1_next').on('click', function(){
        $('.step1, .step1_nav').removeClass('active');
        $('.step1_nav').addClass('complited');
        $('.step2, .step2_nav').addClass('active');
    });
    $('.step2_next').on('click', function(){
        $('.step2, .step2_nav').removeClass('active');
        $('.step2_nav').addClass('complited');
        $('.step3, .step3_nav').addClass('active');
    });
    $('.step3_next').on('click', function(){
        $('.step3, .step3_nav').removeClass('active');
        $('.step3_nav').addClass('complited');
        $('.step4, .step4_nav').addClass('active');
    });
    $('.step4_next').on('click', function(){
        $('.step4, .step4_nav').removeClass('active');
        $('.step4_nav').addClass('complited');
        $('.step5, .step5_nav').addClass('active');
    });
    $('.step5_next').on('click', function(){
        $('.step5, .step5_nav').removeClass('active');
        $('.step5_nav').addClass('complited');
        $('.step6, .step6_nav').addClass('active');
    });
    $('.step6_next').on('click', function(){
        $('.step6, .step6_nav').removeClass('active');
        $('.step6_nav').addClass('complited');
        $('.step7, .step7_nav').addClass('active');
        $('#preview span').clone().appendTo('.step7_area-imgarea');
    });
    $('.step7_next').on('click', function(){
        $('.step7').removeClass('active');
        $('.step8').addClass('active');
    });

    //Back step
    $('.step2_back').on('click', function(){
        $('.step2, .step2_nav').removeClass('active');
        $('.step1, .step1_nav').addClass('active');
    });
    $('.step3_back').on('click', function(){
        $('.step3, .step3_nav').removeClass('active');
        $('.step2, .step2_nav').addClass('active');
    });
    $('.step4_back').on('click', function(){
        $('.step4, .step4_nav').removeClass('active');
        $('.step3, .step3_nav').addClass('active');
    });
    $('.step5_back').on('click', function(){
        $('.step5, .step5_nav').removeClass('active');
        $('.step4, .step4_nav').addClass('active');
    });
    $('.step6_back').on('click', function(){
        $('.step6, .step6_nav').removeClass('active');
        $('.step5, .step5_nav').addClass('active');
        $('#preview span').clone().appendTo('.step7_area-imgarea');
    });
    $('.step7_back').on('click', function(){
        $('.step7').removeClass('active');
        $('.step7').addClass('active');
    });
    // Step1
    $('.step1_maininput-input').on('keydown', function(){
        let button = $('.step1_maininput-button');
        let length_input = $(this).val().length + 1;
        if (length_input >= 9) {
            console.log("more")
            button.removeClass('disable');
        } else {
            button.addClass('disable');
        }
    });
    $('.step1_complite').on('click', function(){
        $('.step1').addClass('next');
        $('.hits_block_one').removeClass('active');
        $('.hits_block_one-second').addClass('active');
    });
    
    $('.step1_input-link').on('click', function(){
        console.log("click")
        $('.step1_input-lable').removeClass('hiden');
        $(this).addClass('hiden');
    });

    // Step2
    //step2_item-input
    function onChangeHandler(){
        $('.step2_item-input').each(function() {
            $(this).on('keyup', function(e) {
                if($(this).val().length > 8){
                    $('.step2_next').removeClass('disable');
                }else{
                    $('.step2_next').addClass('disable');
                };
            });
        });
    };
    onChangeHandler();
    $num_input = 2;
    $('.step2-addtask').on('click', function(e){
        e.preventDefault();
        let max = $(this).data('max');
        $('.step2_item:first').first().clone().appendTo('.step2_area').find('.step2_item-number').html($num_input + '.').parent().find('input').val('');
        if ($num_input == max) {
            $(this).remove();
        }
        
        $num_input++;
        $('.step2_next').addClass('disable');
        onChangeHandler();
    });

    // Step3
    $('.step3_area-lable').on('click', function(e){
        $('.step3_area-input').prop('checked', false);
        $('.step3_next').removeClass('disable');
    });

    // Step4
    var lenght_custom = 0;
    
    function handleFileSelect(event) {
        var input = this;
        var maximg = $('.step4_input-lable').data('maximg');
        var filesAmount = input.files.length;
        lenght_custom = lenght_custom + filesAmount;
        console.log($('.step4_input-checkbox').val());
        if (input.files && filesAmount && lenght_custom <= maximg) {
            line_status (lenght_custom);
            for (i = 0; i < filesAmount; i++) {
            var reader = new FileReader();
            this.enabled = false
            reader.onload = (function(e) {
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', escape(e.name), '"/><span class="remove_img_preview"></span>'].join('');
                document.getElementById('preview').insertBefore(span, null);
            });
                reader.readAsDataURL(input.files[i]);
            }
        }
    }
    function line_status (item) {
        var maximg = $('.step4_input-lable').data('maximg');
        var line = $('.step4_input-maximg span');
        line.css('width', ((item*100)/maximg) + '%');
        if(item > 0) {
            $('.step4_next').removeClass('disable');
        } else {
            $('.step4_next').addClass('disable');
        }
    }
    $('#photos').change(handleFileSelect);
    $('#preview').on('click', '.remove_img_preview', function() {
        $(this).parent('span').remove();
        $(this).val("");
        lenght_custom = lenght_custom - 1;
        line_status (lenght_custom)
    });

    // Step5
    let date = new Date();
    date = date.setDate(date.getDate() + 1);
    $( "#datepicker" ).datepicker({
        minDate: new Date(Date.now() + (3600 * 1000 * 24)),
        nextText: "",
        prevText: "",
        onSelect: function() { 
            var dateAsObject = $(this).datepicker( 'getDate' );
            console.log(dateAsObject);
        }
    });

    $('.step5 .step1_input-lable').on('click', function(e){
        $('.step5 .step1_input-checkbox').prop('checked', false);
        $('.step5_next').removeClass('disable');
    });

    // Step6
    $('.step6_input-lable').on('click', function(e){
        $('.step6_values').toggleClass('active');
        $('.step6_input-checkbox').prop('checked', false);
    });
    
    function grafik(item) {
        let data_top = item.data('top')?.split(','),
            data_bottom = item.data('bottom')?.split(','),
            max_top = Math.max.apply(null, data_top),
            solid = item.data('solid'),
            max_solid = [];
        $.each(getMaxIndexes(data_top, solid), function(index, value){
            max_solid[index] = data_top[value];
        });
        $.each(data_top, function(index, value){
            let height = ( 100 / max_top) * value;
            let width = 100 / data_top.length;
            let class_add ='';
            if(jQuery.inArray(value, max_solid) !== -1) {
                class_add ='solid';
            }
            item.find(".grafik_diagram").append('<span class="' + class_add + '" style="height: ' + height + '%; width: calc(' + width + '% - 4px);"></span>');
        });
        $.each(data_bottom, function(index, value){
            item.find(".grafik_numbers").append('<span>' + value + '</span>');
        });

    }
    let getMaxIndexes = (arr = [], count) => Object
            .entries(arr.reduce((acc, n, i) => ((acc[n] = acc[n] || [])
            .push(i), acc), {}))
            .sort((a, b) => b[0] - a[0])
            .flatMap(n => n[1])
            .slice(0, count);
    grafik($('#graf1'));
    grafik($('#graf2'));
    // Step 7

    $('.main_complete').on('click', function() {
        $('.wrapper').css('display', 'none');
    });

    // Step 8 and step 9 (hits);

    //Confirm
    $('.createjob_successfully').on('click', function() {
        $('.hits_block_eight').addClass('active');
        $('.createjob_successfully').removeClass('active');
    });

    $('.add-field').on('click', e => {
        const parent = e.currentTarget.closest('.profile__details_address');
        const length = $(parent).find('.profile_input').length;
        const {type} = e.currentTarget.dataset;
        const markup = `<p class=""><img src="../img/ico/arrow_right_border.svg" alt="${type}">
                        <span data-target="${type}-${length + 1}"></span></p>
                    <label class="active" for="${type}-${length + 1}">
                        <img src="../img/ico/arrow_right_border.svg" alt="Geolocation">
                        <input class="profile_input" type="text" id="${type}-${length + 1}" name="${type}-${length + 1}"
                               value="">
                    </label>`
        parent.insertAdjacentHTML('beforeend', markup);
    })

    $(document).on('input', '.profile_input', e => {
        const target = e.currentTarget;
        const value = target.value;
        const text = $(target.closest('label').previousElementSibling).find('span');
        text.text(value);
    })
});