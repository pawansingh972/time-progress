//mmm dat background
var background = chrome.extension.getBackgroundPage (); 

function setCurrentDateTime () {
    const currentTimeElem = document.querySelector('.current-time');
    currentTimeElem.innerHTML = DateTimeUtils.getTodaysDescription();
}

// Returns a Promise Object
function getImageOfTheDay () {
    let url = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`;
    
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    let dateStr = `${year}-${month}-${day}`; 
    
    // If Image of the Day is alraedy Fetched use it instead of making an request
    imageOfDay = JSON.parse(localStorage.getItem('imageOfDay'));
    if (imageOfDay) {
        if (imageOfDay.date === dateStr) {
            return Promise.resolve(imageOfDay);
        }
    }
    // Otherwise Fetch the Result from API
    return new Promise((resolve, reject) => {
        fetch(url).then(function (response) {
            return Promise.resolve(response);
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            localStorage.setItem('imageOfDay', JSON.stringify(data));
            resolve(data);
        }).catch(function (error) {
            reject(error);
        });
    });
}

function saveSettings (newSettings) {
    let settings = JSON.parse(localStorage.getItem('settings')) || {};
    for (let prop in newSettings) {
        settings[prop] = newSettings[prop];
    }
    localStorage.setItem('settings', JSON.stringify(settings));
}

function getSettings () {
    let settings = JSON.parse(localStorage.getItem('settings')) || {};
    return settings;
}

function addBackgroundStyle (type='gradient') {
    const bodyElem = document.querySelector('body'); 
    let bg;
    switch (type) {
        case 'gradient':
            bg = ColorsUtils.generateRandomGradientOfType();
            bodyElem.style.background = bg;
            break;
        case 'image':
            getImageOfTheDay().then((imageOfDay) => {
                bgUrl = imageOfDay.hdurl || imageOfDay.url;
                document.body.style.backgroundImage = `url('${bgUrl}')`;
            });
            break;
    }
}

// TODO: Need to make more generic
function prepareProgressBar (type="year") {
    const percentageBarTitleElem = document.querySelector('.progress-bar-txt');
    const percentageBarFillElem = document.querySelector('.progress-bar-fill');
    const progressValueElem = document.querySelector('.progress-value');
    
    let percentageBarFillElemWidth = 0;
    let title = '';
    switch (type) {
        case 'year':
            percentageBarFillElemWidth = Number(DateTimeUtils.getDaysSpentInYearPercentage()).toFixed(2);
            title = "Year Progress";
            break;
        case 'month':
            percentageBarFillElemWidth = Number(DateTimeUtils.getMonthProgress()).toFixed(2);
            title = "Month Progress";
            break;
        case 'week':
            percentageBarFillElemWidth = Number(DateTimeUtils.getWeekProgress()).toFixed(2);
            title = "Week Progress";
            break;
        case 'day':
            percentageBarFillElemWidth = Number(DateTimeUtils.getDayProgress()).toFixed(2);
            title = "Day Progress";
            break;
    }    

    percentageBarFillElem.style.width = `${percentageBarFillElemWidth}%`;;
    progressValueElem.innerHTML = `${percentageBarFillElemWidth} %`;
    percentageBarTitleElem.innerHTML = `${title}`;
}

function prePareSettingsElem () {
    
    let settings = getSettings();
    if (settings.progressMetric) {
        const progressMetricOption = document.querySelector(`#${settings.progressMetric}`);
        progressMetricOption.setAttribute('checked', true);
    } 

    if (settings.backgroundType) {
        const backgroundTypeOption = document.querySelector(`#${settings.backgroundType}`);
        backgroundTypeOption.setAttribute('checked', true);
    }
    
    const settingsElem = document.querySelector('.settings');
    settingsElem.addEventListener('click', function (event) {
        let settingModalElem = document.querySelector('.settings-modal');
        settingModalElem.classList.remove('hidden');
    });

    const settingsCloseIconElem = document.querySelector('.close-icon');
    settingsCloseIconElem.addEventListener('click', function (event) {
        let settingModalElem = document.querySelector('.settings-modal');
        settingModalElem.classList.add('hidden');
    });

    const progressMetricsOptionsElems = document.querySelectorAll('input[type=radio][name=progress-metrics-unit]');
    progressMetricsOptionsElems.forEach(el => {
        el.addEventListener('change', (event) => {
            const progressMetric = event.target.value;
            saveSettings({ progressMetric });
            prepareProgressBar(progressMetric);
        });
    });

    const backgroundTypeOptionsElems = document.querySelectorAll('input[type=radio][name=background-type]');
    backgroundTypeOptionsElems.forEach(el => {
        el.addEventListener('change', (event) => {
            const backgroundType = event.target.value;
            saveSettings({ backgroundType });
            addBackgroundStyle(backgroundType);
        });
    });

}

function attachEventHandlers () {
    const userNameElem = document.querySelector('.username');
    const userNameInputElem = document.querySelector('.username-input');
    
    userNameElem.addEventListener('dblclick', (event) => {
        userNameElem.classList.add('hidden');
        userNameInputElem.classList.remove('hidden');
        userNameInputElem.focus();
        // userNameElem.setAttribute('contenteditable', true);
        // userNameElem.focus();
        // window.getSelection().removeAllRanges();
    });
    userNameInputElem.addEventListener('blur', (event) => {
        userNameInputElem.classList.add('hidden');
        userNameElem.classList.remove('hidden');
        // userNameElem.setAttribute('contenteditable', false);
        // window.getSelection().removeAllRanges();
    });
}

function startWaterReminder () {
    chrome.alarms.create({delayInMinutes: 1, periodInMinutes: 1});
}

function init () {

    let settings = getSettings();
    addBackgroundStyle(settings.backgroundType);
    prepareProgressBar(settings.progressMetric);
    setCurrentDateTime();
    prePareSettingsElem();
    attachEventHandlers();
    // startWaterReminder();
}

init();














