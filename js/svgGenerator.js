// Function to create SVG content with the current points and settings
function createSvgContent(points, showPoints = false, cornerRadius = 0) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   viewBox="-50 -50 500 690"
   width="500" 
   height="690"
   version="1.1"
   id="svg5"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <title id="title1">Customized Logo</title>
  <defs>
    <style id="style1">
      .logo-path {
        fill: ${document.getElementById('fillColor').value};
        stroke: none;
      }
      .box-shape {
        fill: ${document.getElementById('fillColor').value};
        stroke: none;
      }
      .point {
        fill: red;
        r: 4;
      }
      .point-label {
        font-size: 12px;
        font-weight: bold;
        fill: #000;
        text-anchor: middle;
      }
    </style>
  </defs>
  
  <!-- Triangle shapes with rx and ry attributes for corner rounding -->
  <path
     class="box-shape"
     d="M ${points[5].x},${points[5].y} H ${points[2].x} L ${points[3].x},${points[3].y} H ${points[4].x} L ${points[5].x},${points[5].y} Z"
     id="path2" />
  <path
     class="box-shape"
     d="M ${points[10].x},${points[10].y} H ${points[7].x} L ${points[8].x},${points[8].y} H ${points[9].x} L ${points[10].x},${points[10].y} Z"
     id="path3" />
  
  <!-- Box shapes with rx and ry attributes for corner rounding -->
  <rect
     class="box-shape"
     x="${points[14].x}"
     y="${points[13].y}"
     width="${points[11].x - points[14].x}"
     height="${points[16].y - points[13].y}"
     rx="${cornerRadius}"
     ry="${cornerRadius}"
     id="path4" />
  <rect
     class="box-shape"
     x="${points[19].x}"
     y="${points[18].y}"
     width="${points[17].x - points[19].x}"
     height="${points[20].y - points[18].y}"
     rx="${cornerRadius}"
     ry="${cornerRadius}"
     id="path5" />
     
  ${showPoints ? `
  <!-- Point markers -->
  ${Object.entries(points).map(([id, point]) => `
  <circle class="point" cx="${point.x}" cy="${point.y}" r="4"/>
  <text class="point-label" x="${point.x + (point.x > 200 ? 15 : -15)}" y="${point.y + (point.y < 50 ? -10 : (point.y > 550 ? 20 : 5))}">${id}</text>
  `).join('')}
  ` : ''}
