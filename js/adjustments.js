// Current mode and adjustment values
const currentMode = {
    mode: 'basic', // 'basic' or 'advanced'
    basicSettings: null,
    advancedSettings: null,
    topAdjustmentMode: 'outer', // 'outer' or 'inner'
    bottomAdjustmentMode: 'outer', // 'outer' or 'inner'
    upperBoxMode: 'width', // 'width', 'thickness', or 'height'
    lowerBoxMode: 'width' // 'width', 'thickness', or 'height'
};

// Setup event listeners for adjustment controls
function setupAdjustmentListeners() {
    // Initialize DOM references
    currentMode.basicSettings = document.getElementById('basicSettings');
    currentMode.advancedSettings = document.getElementById('advancedSettings');
    
    // Mode toggle
    document.getElementById('basicModeBtn').addEventListener('click', () => setMode('basic'));
    document.getElementById('advancedModeBtn').addEventListener('click', () => setMode('advanced'));
    
    // Basic mode sliders
    document.getElementById('cornerRadius').addEventListener('input', handleCornerRadiusChange);
    document.getElementById('chunkySlider').addEventListener('input', handleChunkyChange);
    
    // Advanced mode sliders
    document.getElementById('topWidthSlider').addEventListener('input', handleTopWidthChange);
    document.getElementById('bottomWidthSlider').addEventListener('input', handleBottomWidthChange);
    document.getElementById('upperBoxSlider').addEventListener('input', handleUpperBoxChange);
    document.getElementById('lowerBoxSlider').addEventListener('input', handleLowerBoxChange);
    
    // Advanced mode option buttons
    setupOptionButtons();
    
    // Point selection and adjustment
    setupPointAdjustment();
    
    // Color pickers
    document.getElementById('fillColor').addEventListener('input', handleColorChange);
    document.getElementById('advFillColor').addEventListener('input', handleAdvColorChange);
    
    // Advanced mode point dragging
    setupPointDragging();
    
    // Show/hide points checkbox
    document.getElementById('showPointsAdvanced').addEventListener('change', updateLogo);
    
    // Reset buttons
    document.getElementById('resetBasic').addEventListener('click', resetBasicAdjustments);
    document.getElementById('resetAdvanced').addEventListener('click', resetAdvancedAdjustments);
    
    // Download button
    document.getElementById('downloadBtn').addEventListener('click', downloadSvg);
    
    // Sync the color pickers
    syncColorPickers();
}

