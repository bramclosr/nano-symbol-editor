// Original point data with corrected assignments
const defaultPoints = {
    // First triangle
    2: {x: 380, y: 0},   // Top right corner of left triangle
    3: {x: 40, y: 588.9}, // Bottom left inner corner
    4: {x: 0, y: 588.9},  // Bottom left outer corner
    5: {x: 340, y: 0},    // Top left inner corner
    
    // Second triangle
    7: {x: 20, y: 0},     // Top right inner corner (swapped with 10)
    8: {x: 400, y: 588.9}, // Bottom right outer corner
    9: {x: 360, y: 588.9}, // Bottom right inner corner
    10: {x: 60, y: 0},     // Top left corner of right triangle (swapped with 7)
    
    // First box (upper box)
    11: {x: 360, y: 294.45}, // Top right
    13: {x: 360, y: 259.81}, // Bottom right
    14: {x: 40, y: 259.81},  // Bottom left
    16: {x: 40, y: 294.45},  // Top left
    
    // Second box (lower box)
    17: {x: 360, y: 398.37}, // Bottom right
    18: {x: 360, y: 363.73}, // Top right
    19: {x: 40, y: 363.73},  // Top left
    20: {x: 40, y: 398.37}   // Bottom left
};

// Create a copy for current points
let currentPoints = JSON.parse(JSON.stringify(defaultPoints));

// Default settings
const defaults = {
    fillColor: '#4A90E2',
    cornerRadius: '0',
    chunkyValue: 0,
    topWidthDelta: 0,
    bottomWidthDelta: 0,
    upperBoxDelta: 0,
    lowerBoxDelta: 0,
    topAdjustmentMode: 'outer',
    bottomAdjustmentMode: 'outer',
    upperBoxMode: 'width',
    lowerBoxMode: 'height',
    thicknessValue: 0,
    widthValue: 0,
    heightValue: 0,
    cornerRadiusValue: 0
};

// Settings object to track current adjustment modes
let settings = {
    topAdjustmentMode: 'outer', // 'outer' or 'inner'
    bottomAdjustmentMode: 'outer', // 'outer' or 'inner'
    upperBoxMode: 'width', // 'width', 'thickness', or 'height'
    lowerBoxMode: 'height', // 'height', 'width', or 'thickness'
    cornerRadius: 0,
    chunkyValue: 0
};

// Store separate adjustment values for each mode
let adjustmentValues = {
    topWidthOuter: 0,
    topWidthInner: 0,
    bottomWidthOuter: 0,
    bottomWidthInner: 0,
    upperBoxWidth: 0,
    upperBoxThickness: 0,
    upperBoxHeight: 0,
    lowerBoxHeight: 0,
    lowerBoxWidth: 0,
    lowerBoxThickness: 0,
    chunkyValue: 0,
    thicknessValue: 0,
    widthValue: 0,
    heightValue: 0,
    cornerRadiusValue: 0,
    fillColor: '#4A90E2'
};