</svg>`;
}

// Function to update the logo SVG in the preview area
function updateLogo() {
    // Get corner radius value
    const cornerRadius = parseInt(document.getElementById('cornerRadius').value);
    
    // Get fill color
    const fillColor = document.getElementById(currentMode.mode === 'basic' ? 'fillColor' : 'advFillColor').value;
    
    // Generate SVG with current settings
    const logoPreview = document.getElementById('logoPreview');
    
    // Clear previous content
    logoPreview.innerHTML = '';
    
    // Generate and append new SVG
    const svgElement = generateSvg(currentPoints, fillColor, cornerRadius);
    logoPreview.appendChild(svgElement);
    
    // Apply current zoom level
    if (typeof applyZoom === 'function') {
        applyZoom();
    }
}

// Function to download the SVG
function downloadSvg() {
    // Get corner radius value
    const cornerRadius = parseInt(document.getElementById('cornerRadius').value);
    
    // Get fill color
    const fillColor = document.getElementById(currentMode.mode === 'basic' ? 'fillColor' : 'advFillColor').value;
    
    // Generate SVG with current settings but without point markers
    const svgElement = generateSvg(currentPoints, fillColor, cornerRadius);
    
    // Remove any point markers for download
    const pointsGroup = svgElement.querySelector('g:last-child');
    if (pointsGroup && currentMode.mode === 'advanced' && document.getElementById('showPointsAdvanced').checked) {
        svgElement.removeChild(pointsGroup);
    }
    
    // Convert SVG to string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    
    // Add XML declaration
    const svgForDownload = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' + svgString;
    
    // Create a Blob with the SVG content
    const blob = new Blob([svgForDownload], {type: 'image/svg+xml'});
    
    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'custom_nano_symbol.svg';
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Generate SVG path from points
function generateSvgPath(points, cornerRadius) {
    if (!points || points.length === 0) return '';
    
    let path = '';
    const cornerPoints = [2, 4, 7, 8]; // Triangle corner points that should be rounded
    
    // Function to create a rounded corner
    function createRoundedCorner(p1, p2, p3, radius) {
        // Safety check for undefined points
        if (!p1 || !p2 || !p3) return ` L ${p2 ? p2.x : 0},${p2 ? p2.y : 0}`;
        
        // Calculate vectors
        const v1 = {
            x: p1.x - p2.x,
            y: p1.y - p2.y
        };
        const v2 = {
            x: p3.x - p2.x,
            y: p3.y - p2.y
        };
        
        // Normalize vectors
        const len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
        
        // Safety check for zero-length vectors
        if (len1 === 0 || len2 === 0) return ` L ${p2.x},${p2.y}`;
        
        const nv1 = {
            x: v1.x / len1,
            y: v1.y / len1
        };
        const nv2 = {
            x: v2.x / len2,
            y: v2.y / len2
        };
        
        // Calculate control points
        const cp1 = {
            x: p2.x + nv1.x * radius,
            y: p2.y + nv1.y * radius
        };
        const cp2 = {
            x: p2.x + nv2.x * radius,
            y: p2.y + nv2.y * radius
        };
        
        return `L ${cp1.x},${cp1.y} Q ${p2.x},${p2.y} ${cp2.x},${cp2.y}`;
    }
    
    // Ensure first point exists
    if (!points[0]) return '';
    
    // Start with the first point
    path = `M ${points[0].x},${points[0].y}`;
    
    // Add the rest of the points
    for (let i = 1; i < points.length; i++) {
        const prevIndex = (i - 1) % points.length;
        const currentIndex = i % points.length;
        const nextIndex = (i + 1) % points.length;
        
        // Safety check for undefined points
        if (!points[prevIndex] || !points[currentIndex] || !points[nextIndex]) {
            continue;
        }
        
        const prevPoint = points[prevIndex];
        const currentPoint = points[currentIndex];
        const nextPoint = points[nextIndex];
        
        // Check if this is a corner point that should be rounded
        if (cornerRadius > 0 && 
            (cornerPoints.includes(currentIndex) || 
             (currentIndex >= 11 && currentIndex <= 20))) { // Box corners
            
            path += createRoundedCorner(prevPoint, currentPoint, nextPoint, cornerRadius);
        } else {
            path += ` L ${currentPoint.x},${currentPoint.y}`;
        }
    }
    
    // Close the path
    path += ' Z';
    
    return path;
}

// Generate SVG from points
function generateSvg(points, fillColor, cornerRadius) {
    // Create SVG element
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    
    // Safety check for points
    if (!points || Object.keys(points).length === 0) {
        // Create a placeholder SVG with error message
        svg.setAttribute("viewBox", "0 0 400 200");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        
        const textElement = document.createElementNS(svgNS, "text");
        textElement.setAttribute("x", "50%");
        textElement.setAttribute("y", "50%");
        textElement.setAttribute("text-anchor", "middle");
        textElement.setAttribute("fill", "red");
        textElement.setAttribute("font-size", "16px");
        textElement.textContent = "Error: No points available to render SVG";
        
        svg.appendChild(textElement);
        return svg;
    }
    
    // Find min and max coordinates to set viewBox
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    Object.values(points).forEach(point => {
        if (point && typeof point.x === 'number' && typeof point.y === 'number') {
            minX = Math.min(minX, point.x);
            minY = Math.min(minY, point.y);
            maxX = Math.max(maxX, point.x);
            maxY = Math.max(maxY, point.y);
        }
    });
    
    // If we couldn't find valid min/max values
    if (minX === Infinity || minY === Infinity || maxX === -Infinity || maxY === -Infinity) {
        svg.setAttribute("viewBox", "0 0 400 200");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        
        const textElement = document.createElementNS(svgNS, "text");
        textElement.setAttribute("x", "50%");
        textElement.setAttribute("y", "50%");
        textElement.setAttribute("text-anchor", "middle");
        textElement.setAttribute("fill", "red");
        textElement.setAttribute("font-size", "16px");
        textElement.textContent = "Error: Invalid point coordinates";
        
        svg.appendChild(textElement);
        return svg;
    }
    
    // Add some padding
    const padding = 20;
    minX -= padding;
    minY -= padding;
    maxX += padding;
    maxY += padding;
    
    // Set SVG attributes with zoomed out viewBox
    svg.setAttribute("viewBox", "-50 -50 500 700");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    
    // Create groups for each shape
    const triangleGroup = document.createElementNS(svgNS, "g");
    const boxGroup = document.createElementNS(svgNS, "g");
    
    // Ensure all required points exist
    const requiredPoints = [2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 19, 20];
    const allPointsExist = requiredPoints.every(index => points[index] && 
                                                typeof points[index].x === 'number' && 
                                                typeof points[index].y === 'number');
    
    if (!allPointsExist) {
        const textElement = document.createElementNS(svgNS, "text");
        textElement.setAttribute("x", "50%");
        textElement.setAttribute("y", "50%");
        textElement.setAttribute("text-anchor", "middle");
        textElement.setAttribute("fill", "red");
        textElement.setAttribute("font-size", "16px");
        textElement.textContent = "Error: Missing required points";
        
        svg.appendChild(textElement);
        return svg;
    }
    
    // Create triangle paths based on the nano_congruant.svg file
    const leftTrianglePoints = [
        points[5], // Top left inner
        points[2], // Top right outer
        points[3], // Bottom left inner
        points[4], // Bottom left outer
    ];

    const rightTrianglePoints = [
        points[7], // Top right inner
        points[10], // Top left outer
        points[8], // Bottom right outer
        points[9], // Bottom right inner
    ];
    
    const leftTrianglePath = document.createElementNS(svgNS, "path");
    const leftTrianglePathD = `M ${points[5].x},${points[5].y} H ${points[2].x} L ${points[3].x},${points[3].y} H ${points[4].x} L ${points[5].x},${points[5].y} Z`;
    leftTrianglePath.setAttribute("d", cornerRadius > 0 ? generateSvgPath(leftTrianglePoints, cornerRadius) : leftTrianglePathD);
    leftTrianglePath.setAttribute("fill", fillColor);

    const rightTrianglePath = document.createElementNS(svgNS, "path");
    const rightTrianglePathD = `M ${points[7].x},${points[7].y} H ${points[10].x} L ${points[8].x},${points[8].y} H ${points[9].x} L ${points[7].x},${points[7].y} Z`;
    rightTrianglePath.setAttribute("d", cornerRadius > 0 ? generateSvgPath(rightTrianglePoints, cornerRadius) : rightTrianglePathD);
    rightTrianglePath.setAttribute("fill", fillColor);
    
    // Create box paths based on the nano_congruant.svg file
    const upperBoxPoints = [points[11], points[13], points[14], points[16]];
    const lowerBoxPoints = [points[17], points[18], points[19], points[20]];
    
    const upperBoxPath = document.createElementNS(svgNS, "path");
    const upperBoxPathD = `M ${points[11].x},${points[11].y} V ${points[13].y} H ${points[14].x} V ${points[16].y} Z`;
    upperBoxPath.setAttribute("d", cornerRadius > 0 ? generateSvgPath(upperBoxPoints, cornerRadius) : upperBoxPathD);
    upperBoxPath.setAttribute("fill", fillColor);
    
    const lowerBoxPath = document.createElementNS(svgNS, "path");
    const lowerBoxPathD = `M ${points[17].x},${points[17].y} V ${points[18].y} H ${points[19].x} V ${points[20].y} Z`;
    lowerBoxPath.setAttribute("d", cornerRadius > 0 ? generateSvgPath(lowerBoxPoints, cornerRadius) : lowerBoxPathD);
    lowerBoxPath.setAttribute("fill", fillColor);
    
    // Add paths to groups
    triangleGroup.appendChild(leftTrianglePath);
    triangleGroup.appendChild(rightTrianglePath);
    boxGroup.appendChild(upperBoxPath);
    boxGroup.appendChild(lowerBoxPath);
    
    // Add groups to SVG
    svg.appendChild(triangleGroup);
    svg.appendChild(boxGroup);
    
    // Add point markers if in advanced mode with points visible
    if (currentMode.mode === 'advanced' && document.getElementById('showPointsAdvanced').checked) {
        const pointsGroup = document.createElementNS(svgNS, "g");
        
        Object.entries(points).forEach(([key, point]) => {
            if (!point || typeof point.x !== 'number' || typeof point.y !== 'number') return;
            
            // Create point marker
            const circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("cx", point.x);
            circle.setAttribute("cy", point.y);
            circle.setAttribute("r", "5");
            circle.setAttribute("fill", "red");
            circle.setAttribute("stroke", "white");
            circle.setAttribute("stroke-width", "2");
            circle.setAttribute("class", "point-marker");
            circle.setAttribute("data-point-id", key);
            
            // Create point label
            const text = document.createElementNS(svgNS, "text");
            text.setAttribute("x", point.x + 10);
            text.setAttribute("y", point.y - 10);
            text.setAttribute("fill", "black");
            text.setAttribute("font-size", "12px");
            text.setAttribute("font-weight", "bold");
            text.textContent = key;
            
            pointsGroup.appendChild(circle);
            pointsGroup.appendChild(text);
        });
        
        svg.appendChild(pointsGroup);
    }
    
    return svg;
}