// Setup option buttons for advanced mode
function setupOptionButtons() {
    // Top triangle adjustment mode
    document.getElementById('topOuterPoints').addEventListener('click', () => {
        document.getElementById('topOuterPoints').classList.add('active');
        document.getElementById('topInnerPoints').classList.remove('active');
        
        // Save current slider value before changing mode
        if (currentMode.topAdjustmentMode === 'inner') {
            adjustmentValues.topWidthInner = parseInt(document.getElementById('topWidthSlider').value);
        }
        
        currentMode.topAdjustmentMode = 'outer';
        
        // Update slider to show current value for this mode
        document.getElementById('topWidthSlider').value = adjustmentValues.topWidthOuter || 0;
        document.getElementById('topWidthSliderValue').textContent = adjustmentValues.topWidthOuter || 0;
        
        applyAdvancedAdjustments();
        updateLogo();
    });
    
    document.getElementById('topInnerPoints').addEventListener('click', () => {
        document.getElementById('topOuterPoints').classList.remove('active');
        document.getElementById('topInnerPoints').classList.add('active');
        
        // Save current slider value before changing mode
        if (currentMode.topAdjustmentMode === 'outer') {
            adjustmentValues.topWidthOuter = parseInt(document.getElementById('topWidthSlider').value);
        }
        
        currentMode.topAdjustmentMode = 'inner';
        
        // Update slider to show current value for this mode
        document.getElementById('topWidthSlider').value = adjustmentValues.topWidthInner || 0;
        document.getElementById('topWidthSliderValue').textContent = adjustmentValues.topWidthInner || 0;
        
        applyAdvancedAdjustments();
        updateLogo();
    });
    
    // Bottom triangle adjustment mode
    document.getElementById('bottomOuterPoints').addEventListener('click', () => {
        document.getElementById('bottomOuterPoints').classList.add('active');
        document.getElementById('bottomInnerPoints').classList.remove('active');
        
        // Save current slider value before changing mode
        if (currentMode.bottomAdjustmentMode === 'inner') {
            adjustmentValues.bottomWidthInner = parseInt(document.getElementById('bottomWidthSlider').value);
        }
        
        currentMode.bottomAdjustmentMode = 'outer';
        
        // Update slider to show current value for this mode
        document.getElementById('bottomWidthSlider').value = adjustmentValues.bottomWidthOuter || 0;
        document.getElementById('bottomWidthSliderValue').textContent = adjustmentValues.bottomWidthOuter || 0;
        
        applyAdvancedAdjustments();
        updateLogo();
    });
    
    document.getElementById('bottomInnerPoints').addEventListener('click', () => {
        document.getElementById('bottomOuterPoints').classList.remove('active');
        document.getElementById('bottomInnerPoints').classList.add('active');
        
        // Save current slider value before changing mode
        if (currentMode.bottomAdjustmentMode === 'outer') {
            adjustmentValues.bottomWidthOuter = parseInt(document.getElementById('bottomWidthSlider').value);
        }
        
        currentMode.bottomAdjustmentMode = 'inner';
        
        // Update slider to show current value for this mode
        document.getElementById('bottomWidthSlider').value = adjustmentValues.bottomWidthInner || 0;
        document.getElementById('bottomWidthSliderValue').textContent = adjustmentValues.bottomWidthInner || 0;
        
        applyAdvancedAdjustments();
        updateLogo();
    });
    
    // Upper box adjustment mode
    document.getElementById('upperBoxWidthMode').addEventListener('click', () => {
        // Save current slider value before changing mode
        if (currentMode.upperBoxMode === 'thickness') {
            adjustmentValues.upperBoxThickness = parseInt(document.getElementById('upperBoxSlider').value);
        } else if (currentMode.upperBoxMode === 'height') {
            adjustmentValues.upperBoxHeight = parseInt(document.getElementById('upperBoxSlider').value);
        }
        
        document.getElementById('upperBoxWidthMode').classList.add('active');
        document.getElementById('upperBoxThicknessMode').classList.remove('active');
        document.getElementById('upperBoxHeightMode').classList.remove('active');
        currentMode.upperBoxMode = 'width';
        
        // Update slider to show current value for this mode
        document.getElementById('upperBoxSlider').value = adjustmentValues.upperBoxWidth || 0;
        document.getElementById('upperBoxSliderValue').textContent = adjustmentValues.upperBoxWidth || 0;
        
        applyAdvancedAdjustments();
        updateLogo();
    });
    
    document.getElementById('upperBoxThicknessMode').addEventListener('click', () => {
        // Save current slider value before changing mode
        if (currentMode.upperBoxMode === 'width') {
            adjustmentValues.upperBoxWidth = parseInt(document.getElementById('upperBoxSlider').value);
        } else if (currentMode.upperBoxMode === 'height') {
            adjustmentValues.upperBoxHeight = parseInt(document.getElementById('upperBoxSlider').value);
        }
        
        document.getElementById('upperBoxWidthMode').classList.remove('active');
        document.getElementById('upperBoxThicknessMode').classList.add('active');
        document.getElementById('upperBoxHeightMode').classList.remove('active');
        currentMode.upperBoxMode = 'thickness';
        
        // Update slider to show current value for this mode
        document.getElementById('upperBoxSlider').value = adjustmentValues.upperBoxThickness || 0;
        document.getElementById('upperBoxSliderValue').textContent = adjustmentValues.upperBoxThickness || 0;
        
        applyAdvancedAdjustments();
        updateLogo();
    });
    
    document.getElementById('upperBoxHeightMode').addEventListener('click', () => {
        // Save current slider value before changing mode
        if (currentMode.upperBoxMode === 'width') {
            adjustmentValues.upperBoxWidth = parseInt(document.getElementById('upperBoxSlider').value);
        } else if (currentMode.upperBoxMode === 'thickness') {
            adjustmentValues.upperBoxThickness = parseInt(document.getElementById('upperBoxSlider').value);
        }
        
        document.getElementById('upperBoxWidthMode').classList.remove('active');
        document.getElementById('upperBoxThicknessMode').classList.remove('active');
        document.getElementById('upperBoxHeightMode').classList.add('active');
        currentMode.upperBoxMode = 'height';
        
        // Update slider to show current value for this mode
        document.getElementById('upperBoxSlider').value = adjustmentValues.upperBoxHeight || 0;
        document.getElementById('upperBoxSliderValue').textContent = adjustmentValues.upperBoxHeight || 0;
        
        applyAdvancedAdjustments();
        updateLogo();
    });
    
    // Lower box adjustment mode
    document.getElementById('lowerBoxHeightMode').addEventListener('click', () => {
        // Save current slider value before changing mode
        if (currentMode.lowerBoxMode === 'width') {
            adjustmentValues.lowerBoxWidth = parseInt(document.getElementById('lowerBoxSlider').value);
        } else if (currentMode.lowerBoxMode === 'thickness') {
            adjustmentValues.lowerBoxThickness = parseInt(document.getElementById('lowerBoxSlider').value);
        }
        
        document.getElementById('lowerBoxHeightMode').classList.add('active');
        document.getElementById('lowerBoxWidthMode').classList.remove('active');
        document.getElementById('lowerBoxThicknessMode').classList.remove('active');
        currentMode.lowerBoxMode = 'height';
        
        // Update slider to show current value for this mode
        document.getElementById('lowerBoxSlider').value = adjustmentValues.lowerBoxHeight || 0;
        document.getElementById('lowerBoxSliderValue').textContent = adjustmentValues.lowerBoxHeight || 0;
        
        applyAdvancedAdjustments();
        updateLogo();
    });
    
    document.getElementById('lowerBoxWidthMode').addEventListener('click', () => {
        // Save current slider value before changing mode
        if (currentMode.lowerBoxMode === 'height') {
            adjustmentValues.lowerBoxHeight = parseInt(document.getElementById('lowerBoxSlider').value);
        } else if (currentMode.lowerBoxMode === 'thickness') {
            adjustmentValues.lowerBoxThickness = parseInt(document.getElementById('lowerBoxSlider').value);
        }
        
        document.getElementById('lowerBoxHeightMode').classList.remove('active');
        document.getElementById('lowerBoxWidthMode').classList.add('active');
        document.getElementById('lowerBoxThicknessMode').classList.remove('active');
        currentMode.lowerBoxMode = 'width';
        
        // Update slider to show current value for this mode
        document.getElementById('lowerBoxSlider').value = adjustmentValues.lowerBoxWidth || 0;
        document.getElementById('lowerBoxSliderValue').textContent = adjustmentValues.lowerBoxWidth || 0;
        
        applyAdvancedAdjustments();
        updateLogo();
    });
    
    document.getElementById('lowerBoxThicknessMode').addEventListener('click', () => {
        // Save current slider value before changing mode
        if (currentMode.lowerBoxMode === 'height') {
            adjustmentValues.lowerBoxHeight = parseInt(document.getElementById('lowerBoxSlider').value);
        } else if (currentMode.lowerBoxMode === 'width') {
            adjustmentValues.lowerBoxWidth = parseInt(document.getElementById('lowerBoxSlider').value);
        }
        
        document.getElementById('lowerBoxHeightMode').classList.remove('active');
        document.getElementById('lowerBoxWidthMode').classList.remove('active');
        document.getElementById('lowerBoxThicknessMode').classList.add('active');
        currentMode.lowerBoxMode = 'thickness';
        
        // Update slider to show current value for this mode
        document.getElementById('lowerBoxSlider').value = adjustmentValues.lowerBoxThickness || 0;
        document.getElementById('lowerBoxSliderValue').textContent = adjustmentValues.lowerBoxThickness || 0;
        
        applyAdvancedAdjustments();
        updateLogo();
    });
}

