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
        .attr("fill", "rgb(255,192,203)");  // Apply fill to bars

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
            return h - yScale(d) + 14;
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

    // Update text
    var texts = svg.selectAll("text")
        .data(dataset);

    texts.enter()
        .append("text")
        .attr("x", w) // Start the text from the far right, will move it later
        .attr("y", function(d) {
            return h - yScale(d) + 14;
        })
        .merge(texts)
        .transition()
        .duration(500)
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;  // Center the text horizontally
        })
        .attr("y", function(d) {
            return h - yScale(d) + 14;  // Position the text slightly below the top of the bar
        })
        .attr("text-anchor", "middle");  // Align the text in the middle horizontally
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

            var texts = svg.selectAll("text")
                .data(dataset);

            texts.exit()
                .transition()
                .duration(200)
                .attr("x", w)
                .remove();

            texts.transition()
                .duration(500)
                .text(function(d) {
                    return d;
                })
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                })
                .attr("y", function(d) {
                    return h - yScale(d) + 14;
                });
        });
}

window.onload = init;
