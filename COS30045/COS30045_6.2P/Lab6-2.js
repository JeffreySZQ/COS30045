// Initialize the chart
function init() {
    var w = 500; // Width of the SVG container
    var h = 150; // Height of the SVG container

    // Initial dataset for the bar chart
    var dataset = [14, 5, 26, 23, 9, 10, 28, 3, 7, 13];

    // Create a band scale for the x-axis
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length)) // Set domain based on the number of data points
        .rangeRound([0, w]) // Map to the width of the SVG
        .paddingInner(0.05); // Padding between bars

    // Create a linear scale for the y-axis
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)]) // Domain from 0 to maximum value in the dataset
        .range([0, h]); // Map to the height of the SVG

    // Create the SVG container
    var svg = d3.select("#rec") // Select the DOM element with id 'rec'
        .append("svg") // Append an SVG element
        .attr("width", w) // Set the width of the SVG
        .attr("height", h); // Set the height of the SVG

    // Create bars for each data point in the dataset
    var bars = svg.selectAll("rect")
        .data(dataset) // Bind data to rectangles
        .enter() // Enter selection for new data points
        .append("rect") // Append rectangles for each data point
        .attr("x", function(d, i) {
            return xScale(i); // Set x position based on index
        })
        .attr("y", function(d) {
            return h - yScale(d); // Set y position based on value
        })
        .attr("width", xScale.bandwidth()) // Set width of each bar
        .attr("height", function(d) {
            return yScale(d); // Set height based on value
        })
        .attr("fill", "rgb(255,192,203)") // Set fill color for bars
        // Add mouseover event to show tooltip
        .on("mouseover", function(event, d) {
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2; // Center the tooltip
            var yPosition = parseFloat(d3.select(this).attr("y")) + 15; // Position the tooltip inside the bar

            // Append a text element for the tooltip
            svg.append("text")
                .attr("id", "tooltip") // Set id for the tooltip
                .attr("x", xPosition) // Set x position
                .attr("y", yPosition) // Set y position
                .text(d) // Set the text to display the value
                .attr("font-size", "12px") // Set font size
                .attr("fill", "black") // Set text color
                .attr("text-anchor", "middle"); // Center the text horizontally

            // Change the bar color on hover
            d3.select(this)
                .attr("fill", "orange");
        })
        // Add mouseout event to hide tooltip
        .on("mouseout", function() {
            d3.select("#tooltip").remove(); // Remove the tooltip text on mouseout
            d3.select(this)
                .attr("fill", "rgb(255,192,203)"); // Reset bar color
        });

    // Add new data on button click
    d3.select("#addButton")
        .on("click", function() {
            var maxValue = 25; // Maximum value for new data
            var newNumber = Math.floor(Math.random() * maxValue); // Generate random value
            dataset.push(newNumber); // Add new number to the dataset
            updateBars(); // Call the function to update bars
        });

    // Remove data on button click
    d3.select("#removeButton")
        .on("click", function() {
            dataset.pop(); // Remove the last element from the dataset
            updateBars(); // Call the function to update bars
        });

    // Track sorting order
    var isAscending = true; // Variable to track sorting order

    // Sort bars on button click
    d3.select("#sortButton")
        .on("click", function() {
            if (isAscending) {
                dataset.sort(d3.ascending); // Sort in ascending order
            } else {
                dataset.sort(d3.descending); // Sort in descending order
            }
            isAscending = !isAscending; // Toggle sorting order
            updateBars(); // Update bars after sorting
        });

    // Update bars and scales function
    function updateBars() {
        xScale.domain(d3.range(dataset.length)); // Update x-scale domain based on new dataset length
        
        // Bind updated dataset to rectangles
        bars = svg.selectAll("rect")
            .data(dataset, (d, i) => i); // Use index as key for data join

        // Enter selection for new bars
        var newBars = bars.enter()
            .append("rect") // Append new rectangles
            .attr("x", w) // Start outside of view
            .attr("y", function(d) {
                return h - yScale(d); // Set y position based on new value
            })
            .attr("width", xScale.bandwidth()) // Set width of each bar
            .attr("height", function(d) {
                return yScale(d); // Set height based on new value
            })
            .attr("fill", "rgb(255,192,203)"); // Set fill color for new bars

        // Attach mouseover and mouseout event listeners to new bars
        newBars.on("mouseover", function(event, d) {
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2; // Center the tooltip
            var yPosition = parseFloat(d3.select(this).attr("y")) + 15; // Position the tooltip inside the bar

            // Append the text element for the tooltip
            svg.append("text")
                .attr("id", "tooltip") // Set id for the tooltip
                .attr("x", xPosition) // Set x position
                .attr("y", yPosition) // Set y position
                .text(d) // Set the text to display the value
                .attr("font-size", "12px") // Set font size
                .attr("fill", "black") // Set text color
                .attr("text-anchor", "middle"); // Center the text horizontally

            // Change the bar color on hover
            d3.select(this)
                .attr("fill", "orange");
        })
        .on("mouseout", function() {
            d3.select("#tooltip").remove(); // Remove the tooltip text on mouseout
            d3.select(this)
                .attr("fill", "rgb(255,192,203)"); // Reset bar color
        });

        // Merge existing bars with new bars
        bars.merge(newBars) // Merge new bars with existing ones
            .transition() // Apply transition for smooth updates
            .duration(500) // Set duration for the transition
            .attr("x", function(d, i) {
                return xScale(i); // Update x position based on index
            })
            .attr("y", function(d) {
                return h - yScale(d); // Update y position based on value
            })
            .attr("width", xScale.bandwidth()) // Update width of each bar
            .attr("height", function(d) {
                return yScale(d); // Update height based on value
            });

        // Exit selection for removed bars
        bars.exit()
            .transition() // Apply transition for smooth removal
            .duration(500) // Set duration for the transition
            .attr("x", w) // Move the bar out of view
            .remove(); // Remove the element from the DOM
    }
}

// Execute the init function when the window loads
window.onload = init;