// Setup point selection and adjustment
function setupPointAdjustment() {
    const selectedPoint = document.getElementById('selectedPoint');
    const pointControls = document.getElementById('pointAdjustmentControls');
    const pointXDelta = document.getElementById('pointXDelta');
    const pointYDelta = document.getElementById('pointYDelta');
    
    // Show/hide point adjustment controls based on selection
    selectedPoint.addEventListener('change', () => {
        if (selectedPoint.value) {
            pointControls.style.display = 'block';
            // Reset sliders
            pointXDelta.value = 0;
            pointYDelta.value = 0;
            document.getElementById('pointXDeltaValue').textContent = 0;
            document.getElementById('pointYDeltaValue').textContent = 0;
        } else {
            pointControls.style.display = 'none';
        }
    });
    
    // Apply point adjustments
    pointXDelta.addEventListener('input', applyPointAdjustment);
    pointYDelta.addEventListener('input', applyPointAdjustment);
}

// Apply individual point adjustment
function applyPointAdjustment() {
    const selectedPointId = document.getElementById('selectedPoint').value;
    if (!selectedPointId) return;
    
    const xDelta = parseInt(document.getElementById('pointXDelta').value);
    const yDelta = parseInt(document.getElementById('pointYDelta').value);
    
    document.getElementById('pointXDeltaValue').textContent = xDelta;
    document.getElementById('pointYDeltaValue').textContent = yDelta;
    
    // Reset points to default first
    resetPointsToDefault();
    
    // Apply all other adjustments
    applyAdvancedAdjustments();
    
    // Then apply individual point adjustment
    currentPoints[selectedPointId].x += xDelta;
    currentPoints[selectedPointId].y += yDelta;
    
    updateLogo();
}

