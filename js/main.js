document.addEventListener('DOMContentLoaded', function() {
    // Initialize default points and current points
    initializePoints();
    
    // Set up event listeners for adjustments
    setupAdjustmentListeners();
    
    // Initialize UI elements
    initializeUI();
    
    // Generate initial logo
    updateLogo();
});

// Initialize the zoom level
let currentZoom = 1.0;
const zoomStep = 0.1;
const minZoom = 0.5;
const maxZoom = 2.0;

// Set up zoom controls
function setupZoomControls() {
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const resetZoom = document.getElementById('resetZoom');
    
    zoomIn.addEventListener('click', () => {
        if (currentZoom < maxZoom) {
            currentZoom += zoomStep;
            applyZoom();
        }
    });
    
    zoomOut.addEventListener('click', () => {
        if (currentZoom > minZoom) {
            currentZoom -= zoomStep;
            applyZoom();
        }
    });
    
    resetZoom.addEventListener('click', () => {
        currentZoom = 1.0;
        applyZoom();
    });
}

// Apply the current zoom level to the SVG
function applyZoom() {
    const logoPreview = document.getElementById('logoPreview');
    const svgElement = logoPreview.querySelector('svg');
    
    if (svgElement) {
        svgElement.style.transform = `scale(${currentZoom})`;
        svgElement.style.transformOrigin = 'center center';
    }
}

// Initialize UI elements with default values
function initializeUI() {
    // Set initial values for sliders
    document.getElementById('cornerRadius').value = defaults.cornerRadiusValue || 0;
    document.getElementById('cornerRadiusValue').textContent = defaults.cornerRadiusValue || 0;
    
    document.getElementById('chunkySlider').value = defaults.chunkyValue || 0;
    document.getElementById('chunkySliderValue').textContent = defaults.chunkyValue || 0;
    
    // Set initial color
    document.getElementById('fillColor').value = defaults.fillColor || '#4A90E2';
    
    // Set initial mode to basic
    setMode('basic');
    
    // Hide point numbers by default
    document.getElementById('showPointsAdvanced').checked = false;
    
    // Setup zoom controls
    setupZoomControls();
}

// Initialize the points data
function initializePoints() {
    // Create a deep copy of the default points
    Object.keys(defaultPoints).forEach(key => {
        currentPoints[key] = { ...defaultPoints[key] };
    });
}

// Set up dragging functionality for points in advanced mode
function setupPointDragging() {
    const logoPreview = document.getElementById('logoPreview');
    
    // Variables to track dragging state
    let isDragging = false;
    let selectedPoint = null;
    let offsetX = 0;
    let offsetY = 0;
    
    // Add event listeners for mouse interactions
    logoPreview.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    // Function to start dragging a point
    function startDrag(e) {
        if (currentMode.mode !== 'advanced') return;
        
        // Get the SVG element
        const svgElement = logoPreview.querySelector('svg');
        if (!svgElement) return; // Exit if no SVG element found
        
        // Get the SVG element's position and dimensions
        const svgRect = svgElement.getBoundingClientRect();
        if (!svgRect) return;
        
        // Calculate the mouse position relative to the SVG
        const mouseX = e.clientX - svgRect.left;
        const mouseY = e.clientY - svgRect.top;
        
        // Get the SVG viewBox values
        const viewBox = svgElement.getAttribute('viewBox');
        if (!viewBox) return;
        
        const [minX, minY, width, height] = viewBox.split(' ').map(Number);
        
        // Check if the mouse is over a point
        for (const [id, point] of Object.entries(currentPoints)) {
            if (!point || typeof point.x !== 'number' || typeof point.y !== 'number') continue;
            
            // Convert point coordinates to screen coordinates
            const pointX = (point.x - minX) * (svgRect.width / width);
            const pointY = (point.y - minY) * (svgRect.height / height);
            
            // Check if the mouse is within the point's hit area
            const distance = Math.sqrt(Math.pow(mouseX - pointX, 2) + Math.pow(mouseY - pointY, 2));
            if (distance < 15) { // Increased hit area for easier selection
                isDragging = true;
                selectedPoint = id;
                offsetX = mouseX - pointX;
                offsetY = mouseY - pointY;
                break;
            }
        }
    }
    
    // Function to drag a point
    function drag(e) {
        if (!isDragging || !selectedPoint) return;
        
        // Get the SVG element
        const svgElement = logoPreview.querySelector('svg');
        if (!svgElement) return; // Exit if no SVG element found
        
        // Get the SVG element's position and dimensions
        const svgRect = svgElement.getBoundingClientRect();
        if (!svgRect) return;
        
        // Get the SVG viewBox values
        const viewBox = svgElement.getAttribute('viewBox');
        if (!viewBox) return;
        
        const [minX, minY, width, height] = viewBox.split(' ').map(Number);
        
        // Calculate the new point position
        const mouseX = e.clientX - svgRect.left - offsetX;
        const mouseY = e.clientY - svgRect.top - offsetY;
        
        // Convert screen coordinates to SVG coordinates
        const newX = (mouseX * width / svgRect.width) + minX;
        const newY = (mouseY * height / svgRect.height) + minY;
        
        // Update the point's position
        currentPoints[selectedPoint].x = newX;
        currentPoints[selectedPoint].y = newY;
        
        // Update the logo
        updateLogo();
    }
    
    // Function to end dragging
    function endDrag() {
        isDragging = false;
        selectedPoint = null;
    }
}