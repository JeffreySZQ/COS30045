// Set up SVG dimensions and dataset
var w = 500; // Width of the SVG container
var h = 150; // Height of the SVG container
var barPadding = 3; // Padding between bars
var dataset = [14, 5, 26, 23, 9, 14, 5, 26, 23, 9]; // Initial dataset

// Create a band scale for the x-axis
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length)) // Domain based on the number of data points
    .range([0, w]) // Map to the width of the SVG
    .paddingInner(0.05); // Padding between bars

// Create SVG container
var svg1 = d3.select("article.content")
    .append("svg")
    .attr("width", w) // Set width of SVG
    .attr("height", h); // Set height of SVG

// Add an x-axis to the SVG using d3.axisBottom()
var xAxis = d3.axisBottom(xScale);

svg1.append("g")
    .attr("transform", "translate(0," + h + ")") // Position the x-axis at the bottom
    .call(xAxis); // Call the x-axis to render it

// Draw bars for each data point in the dataset
var bars = svg1.selectAll("rect")
    .data(dataset) // Bind data to rectangles
    .enter() // Enter selection for new data points
    .append("rect") // Append rectangles for each data point
    .attr("x", function (d, i) {
        return xScale(i); // Set x position based on index
    })
    .attr("y", function (d) {
        return h - (d * 4); // Set y position based on value (scaled)
    })
    .attr("width", xScale.bandwidth()) // Set width of each bar
    .attr("height", function (d) {
        return d * 4; // Set height based on value (scaled)
    })
    .attr("fill", "rgb(106, 90, 205)"); // Set fill color for bars

// Add text labels inside the bars
var textLabels = svg1.selectAll("text")
    .data(dataset) // Bind data to text elements
    .enter() // Enter selection for new labels
    .append("text") // Append text elements for labels
    .text(function (d, i) { // Include index in the label
        return d + ' (' + i + ')'; // Show value and index
    })
    .attr("fill", "white") // Change text color for visibility
    .attr("x", function (d, i) {
        return xScale(i) + xScale.bandwidth() / 2; // Center text horizontally
    })
    .attr("text-anchor", "middle") // Center the text
    .attr("y", function (d) {
        return h - (d * 4) + 15; // Position text inside the bar
    });

// Function to update bars and labels with new dataset and easing function
function updateBars(newDataset, easingFunction) {
    // Update the text labels
    var labels = svg1.selectAll("text")
        .data(newDataset); // Bind new data to text elements

    labels.enter() // Enter selection for new labels
        .append("text") // Append new text elements
        .merge(labels) // Merge with existing labels for updates
        .transition() // Apply transition for smooth updates
        .duration(2000) // Set duration for the transition
        .ease(easingFunction) // Apply easing function for the transition
        .text(function (d, i) { // Update text to include index
            return d + ' (' + i + ')'; // Show value and index
        })
        .attr("x", function (d, i) {
            return xScale(i) + xScale.bandwidth() / 2; // Center text horizontally
        })
        .attr("y", function (d) {
            return h - (d * 4) + 15; // Position text inside the bar
        });

    labels.exit().remove(); // Remove labels for data that no longer exists

    // Update the bars
    var bars = svg1.selectAll("rect")
        .data(newDataset); // Bind new data to rectangles

    bars.enter() // Enter selection for new bars
        .append("rect") // Append new rectangles
        .merge(bars) // Merge with existing bars for updates
        .transition() // Apply transition for smooth updates
        .duration(2000) // Set duration for the transition
        .ease(easingFunction) // Apply easing function for the transition
        .attr("y", function (d) {
            return h - (d * 4); // Update y position based on new value
        })
        .attr("height", function (d) {
            return d * 4; // Update height based on new value
        });

    bars.exit().remove(); // Remove bars for data that no longer exists
}

// Event handler for the default update button
d3.select("#updateButton").on("click", function () {
    // Generate a new random dataset
    var newDataset = [];
    for (var i = 0; i < dataset.length; i++) {
        newDataset.push(Math.floor(Math.random() * 25)); // Random values between 0 and 24
    }
    updateBars(newDataset, d3.easeCubicInOut); // Update bars with default easing function
});

// Event handler for the easeCircleButton
d3.select("#easeCircleButton").on("click", function () {
    // Generate a new random dataset
    var newDataset = [];
    for (var i = 0; i < dataset.length; i++) {
        newDataset.push(Math.floor(Math.random() * 25)); // Random values between 0 and 24
    }
    updateBars(newDataset, d3.easeCircleOut); // Update bars with circle easing function
});

// Event handler for the easeElasticButton
d3.select("#easeElasticButton").on("click", function () {
    // Generate a new random dataset
    var newDataset = [];
    for (var i = 0; i < dataset.length; i++) {
        newDataset.push(Math.floor(Math.random() * 25)); // Random values between 0 and 24
    }
    updateBars(newDataset, d3.easeElasticOut); // Update bars with elastic easing function
});