// Sync the color pickers between basic and advanced modes
function syncColorPickers() {
    const basicColorPicker = document.getElementById('fillColor');
    const advColorPicker = document.getElementById('advFillColor');
    
    // Set initial values
    advColorPicker.value = basicColorPicker.value;
    
    // Sync when switching modes
    basicColorPicker.addEventListener('change', () => {
        advColorPicker.value = basicColorPicker.value;
    });
    
    advColorPicker.addEventListener('change', () => {
        basicColorPicker.value = advColorPicker.value;
    });
}

// Set the current mode (basic or advanced)
function setMode(mode) {
    currentMode.mode = mode;
    
    if (mode === 'basic') {
        currentMode.basicSettings.style.display = 'block';
        currentMode.advancedSettings.style.display = 'none';
        document.getElementById('basicModeBtn').classList.add('active');
        document.getElementById('advancedModeBtn').classList.remove('active');
    } else {
        currentMode.basicSettings.style.display = 'none';
        currentMode.advancedSettings.style.display = 'block';
        document.getElementById('basicModeBtn').classList.remove('active');
        document.getElementById('advancedModeBtn').classList.add('active');
        
        // Sync the advanced mode sliders with basic mode values
        syncAdvancedSliders();
    }
    
    updateLogo();
}

// Sync advanced mode sliders with basic mode values
function syncAdvancedSliders() {
    // Apply chunky adjustments to all relevant advanced mode values first
    const chunkyValue = adjustmentValues.chunkyValue || 0;
    
    // Only set these values if they haven't been explicitly set in advanced mode
    if (adjustmentValues.topWidthOuter === undefined || adjustmentValues.topWidthOuter === 0) {
        adjustmentValues.topWidthOuter = chunkyValue * 0.5;
    }
    
    if (adjustmentValues.topWidthInner === undefined || adjustmentValues.topWidthInner === 0) {
        adjustmentValues.topWidthInner = chunkyValue * 0.2;
    }
    
    if (adjustmentValues.bottomWidthOuter === undefined || adjustmentValues.bottomWidthOuter === 0) {
        adjustmentValues.bottomWidthOuter = chunkyValue * 0.5;
    }
    
    if (adjustmentValues.bottomWidthInner === undefined || adjustmentValues.bottomWidthInner === 0) {
        adjustmentValues.bottomWidthInner = chunkyValue * 0.2;
    }
    
    if (adjustmentValues.upperBoxThickness === undefined || adjustmentValues.upperBoxThickness === 0) {
        adjustmentValues.upperBoxThickness = chunkyValue * 0.3;
    }
    
    if (adjustmentValues.lowerBoxThickness === undefined || adjustmentValues.lowerBoxThickness === 0) {
        adjustmentValues.lowerBoxThickness = chunkyValue * 0.3;
    }
    
    // Set slider values based on current adjustments
    document.getElementById('topWidthSlider').value = currentMode.topAdjustmentMode === 'outer' ? 
        adjustmentValues.topWidthOuter || 0 : adjustmentValues.topWidthInner || 0;
    document.getElementById('topWidthSliderValue').textContent = document.getElementById('topWidthSlider').value;
    
    document.getElementById('bottomWidthSlider').value = currentMode.bottomAdjustmentMode === 'outer' ? 
        adjustmentValues.bottomWidthOuter || 0 : adjustmentValues.bottomWidthInner || 0;
    document.getElementById('bottomWidthSliderValue').textContent = document.getElementById('bottomWidthSlider').value;
    
    // Set the upper box slider based on the current mode
    let upperBoxValue = 0;
    switch (currentMode.upperBoxMode) {
        case 'width':
            upperBoxValue = adjustmentValues.upperBoxWidth || 0;
            break;
        case 'thickness':
            upperBoxValue = adjustmentValues.upperBoxThickness || 0;
            break;
        case 'height':
            upperBoxValue = adjustmentValues.upperBoxHeight || 0;
            break;
    }
    document.getElementById('upperBoxSlider').value = upperBoxValue;
    document.getElementById('upperBoxSliderValue').textContent = upperBoxValue;
    
    // Set the lower box slider based on the current mode
    let lowerBoxValue = 0;
    switch (currentMode.lowerBoxMode) {
        case 'height':
            lowerBoxValue = adjustmentValues.lowerBoxHeight || 0;
            break;
        case 'width':
            lowerBoxValue = adjustmentValues.lowerBoxWidth || 0;
            break;
        case 'thickness':
            lowerBoxValue = adjustmentValues.lowerBoxThickness || 0;
            break;
    }
    document.getElementById('lowerBoxSlider').value = lowerBoxValue;
    document.getElementById('lowerBoxSliderValue').textContent = lowerBoxValue;
    
    // Ensure color is synced
    document.getElementById('advFillColor').value = adjustmentValues.fillColor || defaults.fillColor;
}

