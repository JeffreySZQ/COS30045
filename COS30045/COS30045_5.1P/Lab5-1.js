// Set dimensions for the SVG container
var w = 500; // Width of the SVG
var h = 100; // Height of the SVG
var barPadding = 3; // Padding between bars

// Initial dataset for the bar chart
var dataset = [12, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];

// Create an SVG element in the body
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

// Function to draw bars based on the dataset
function drawBars(data) {
    // Create x-scale using a band scale for positioning bars
    var xscale = d3.scaleBand()
                    .domain(d3.range(data.length)) // Create domain based on data length
                    .range([0, w]) // Map to width of SVG
                    .paddingInner(0.05); // Padding between bars

    // Create y-scale using a linear scale for height of bars
    var yscale = d3.scaleLinear()
                    .domain([0, d3.max(data)]) // Domain from 0 to maximum value in data
                    .range([h, 0]); // Invert range to have higher values at the top

    // Create bars for the dataset
    var bars = svg.selectAll("rect")
                    .data(data); // Bind data to rectangles

    // Enter selection: create bars for new data
    bars.enter()
        .append("rect")
        .merge(bars) // Merge with existing bars for updates
        .attr("x", function(d, i) {
            return xscale(i); // Set x position based on index
        })
        .attr("y", function(d) {
            return yscale(d); // Set y position based on value
        })
        .attr("width", xscale.bandwidth()) // Set width of each bar
        .attr("height", function(d) {
            return h - yscale(d); // Set height based on y-scale
        })
        .attr("fill", "rgb(106,90,205)"); // Set fill color for bars

    // Add text labels to the bars
    var labels = svg.selectAll("text")
                    .data(data); // Bind data to text elements

    // Enter selection: create labels for new data
    labels.enter()
        .append("text")
        .merge(labels) // Merge with existing labels for updates
        .text(function(d) {
            return d; // Set text to the value of the data
        })
        .attr("x", function(d, i) {
            return xscale(i) + xscale.bandwidth() / 2; // Center text in the bar
        })
        .attr("y", function(d) {
            return yscale(d) + 15; // Position text above the bar
        })
        .attr("fill", "black") // Set fill color for text
        .attr("text-anchor", "middle"); // Center the text

    // Remove any old bars and labels that are no longer needed
    bars.exit().remove();
    labels.exit().remove();
}

// Draw the initial chart with the dataset
drawBars(dataset);

// Button click event to update the dataset
d3.select("#updateButton").on("click", function() {
    // Update the dataset with new random values between 0 and 29
    dataset = dataset.map(function() {
        return Math.floor(Math.random() * 30); // Generate new random values
    });

    // Redraw the chart with the updated dataset
    drawBars(dataset);
});
