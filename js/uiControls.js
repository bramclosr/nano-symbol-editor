// Function to handle value display for slider inputs
function handleSliderValueDisplay(sliderElement, valueElement) {
    if (!sliderElement || !valueElement) return;
    
    const updateValue = () => {
        valueElement.textContent = sliderElement.value;
    };
    
    sliderElement.addEventListener('input', updateValue);
    updateValue(); // Initialize the display
}

// Function to toggle the active state of option buttons
function setupOptionButtonGroup(buttons) {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            // Apply changes based on the selected option
            updateAdjustmentMode();
            updateLogo();
        });
    });
}

// Initialize UI elements after DOM content is loaded
function setupUIElements() {
    // Initialize slider displays
    initializeSliderDisplays();
}

// Call this function during initialization
document.addEventListener('DOMContentLoaded', setupUIElements);

// Function to update slider value displays
function updateSliderValueDisplay(sliderId, valueId) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);
    
    if (slider && valueDisplay) {
        slider.addEventListener('input', () => {
            valueDisplay.textContent = slider.value;
        });
    }
}

// Initialize all slider value displays
function initializeSliderDisplays() {
    // Basic mode sliders
    updateSliderValueDisplay('thicknessSlider', 'thicknessSliderValue');
    updateSliderValueDisplay('widthSlider', 'widthSliderValue');
    updateSliderValueDisplay('heightSlider', 'heightSliderValue');
    updateSliderValueDisplay('cornerRadius', 'cornerRadiusValue');
    updateSliderValueDisplay('chunkySlider', 'chunkySliderValue');
    
    // Advanced mode sliders
    updateSliderValueDisplay('advCornerRadius', 'advCornerRadiusValue');
    updateSliderValueDisplay('topWidthSlider', 'topWidthSliderValue');
    updateSliderValueDisplay('bottomWidthSlider', 'bottomWidthSliderValue');
    updateSliderValueDisplay('upperBoxSlider', 'upperBoxSliderValue');
    updateSliderValueDisplay('lowerBoxSlider', 'lowerBoxSliderValue');
    updateSliderValueDisplay('pointXDelta', 'pointXDeltaValue');
    updateSliderValueDisplay('pointYDelta', 'pointYDeltaValue');
}

// Function to toggle visibility of UI sections
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const isVisible = section.style.display !== 'none';
        section.style.display = isVisible ? 'none' : 'block';
    }
}

// Function to set up preset listeners
function setupPresetListeners() {
    const presetButtons = document.querySelectorAll('.preset-btn');
    
    presetButtons.forEach(button => {
        button.addEventListener('click', () => {
            const presetName = button.getAttribute('data-preset');
            applyPreset(presetName);
        });
    });
}

// Function to apply a preset
function applyPreset(presetName) {
    // Reset to defaults first
    resetBasicAdjustments();
    
    // Apply preset-specific settings
    switch(presetName) {
        case 'classic':
            // Classic Nano logo (default)
            break;
            
        case 'chunky':
            // Chunky version
            document.getElementById('thicknessSlider').value = 15;
            document.getElementById('thicknessSliderValue').textContent = 15;
            document.getElementById('chunkySlider').value = 50;
            document.getElementById('chunkySliderValue').textContent = 50;
            adjustmentValues.thicknessValue = 15;
            adjustmentValues.chunkyValue = 50;
            break;
            
        case 'slim':
            // Slim version
            document.getElementById('thicknessSlider').value = 5;
            document.getElementById('thicknessSliderValue').textContent = 5;
            document.getElementById('widthSlider').value = -10;
            document.getElementById('widthSliderValue').textContent = -10;
            adjustmentValues.thicknessValue = 5;
            adjustmentValues.widthValue = -10;
            break;
            
        case 'rounded':
            // Rounded corners
            document.getElementById('cornerRadius').value = 15;
            document.getElementById('cornerRadiusValue').textContent = 15;
            adjustmentValues.cornerRadiusValue = 15;
            break;
            
        case 'wider-top':
            // Wider top
            adjustmentValues.topWidthOuter = 40;
            currentMode.topAdjustmentMode = 'outer';
            document.getElementById('topOuterPoints').classList.add('active');
            document.getElementById('topInnerPoints').classList.remove('active');
            document.getElementById('topWidthSlider').value = 40;
            document.getElementById('topWidthSliderValue').textContent = 40;
            break;
            
        case 'wider-bottom':
            // Wider bottom
            adjustmentValues.bottomWidthOuter = 40;
            currentMode.bottomAdjustmentMode = 'outer';
            document.getElementById('bottomOuterPoints').classList.add('active');
            document.getElementById('bottomInnerPoints').classList.remove('active');
            document.getElementById('bottomWidthSlider').value = 40;
            document.getElementById('bottomWidthSliderValue').textContent = 40;
            break;
            
        case 'thicker-boxes':
            // Thicker boxes
            adjustmentValues.upperBoxThickness = 20;
            adjustmentValues.lowerBoxThickness = 20;
            
            // Set upper box mode to thickness
            currentMode.upperBoxMode = 'thickness';
            document.getElementById('upperBoxWidthMode').classList.remove('active');
            document.getElementById('upperBoxHeightMode').classList.remove('active');
            document.getElementById('upperBoxThicknessMode').classList.add('active');
            document.getElementById('upperBoxSlider').value = 20;
            document.getElementById('upperBoxSliderValue').textContent = 20;
            
            // Set lower box mode to thickness
            currentMode.lowerBoxMode = 'thickness';
            document.getElementById('lowerBoxHeightMode').classList.remove('active');
            document.getElementById('lowerBoxWidthMode').classList.remove('active');
            document.getElementById('lowerBoxThicknessMode').classList.add('active');
            document.getElementById('lowerBoxSlider').value = 20;
            document.getElementById('lowerBoxSliderValue').textContent = 20;
            break;
    }
    
    // Apply adjustments and update logo
    if (currentMode.mode === 'basic') {
        applyThicknessAdjustments();
        } else {
        applyAdvancedAdjustments();
        }
    updateLogo();
}