// Handle corner radius slider change
function handleCornerRadiusChange(e) {
    const value = parseInt(e.target.value);
    document.getElementById('cornerRadiusValue').textContent = value;
    adjustmentValues.cornerRadiusValue = value;
    updateLogo();
}

// Handle chunky slider change - affects multiple properties equally
function handleChunkyChange(e) {
    const value = parseInt(e.target.value);
    document.getElementById('chunkySliderValue').textContent = value;
    adjustmentValues.chunkyValue = value;
    
    // Apply chunky effect to multiple properties equally
    applyChunkyAdjustments();
    updateLogo();
}

// Handle color change in basic mode
function handleColorChange(e) {
    adjustmentValues.fillColor = e.target.value;
    document.getElementById('advFillColor').value = e.target.value;
    updateLogo();
}

// Handle color change in advanced mode
function handleAdvColorChange(e) {
    adjustmentValues.fillColor = e.target.value;
    document.getElementById('fillColor').value = e.target.value;
    updateLogo();
}

// Handle top width slider change in advanced mode
function handleTopWidthChange(e) {
    const value = parseInt(e.target.value);
    document.getElementById('topWidthSliderValue').textContent = value;
    
    if (currentMode.topAdjustmentMode === 'outer') {
        adjustmentValues.topWidthOuter = value;
        // When changing outer points, don't reset inner points
    } else {
        adjustmentValues.topWidthInner = value;
        // When changing inner points, don't reset outer points
    }
    
    applyAdvancedAdjustments();
    updateLogo();
}

