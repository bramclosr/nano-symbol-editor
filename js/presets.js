// Define presets for quick application
const presets = {
    'wider-top': {
        topWidthDelta: 40,
        topAdjustment: 'outer',
        bottomWidthDelta: 0,
        bottomAdjustment: 'outer',
        upperBoxDelta: 0,
        upperBoxAdjustment: 'width',
        lowerBoxDelta: 0,
        lowerBoxAdjustment: 'height',
        cornerRadius: 0
    },
    'wider-bottom': {
        topWidthDelta: 0,
        topAdjustment: 'outer',
        bottomWidthDelta: 40,
        bottomAdjustment: 'outer',
        upperBoxDelta: 0,
        upperBoxAdjustment: 'width',
        lowerBoxDelta: 0,
        lowerBoxAdjustment: 'height',
        cornerRadius: 0
    },
    'thicker-boxes': {
        topWidthDelta: 0,
        topAdjustment: 'outer',
        bottomWidthDelta: 0,
        bottomAdjustment: 'outer',
        upperBoxDelta: 20,
        upperBoxAdjustment: 'thickness',
        lowerBoxDelta: 20,
        lowerBoxAdjustment: 'thickness',
        cornerRadius: 0
    },
    'chunky': {
        topWidthDelta: 60,
        topAdjustment: 'outer',
        bottomWidthDelta: 60,
        bottomAdjustment: 'outer',
        upperBoxDelta: 30,
        upperBoxAdjustment: 'width',
        lowerBoxDelta: 30,
        lowerBoxAdjustment: 'width',
        cornerRadius: 0
    },
    'slim': {
        topWidthDelta: -20,
        topAdjustment: 'outer',
        bottomWidthDelta: -20,
        bottomAdjustment: 'outer',
        upperBoxDelta: -10,
        upperBoxAdjustment: 'width',
        lowerBoxDelta: -10,
        lowerBoxAdjustment: 'width',
        cornerRadius: 0
    },
    'balanced': {
        topWidthDelta: 30,
        topAdjustment: 'outer',
        bottomWidthDelta: 30,
        bottomAdjustment: 'outer',
        upperBoxDelta: 15,
        upperBoxAdjustment: 'width',
        lowerBoxDelta: 15,
        lowerBoxAdjustment: 'width',
        cornerRadius: 0
    },
    'rounded': {
        topWidthDelta: 0,
        topAdjustment: 'outer',
        bottomWidthDelta: 0,
        bottomAdjustment: 'outer',
        upperBoxDelta: 0,
        upperBoxAdjustment: 'width',
        lowerBoxDelta: 0,
        lowerBoxAdjustment: 'height',
        cornerRadius: 10
    }
};

// Function to apply a preset configuration
function applyPreset(presetName) {
    const preset = presets[presetName];
    if (!preset) return;
    
    // Apply values to sliders and display values
    document.getElementById('topWidthDelta').value = preset.topWidthDelta;
    document.getElementById('topWidthDeltaValue').textContent = preset.topWidthDelta;
    
    document.getElementById('bottomWidthDelta').value = preset.bottomWidthDelta;
    document.getElementById('bottomWidthDeltaValue').textContent = preset.bottomWidthDelta;
    
    document.getElementById('upperBoxDelta').value = preset.upperBoxDelta;
    document.getElementById('upperBoxDeltaValue').textContent = preset.upperBoxDelta;
    
    document.getElementById('lowerBoxDelta').value = preset.lowerBoxDelta;
    document.getElementById('lowerBoxDeltaValue').textContent = preset.lowerBoxDelta;
    
    document.getElementById('cornerRadius').value = preset.cornerRadius;
    document.getElementById('cornerRadiusValue').textContent = preset.cornerRadius;
    
    // Set the mode buttons
    if (preset.topAdjustment === 'outer') {
        document.getElementById('topOuterPoints').classList.add('active');
        document.getElementById('topInnerPoints').classList.remove('active');
    } else {
        document.getElementById('topOuterPoints').classList.remove('active');
        document.getElementById('topInnerPoints').classList.add('active');
    }
    
    if (preset.bottomAdjustment === 'outer') {
        document.getElementById('bottomOuterPoints').classList.add('active');
        document.getElementById('bottomInnerPoints').classList.remove('active');
    } else {
        document.getElementById('bottomOuterPoints').classList.remove('active');
        document.getElementById('bottomInnerPoints').classList.add('active');
    }
    
    // Set upper box mode
    document.getElementById('upperBoxWidthMode').classList.remove('active');
    document.getElementById('upperBoxThicknessMode').classList.remove('active');
    document.getElementById('upperBoxHeightMode').classList.remove('active');
    
    document.getElementById(`upperBox${preset.upperBoxAdjustment.charAt(0).toUpperCase() + preset.upperBoxAdjustment.slice(1)}Mode`).classList.add('active');
    
    // Set lower box mode
    document.getElementById('lowerBoxHeightMode').classList.remove('active');
    document.getElementById('lowerBoxWidthMode').classList.remove('active');
    document.getElementById('lowerBoxThicknessMode').classList.remove('active');
    
    document.getElementById(`lowerBox${preset.lowerBoxAdjustment.charAt(0).toUpperCase() + preset.lowerBoxAdjustment.slice(1)}Mode`).classList.add('active');
    
    // Update the adjustment mode
    updateAdjustmentMode();
    
    // Update the logo
    updateLogo();
}

// Function to set up preset button listeners
function setupPresetListeners() {
    document.querySelectorAll('.preset-btn').forEach(button => {
        button.addEventListener('click', () => {
            const presetName = button.dataset.preset;
            applyPreset(presetName);
        });
    });
}