const topBar = document.querySelector('#top-bar');
const caseColorSelection = document.querySelector('#case-col-button');
const podsColorSelection = document.querySelector('#pods-col-button');
const caseImage = document.querySelector('#pods-exterior');
const podImage = document.querySelector('#pods-interior');
const caseSection = document.querySelector('#case-type');
const perfomanceBtn = document.querySelector('#perfomance-btn');
const totalPriceElement = document.querySelector('#total-price');
const noiseCancellationCheckbox = document.querySelector('#noise-cancellation');
const accessoryCheckboxes = document.querySelectorAll('.accessories-form-checkbox');

// to handle total price func
const basePrice = 70000;
let currentPrice = basePrice;
let selectedOptions = {}

// create price object
const pricing = {
    'Perfomance Package': 10000,
    'Charging Case': 250000,
    'Noise Cancellation': 200000,
    'Accessories':{
        'Incase Lanyard': 3000,
        'Ear Tips': 2000,
        'Belkin Airpods Cleaning Kit': 15000,
    }
}

// update total price in UI
const updateTotalPrice = () => {
    // reset current price to baseprice
    currentPrice = basePrice;

    if(selectedOptions['Charging Case']) {
        currentPrice += pricing['Charging Case']
    }

    if(selectedOptions['Perfomance Package']) {
        currentPrice += pricing['Perfomance Package']
    }

    if(selectedOptions['Noise Cancellation']){
        currentPrice += pricing['Noise Cancellation']
    }

    // handle accessories price
    accessoryCheckboxes.forEach((checkbox) => {
        // extract the accessories label
        const accessoryLabel = checkbox
            .closest('label')
            .querySelector('span')
            .textContent.trim();

        const accessoryPrice = pricing['Accessories'][accessoryLabel];
        // add to currentPrice if accessory sellected
        if(checkbox.checked){
            currentPrice += accessoryPrice;
        }
    })

    // update total price in Ui
    totalPriceElement.textContent = `Tsh ${currentPrice.toLocaleString()}`
}

// handle Top bar on scroll func
const handleScroll = () => {
    const atTop = window.scrollY === 0;
    topBar.classList.toggle('visible-bar', atTop);
    topBar.classList.toggle('hidden-bar', !atTop);
}

// image mapping
const exteriorImages = {
    'stealth grey': './images/imagestock/klim-musalimov-8JgsrDAzqsE-unsplash.jpg',
    'solid black' : './images/imagestock/blaccase (2).jpeg',
    'deep red' : './images/imagestock/Red case (1).jpeg',
    'solid green' : './images/imagestock/Green case.jpeg',
    'solid blue' : './images/imagestock/bluecase.jpeg',
}

const podImages = {
    Dark: "./images/imagestock/Apple 'developing' low-cost earbuds called 'AirPods Pro Lite'.jpeg",
    Light: "./images/imagestock/extpods2.jpeg"
}

// handle color selection
const handleColBtn = (event) => {
    let button;

    if(event.target.tagName === 'BUTTON') {
        button = event.target;
    }

    if(button) {
        const buttons = event.currentTarget.querySelectorAll('button');
        buttons.forEach((btn) => btn.classList.remove('btn-selected'));
        button.classList.add('btn-selected')
    }
    
    // case color
    let color = button.dataset.color;

    if(event.currentTarget === caseColorSelection) {
        color = Object.keys(exteriorImages).find(key => key.toLowerCase().trim() === color);
        caseImage.src = exteriorImages[color];
    }

    // pods color
    if(event.currentTarget === podsColorSelection) {
        color = Object.keys(podImages).find(key => key === color);
        podImage.src = podImages[color];
    }
}

// handle case type
const handleCase = (event) => {
    if(event.target.tagName === 'BUTTON') {
        const buttons = document.querySelectorAll('#case-type button')
        buttons.forEach((btn) => btn.classList.remove('bg-gray-700', 'text-white'));
        // add selected styles into clicked button
        event.target.classList.add('bg-gray-700', 'text-white');

        // change image
        const selectedCase = event.target.textContent.includes('MagSafe');
        caseImage.src = selectedCase ? './images/imagestock/magsafe.jpg':'./images/imagestock/extpods.jpeg';

        selectedOptions['Charging Case'] = true;
        updateTotalPrice()
    }
}

// handle perfomance package
const handlePerfomance = () => {
    const isSelected = perfomanceBtn.classList.toggle('bg-gray-700');
    perfomanceBtn.classList.toggle('text-white');

    // Update selectedOptions
    selectedOptions['Perfomance Package'] = isSelected;
    updateTotalPrice()
}

// noise cancellation 
const noiseCancellationChange = () => {
    const isSelected = noiseCancellationCheckbox.checked;
    selectedOptions['Noise Cancellation'] = isSelected;
    updateTotalPrice();
};

// handle accessories checkboxes
accessoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => updateTotalPrice());
    
});

// events listeners
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));
caseColorSelection.addEventListener('click', handleColBtn);
podsColorSelection.addEventListener('click', handleColBtn);
caseSection.addEventListener('click', handleCase);
perfomanceBtn.addEventListener('click', handlePerfomance);
noiseCancellationCheckbox.addEventListener('change', noiseCancellationChange);