// Handle bottom width slider change in advanced mode
function handleBottomWidthChange(e) {
    const value = parseInt(e.target.value);
    document.getElementById('bottomWidthSliderValue').textContent = value;
    
    if (currentMode.bottomAdjustmentMode === 'outer') {
        adjustmentValues.bottomWidthOuter = value;
        // When changing outer points, don't reset inner points
    } else {
        adjustmentValues.bottomWidthInner = value;
        // When changing inner points, don't reset outer points
    }
    
    applyAdvancedAdjustments();
    updateLogo();
}

// Handle upper box slider change in advanced mode
function handleUpperBoxChange(e) {
    const value = parseInt(e.target.value);
    document.getElementById('upperBoxSliderValue').textContent = value;
    
    switch (currentMode.upperBoxMode) {
        case 'width':
            adjustmentValues.upperBoxWidth = value;
            // Don't reset other modes
            break;
        case 'thickness':
            adjustmentValues.upperBoxThickness = value;
            // Don't reset other modes
            break;
        case 'height':
            adjustmentValues.upperBoxHeight = value;
            // Don't reset other modes
            break;
    }
    
    applyAdvancedAdjustments();
    updateLogo();
}

// Handle lower box slider change in advanced mode
function handleLowerBoxChange(e) {
    const value = parseInt(e.target.value);
    document.getElementById('lowerBoxSliderValue').textContent = value;
    
    switch (currentMode.lowerBoxMode) {
        case 'height':
            adjustmentValues.lowerBoxHeight = value;
            // Don't reset other modes
            break;
        case 'width':
            adjustmentValues.lowerBoxWidth = value;
            // Don't reset other modes
            break;
        case 'thickness':
            adjustmentValues.lowerBoxThickness = value;
            // Don't reset other modes
            break;
    }
    
    applyAdvancedAdjustments();
    updateLogo();
}

// Apply chunky adjustments to points
function applyChunkyAdjustments() {
    const chunkyValue = adjustmentValues.chunkyValue || 0;
    
    if (chunkyValue === 0) return; // No adjustment needed
    
    // Reset to default first
    if (currentMode.mode === 'basic') {
        resetPointsToDefault();
    }
    
    // Apply chunky effect to top width (affects points 2, 7, 5, 10)
    // Outer points
    currentPoints[2].x = defaultPoints[2].x + chunkyValue * 0.5;
    currentPoints[7].x = defaultPoints[7].x - chunkyValue * 0.5;
    
    // Inner points
    currentPoints[5].x = defaultPoints[5].x - chunkyValue * 0.2;
    currentPoints[10].x = defaultPoints[10].x + chunkyValue * 0.2;
    
    // Apply chunky effect to bottom width (affects points 4, 8, 3, 9)
    // Outer points
    currentPoints[4].x = defaultPoints[4].x - chunkyValue * 0.5;
    currentPoints[8].x = defaultPoints[8].x + chunkyValue * 0.5;
    
    // Inner points
    currentPoints[3].x = defaultPoints[3].x + chunkyValue * 0.2;
    currentPoints[9].x = defaultPoints[9].x - chunkyValue * 0.2;
    
    // Apply chunky effect to upper box thickness
    currentPoints[11].y = defaultPoints[11].y + chunkyValue * 0.15;
    currentPoints[16].y = defaultPoints[16].y + chunkyValue * 0.15;
    currentPoints[13].y = defaultPoints[13].y - chunkyValue * 0.15;
    currentPoints[14].y = defaultPoints[14].y - chunkyValue * 0.15;
    
    // Apply chunky effect to lower box thickness
    currentPoints[17].y = defaultPoints[17].y + chunkyValue * 0.15;
    currentPoints[20].y = defaultPoints[20].y + chunkyValue * 0.15;
    currentPoints[18].y = defaultPoints[18].y - chunkyValue * 0.15;
    currentPoints[19].y = defaultPoints[19].y - chunkyValue * 0.15;
    
    // Store these values so they're preserved when switching to advanced mode
    if (currentMode.mode === 'basic') {
        adjustmentValues.topWidthOuter = chunkyValue * 0.5;
        adjustmentValues.topWidthInner = chunkyValue * 0.2;
        adjustmentValues.bottomWidthOuter = chunkyValue * 0.5;
        adjustmentValues.bottomWidthInner = chunkyValue * 0.2;
        adjustmentValues.upperBoxThickness = chunkyValue * 0.3;
        adjustmentValues.lowerBoxThickness = chunkyValue * 0.3;
    }
}

