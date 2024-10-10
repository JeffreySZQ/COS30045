function init() {
    var w = 500;
    var h = 150;

    var dataset = [14, 5, 26, 23, 9, 10, 28, 3, 7, 13];

    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, w])
        .paddingInner(0.05);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, h]);

    var svg = d3.select("#rec")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // Create bars
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return yScale(d);
        })
        .attr("fill", "rgb(255,192,203)")  // Set fill color for bars
        .on("mouseover", function(event, d) {
            // Show the tooltip text on mouseover
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;  // Center the text
            var yPosition = parseFloat(d3.select(this).attr("y")) + 15;  // Position the text inside the bar

            // Append the text element for the number
            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .text(d)
                .attr("font-size", "12px")
                .attr("fill", "black")
                .attr("text-anchor", "middle");
            
            d3.select(this)
                .attr("fill", "orange");  // Change bar color on hover
        })
        .on("mouseout", function() {
            // Remove the tooltip text on mouseout
            d3.select("#tooltip").remove();
            d3.select(this)
                .attr("fill", "rgb(255,192,203)");  // Reset bar color
        });

    // Add new data
    d3.select("#addButton")
        .on("click", function() {
            var maxValue = 25;
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);
            xScale.domain(d3.range(dataset.length));

            // Update bars
            var bars = svg.selectAll("rect")
                .data(dataset);

            bars.enter()
                .append("rect")
                .attr("x", w)
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                })
                .attr("fill", "rgb(255,192,203)")  // Set fill color for new bars
                .on("mouseover", function(event, d) {
                    // Show the tooltip text on mouseover
                    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;  // Center the text
                    var yPosition = parseFloat(d3.select(this).attr("y")) + 15;  // Position the text inside the bar

                    // Append the text element for the number
                    svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", xPosition)
                        .attr("y", yPosition)
                        .text(d)
                        .attr("font-size", "12px")
                        .attr("fill", "black")
                        .attr("text-anchor", "middle");
                    
                    d3.select(this)
                        .attr("fill", "orange");  // Change bar color on hover
                })
                .on("mouseout", function() {
                    // Remove the tooltip text on mouseout
                    d3.select("#tooltip").remove();
                    d3.select(this)
                        .attr("fill", "rgb(255,192,203)");  // Reset bar color
                })
                .merge(bars)
                .transition()
                .duration(500)
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                });

            // No need to add text labels here since they will appear on hover
        });

    // Remove data
    d3.select("#removeButton")
        .on("click", function() {
            dataset.pop();
            xScale.domain(d3.range(dataset.length));

            var bars = svg.selectAll("rect")
                .data(dataset);

            bars.exit()
                .transition()
                .duration(500)
                .attr("x", w)
                .remove();

            bars.transition()
                .duration(500)
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                });
        });
}

window.onload = init;
