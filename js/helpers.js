const MIN_SERVEY_TEXT_LENGTH = 100;

const toggleBackdrop = (toShow = false) => {
    const backdrop = document.querySelector('.js-popup-backdrop');
    toShow
        ? backdrop.classList.add('active')
        : backdrop.classList.remove('active');
}

const skillMarkup = ({title, description}) => {
    return `<div class="skill-list--item js-skill-item checked shadow-item">
                <div class="skill-list--item_img">
                    <img src="./img/skills/skill-1.svg" alt="${title}">
                </div>
                <div class="skill-list--item_title">${title}</div>
                <div class="skill-list--item_descr">${description}</div>
                <div class="checker">
                    <img class="add-icon" src="./img/button/add_gray.svg" alt="add">
                    <img class="accept-icon" src="./img/ico/accept.svg" alt="accept">
                </div>
            </div>`;
}

const experienceMarkup = ({title, company, fieldOfStudy = null, startDate, endDate}) => {
    return `<div class="experience_list--item">
                <div class="experience_list--item_title">${title} ∙ ${company}</div>
                {fieldOfStudy ||  ? <div class="experience_list--item_descr">${fieldOfStudy}</div> : ''}
                <div class="experience_list--item_date">${startDate} - ${endDate}</div>
                <div class="experience_list--item_edit js-open-popup" data-popup-trigger="add-experience">
                    <img src="./img/ico/pen_ico.svg" alt="edit experience">
                </div>
            </div>`;
}

const educationMarkup = ({title, degree, fieldOfStudy, startDate, endDate}) => {
    return `<div class="experience_list--item">
                <div class="experience_list--item_title">${title}</div>
                <div class="experience_list--item_descr">${degree}, ${fieldOfStudy}</div>
                <div class="experience_list--item_date">${startDate} - ${endDate}</div>
                <div class="experience_list--item_edit js-open-popup" data-popup-trigger="add-education">
                    <img src="./img/ico/pen_ico.svg" alt="edit education">
                </div>
            </div>`;
}

const isSurveyFormValid = () => {
    const textarea = document.querySelector('#registration-survey');
    const value = textarea.value.trim();
    const wrap = textarea.closest('.input_wrap');

    if (value.length >= MIN_SERVEY_TEXT_LENGTH) {
        wrap && wrap.classList.remove('error');
        return true;
    }

    wrap && wrap.classList.add('error');
    return false;
}

const onFileLoad = (e) => {
    const input = e.currentTarget;
    const wrap = input.closest('.upload_id--item') || input.closest('.contact_form--avatar');
    input.files.length
        ? wrap.classList.add('uploaded')
        : wrap.classList.remove('uploaded');
}

const CustomEvent = function (text, className = '') {
    this.text = text;
    this.className = className;
};

function throttle(func, ms) {

    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const updateDateString = date => {
    const eventDate = date.getDate();
    const eventDay = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date);
    const eventMonth = MONTH_NAMES[date.getMonth()];
    return `${eventDay}, ${eventDate} ${eventMonth}`;
}