// Apply advanced mode adjustments
function applyAdvancedAdjustments() {
    // Reset points to original positions
    resetPointsToDefault();
    
    // Apply ALL adjustments regardless of current mode
    
    // Apply top width adjustments - CORRECTED POINT ASSIGNMENTS
    // Apply outer points adjustments
    const topWidthOuterValue = adjustmentValues.topWidthOuter || 0;
    currentPoints[2].x = defaultPoints[2].x + topWidthOuterValue;
    currentPoints[7].x = defaultPoints[7].x - topWidthOuterValue;
    
    // Apply inner points adjustments
    const topWidthInnerValue = adjustmentValues.topWidthInner || 0;
    currentPoints[5].x = defaultPoints[5].x - topWidthInnerValue;
    currentPoints[10].x = defaultPoints[10].x + topWidthInnerValue;
    
    // Apply bottom width adjustments - CORRECTED POINT ASSIGNMENTS
    // Apply outer points adjustments
    const bottomWidthOuterValue = adjustmentValues.bottomWidthOuter || 0;
    currentPoints[4].x = defaultPoints[4].x - bottomWidthOuterValue;
    currentPoints[8].x = defaultPoints[8].x + bottomWidthOuterValue;
    
    // Apply inner points adjustments
    const bottomWidthInnerValue = adjustmentValues.bottomWidthInner || 0;
    currentPoints[3].x = defaultPoints[3].x + bottomWidthInnerValue;
    currentPoints[9].x = defaultPoints[9].x - bottomWidthInnerValue;
    
    // Apply ALL upper box adjustments
    
    // Apply width adjustments
    const upperBoxWidthValue = adjustmentValues.upperBoxWidth || 0;
    currentPoints[11].x = defaultPoints[11].x + upperBoxWidthValue;
    currentPoints[13].x = defaultPoints[13].x + upperBoxWidthValue;
    currentPoints[14].x = defaultPoints[14].x - upperBoxWidthValue;
    currentPoints[16].x = defaultPoints[16].x - upperBoxWidthValue;
    
    // Apply thickness adjustments (fix: use default points as base)
    const upperBoxThicknessValue = adjustmentValues.upperBoxThickness || 0;
    if (upperBoxThicknessValue !== 0) {
        currentPoints[11].y = defaultPoints[11].y + upperBoxThicknessValue/2;
        currentPoints[16].y = defaultPoints[16].y + upperBoxThicknessValue/2;
        currentPoints[13].y = defaultPoints[13].y - upperBoxThicknessValue/2;
        currentPoints[14].y = defaultPoints[14].y - upperBoxThicknessValue/2;
    }
    
    // Apply height adjustments (fix: use default points as base)
    const upperBoxHeightValue = adjustmentValues.upperBoxHeight || 0;
    if (upperBoxHeightValue !== 0) {
        currentPoints[11].y = defaultPoints[11].y - upperBoxHeightValue;
        currentPoints[13].y = defaultPoints[13].y - upperBoxHeightValue;
        currentPoints[14].y = defaultPoints[14].y - upperBoxHeightValue;
        currentPoints[16].y = defaultPoints[16].y - upperBoxHeightValue;
    }
    
    // Apply ALL lower box adjustments
    
    // Apply height adjustments
    const lowerBoxHeightValue = adjustmentValues.lowerBoxHeight || 0;
    if (lowerBoxHeightValue !== 0) {
        currentPoints[17].y = defaultPoints[17].y + lowerBoxHeightValue; // Changed to + for proper direction
        currentPoints[18].y = defaultPoints[18].y - lowerBoxHeightValue; // Changed to - for proper direction
        currentPoints[19].y = defaultPoints[19].y - lowerBoxHeightValue; // Changed to - for proper direction
        currentPoints[20].y = defaultPoints[20].y + lowerBoxHeightValue; // Changed to + for proper direction
    }
    
    // Apply width adjustments (fix: use default points as base)
    const lowerBoxWidthValue = adjustmentValues.lowerBoxWidth || 0;
    if (lowerBoxWidthValue !== 0) {
        currentPoints[17].x = defaultPoints[17].x + lowerBoxWidthValue;
        currentPoints[18].x = defaultPoints[18].x + lowerBoxWidthValue;
        currentPoints[19].x = defaultPoints[19].x - lowerBoxWidthValue;
        currentPoints[20].x = defaultPoints[20].x - lowerBoxWidthValue;
    }
    
    // Apply thickness adjustments (fix: use default points as base and adjust correct points)
    const lowerBoxThicknessValue = adjustmentValues.lowerBoxThickness || 0;
    if (lowerBoxThicknessValue !== 0) {
        // Thickness should affect the vertical spacing between top and bottom points
        currentPoints[17].y = defaultPoints[17].y + lowerBoxThicknessValue/2;
        currentPoints[20].y = defaultPoints[20].y + lowerBoxThicknessValue/2;
        currentPoints[18].y = defaultPoints[18].y - lowerBoxThicknessValue/2;
        currentPoints[19].y = defaultPoints[19].y - lowerBoxThicknessValue/2;
    }
    
    // Apply chunky adjustments
    applyChunkyAdjustments();
}

