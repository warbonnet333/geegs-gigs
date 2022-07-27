class AuthPage {
    constructor() {
        this.step = 1;
        this.allStepsCount = $('.js-step').length || 0;
        this.$progress = $('.js-auth-progress') || null;
        this.$progressBtn = $('.js-next-step');
        this.data = {};
        this.init();
    }

    init() {
        this.initEvents();
        this.initDatePicker();
    }

    initEvents() {
        $(document).on('click', '.js-client-type', this.onClientTypeClick.bind(this))
        $(document).on('click', '.js-next-step, .js-apply-btn', this.onNextStep.bind(this))
        $(document).on('click', '.js-prev-step', this.onPrevStep.bind(this))
        $(document).on('click', '.js-open-popup', this.openPopup.bind(this))
        $(document).on('click', '.js-skill-item', this.onSkillChoose.bind(this))

        $(document).on('submit', '.js-new-category-form', this.addNewCategory.bind(this))
        $(document).on('submit', '.js-new-experience-form', this.addNewExperience.bind(this))
        $(document).on('submit', '.js-new-education-form', this.addNewEducation.bind(this))

        $(document).on('change', '#id-front-page, #id-back-page, #user-avatar', onFileLoad);
        $(document).on('change', '#id-front-page, #id-back-page, #user-avatar', onFileLoad);

        $(document).on('click', '.js-popup-backdrop, .js-close-popup', this.closePopup.bind(this))
        document.addEventListener('keypress', (e) => (e.key === "Escape") && this.closePopup.bind(this));
    }

    onClientTypeClick(e) {
        const target = e.currentTarget;
        if (target.classList.contains('checked')) return;

        const applyBtn = document.querySelector('.js-apply-btn');
        const {type = '', text = ''} = target.dataset;
        const oldType = document.querySelector('.js-client-type.checked');
        oldType && oldType.classList.remove('checked');
        target.classList.add('checked');
        this.data.type = type;
        applyBtn.innerText = text;
        applyBtn.removeAttribute('disabled');
    }

    onNextStep() {
        if (this.step === 5 && !isSurveyFormValid()) return;

        const $nextStep = $(`.js-step[data-step="${++this.step}"]`);

        if ($nextStep.length) {
            $('.active-step').removeClass('active-step');
            $nextStep.length && $nextStep.addClass('active-step');
            this.updateProgress(this.step + 1);
            return;
        }

        --this.step;

        //    Publish profile
        alert('Publish profile');

    }

    onPrevStep() {
        const $nextStep = $(`.js-step[data-step="${--this.step}"]`);
        $('.active-step').removeClass('active-step');
        if ($nextStep.length) {
            $nextStep.addClass('active-step');
            this.updateProgress(this.step + 1);
        }
    }

    updateProgress() {
        const $nextStep = $(`.js-step[data-step="${this.step + 1}"]`);
        const {stepName = '', isLastStep = false} = $nextStep?.data() ?? {
            stepName: 'Publish Profile',
            isLastStep: true
        };
        this.$progressBtn.text(isLastStep ? stepName : `Continue to: ${stepName}`);

        const width = (100 / this.allStepsCount) * (this.step - 1);
        this.$progress.css('width', width + '%');
        this.step > 1
            ? this.$progress.parents('.auth_footer').addClass('shown')
            : this.$progress.parents('.auth_footer').removeClass('shown');
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

    onSkillChoose(e) {
        const skill = e.currentTarget;
        skill.classList.toggle('checked');
    }

    addNewCategory(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newSkill = {
            title: formData.get('category-title'),
            description: formData.get('category-description') || '',
        }
        const skillElement = skillMarkup(newSkill);
        $('.js-skill-list').append(skillElement);
        this.closePopup();
        document.getElementById('category-title').value = '';
        document.getElementById('category-description').value = '';
    }

    addNewExperience(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newExperience = {
            title: formData.get('experience-title'),
            company: formData.get('company-title'),
            startDate: formData.get('experience-start-date'),
            endDate: formData.get('experience-end-date'),
            description: formData.get('experience-description') || '',
        }
        const experienceElement = experienceMarkup(newExperience);
        $('.js-experience-list').append(experienceElement);
        this.closePopup();
        document.getElementById('experience-title').value = '';
        document.getElementById('company-title').value = '';
        document.getElementById('experience-start-date').value = '';
        document.getElementById('experience-end-date').value = '';
        document.getElementById('experience-description').value = '';
    }

    addNewEducation(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newEducation = {
            title: formData.get('school-title'),
            degree: formData.get('degree-title'),
            fieldOfStudy: formData.get('field-of-study'),
            startDate: formData.get('education-start-date'),
            endDate: formData.get('education-start-date'),
        }
        const experienceElement = educationMarkup(newEducation);
        $('.js-education-list').append(experienceElement);
        this.closePopup();
        document.getElementById('school-title').value = '';
        document.getElementById('degree-title').value = '';
        document.getElementById('field-of-study').value = '';
        document.getElementById('education-start-date').value = '';
        document.getElementById('education-end-date').value = '';
    }

    initDatePicker() {
        const $input = $('#birth-date');
        $input.datepicker({
            dateFormat: "mm/dd/yy",
            nextText: "",
            prevText: "",
            onSelect: function() {
                const dateAsObject = $(this).datepicker( 'getDate' );
                console.log(dateAsObject);
            }
        })
    }


};

new AuthPage();

