function init() {
    var w = 600;
    var h = 300;
    var padding = 20; // Define a padding variable

    // Load the CSV data
    d3.csv("Unemployment_78-95.csv").then(data => {
        // Parse the data
        data.forEach(d => {
            d.date = new Date(d.year, d.month - 1);
            d.number = +d.number; // Convert number to integer
        });

        console.table(data, ["date", "number"]); // Changed dataset to data

        // Set up the scales
        var xScale = d3.scaleTime()
            .domain([
                d3.min(data, function(d) { return d.date; }),
                d3.max(data, function(d) { return d.date; })
            ])
            .range([0, w]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return d.number; })]) // Fixed numer to number
            .range([h, 0]); // Invert the y scale

        // Set up the line
        var line = d3.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale(d.number); });

        // Set up the area
        var area = d3.area()
            .x(function(d) { return xScale(d.date); })
            .y0(h) // Bottom of the chart
            .y1(function(d) { return yScale(d.number); });

        // Append the SVG and path
        var svg = d3.select("#chart") // Ensure there's an element with ID chart in HTML
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        svg.append("path")
            .datum(data) // Use data here
            .attr("class", "area")
            .attr("d", area);

        svg.append("path")
            .datum(data) // Use data here
            .attr("class", "line")
            .attr("d", line);

        // Add x-axis
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + h + ")") // Move to bottom
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis")
            .call(yAxis);

        // Add annotation line
        svg.append("line")
            .attr("class", "line halfMilMark")
            .attr("x1", padding)
            .attr("x2", w)
            .attr("y1", yScale(500000))
            .attr("y2", yScale(500000));

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 7)
            .text("Half a million unemployed");
    });
}
window.onload = init;