// Reset points to default positions
function resetPointsToDefault() {
    Object.keys(defaultPoints).forEach(key => {
        currentPoints[key] = { ...defaultPoints[key] };
    });
}

// Reset basic adjustments
function resetBasicAdjustments() {
    // Reset slider values
    document.getElementById('cornerRadius').value = defaults.cornerRadiusValue || 0;
    document.getElementById('cornerRadiusValue').textContent = defaults.cornerRadiusValue || 0;
    document.getElementById('chunkySlider').value = defaults.chunkyValue || 0;
    document.getElementById('chunkySliderValue').textContent = defaults.chunkyValue || 0;
    document.getElementById('fillColor').value = defaults.fillColor || '#4A90E2';
    
    // Reset adjustment values
    adjustmentValues.cornerRadiusValue = defaults.cornerRadiusValue || 0;
    adjustmentValues.chunkyValue = defaults.chunkyValue || 0;
    adjustmentValues.fillColor = defaults.fillColor || '#4A90E2';
    
    // Reset points and update logo
    resetPointsToDefault();
    updateLogo();
}

// Reset advanced adjustments
function resetAdvancedAdjustments() {
    // Reset advanced slider values
    document.getElementById('topWidthSlider').value = 0;
    document.getElementById('topWidthSliderValue').textContent = 0;
    document.getElementById('bottomWidthSlider').value = 0;
    document.getElementById('bottomWidthSliderValue').textContent = 0;
    document.getElementById('upperBoxSlider').value = 0;
    document.getElementById('upperBoxSliderValue').textContent = 0;
    document.getElementById('lowerBoxSlider').value = 0;
    document.getElementById('lowerBoxSliderValue').textContent = 0;
    document.getElementById('advFillColor').value = defaults.fillColor || '#4A90E2';
    
    // Reset point selection
    document.getElementById('selectedPoint').value = '';
    document.getElementById('pointAdjustmentControls').style.display = 'none';
    
    // Reset adjustment values
    adjustmentValues.topWidthOuter = 0;
    adjustmentValues.topWidthInner = 0;
    adjustmentValues.bottomWidthOuter = 0;
    adjustmentValues.bottomWidthInner = 0;
    adjustmentValues.upperBoxWidth = 0;
    adjustmentValues.upperBoxThickness = 0;
    adjustmentValues.upperBoxHeight = 0;
    adjustmentValues.lowerBoxHeight = 0;
    adjustmentValues.lowerBoxWidth = 0;
    adjustmentValues.lowerBoxThickness = 0;
    adjustmentValues.fillColor = defaults.fillColor || '#4A90E2';
    
    // Reset points and update logo
    resetPointsToDefault();
    updateLogo();
}