// Initialize the chart
function init() {
    var w = 500; // Width of the SVG container
    var h = 150; // Height of the SVG container

    // Initial dataset for the bar chart
    var dataset = [14, 5, 26, 23, 9, 10, 28, 3, 7, 13];

    // Create a band scale for the x-axis
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length)) // Set domain based on number of data points
        .rangeRound([0, w]) // Map to the width of the SVG
        .paddingInner(0.05); // Padding between bars

    // Create a linear scale for the y-axis
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)]) // Domain from 0 to maximum value in dataset
        .range([0, h]); // Map to height of the SVG

    // Create SVG container for the chart
    var svg = d3.select("#rec") // Select the DOM element with id 'rec'
        .append("svg") // Append SVG element
        .attr("width", w) // Set width of SVG
        .attr("height", h); // Set height of SVG

    // Draw bars for each data point in the dataset
    svg.selectAll("rect")
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
        .attr("fill", "rgb(255,192,203)"); // Apply fill color to bars

    // Add text labels inside the bars
    svg.selectAll("text")
        .data(dataset) // Bind data to text elements
        .enter() // Enter selection for new labels
        .append("text") // Append text elements for labels
        .text(function(d) {
            return d; // Set text to the value of the data
        })
        .attr("fill", "black") // Change text color for visibility
        .attr("text-anchor", "middle") // Center the text
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2; // Center text horizontally
        })
        .attr("y", function(d) {
            return h - yScale(d) + 14; // Position text slightly below the top of the bar
        });

    // Add new data on button click
    d3.select("#addButton")
    .on("click", function() {
        var maxValue = 25; // Maximum value for new data
        var newNumber = Math.floor(Math.random() * maxValue); // Generate random value
        dataset.push(newNumber); // Add new number to the dataset
        xScale.domain(d3.range(dataset.length)); // Update x-scale domain

        // Update bars
        var bars = svg.selectAll("rect")
            .data(dataset); // Bind updated dataset to rectangles

        bars.enter() // Enter selection for new bars
            .append("rect") // Append new rectangles
            .attr("x", w) // Start from the right side (out of view)
            .attr("y", function(d) {
                return h - yScale(d); // Set y position based on new value
            })
            .attr("width", xScale.bandwidth()) // Set width of each bar
            .attr("height", function(d) {
                return yScale(d); // Set height based on new value
            })
            .attr("fill", "rgb(255,192,203)") // Set fill color for new bars
            .merge(bars) // Merge with existing bars for updates
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

        // Update text labels
        var texts = svg.selectAll("text")
            .data(dataset); // Bind updated dataset to text elements

        texts.enter() // Enter selection for new text labels
            .append("text") // Append new text elements
            .attr("x", w) // Start the text from the far right, will move it later
            .attr("y", function(d) {
                return h - yScale(d) + 14; // Set y position based on value
            })
            .merge(texts) // Merge with existing text for updates
            .transition() // Apply transition for smooth updates
            .duration(500) // Set duration for the transition
            .text(function(d) {
                return d; // Update text to the new value
            })
            .attr("x", function(d, i) {
                return xScale(i) + xScale.bandwidth() / 2; // Center the text horizontally
            })
            .attr("y", function(d) {
                return h - yScale(d) + 14; // Position text slightly below the top of the bar
            })
            .attr("text-anchor", "middle"); // Align the text in the middle horizontally
    });

    // Remove data on button click
    d3.select("#removeButton")
        .on("click", function() {
            dataset.pop(); // Remove the last element from the dataset
            xScale.domain(d3.range(dataset.length)); // Update x-scale domain

            // Update bars
            var bars = svg.selectAll("rect")
                .data(dataset); // Bind updated dataset to rectangles

            bars.exit() // Exit selection for removed bars
                .transition() // Apply transition for smooth removal
                .duration(500) // Set duration for the transition
                .attr("x", w) // Move the bar out of view
                .remove(); // Remove the element from the DOM

            bars.transition() // Transition for remaining bars
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

            // Update text labels
            var texts = svg.selectAll("text")
                .data(dataset); // Bind updated dataset to text elements

            texts.exit() // Exit selection for removed text labels
                .transition() // Apply transition for smooth removal
                .duration(200) // Set duration for the transition
                .attr("x", w) // Move the text out of view
                .remove(); // Remove the element from the DOM

            texts.transition() // Transition for remaining text labels
                .duration(500) // Set duration for the transition
                .text(function(d) {
                    return d; // Update text to the new value
                })
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth() / 2; // Center the text horizontally
                })
                .attr("y", function(d) {
                    return h - yScale(d) + 14; // Position text slightly below the top of the bar
                });
        });
}

// Execute the init function when the window loads
window.onload = init;
