
        // Set up chart dimensions
        var w = 600;
        var h = 300;
        var barPadding = 5;
        var marginTop = 40;

        // Initial dataset
        var dataset = [20, 35, 25, 50, 40, 30, 45, 25, 35, 20];

        // Create x and y scales
        var xScale = d3.scaleBand()
            .domain(d3.range(dataset.length))
            .rangeRound([0, w])
            .paddingInner(0.05);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([h, 0]);

        // Create SVG element
        var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h + marginTop)
            .append("g")
            .attr("transform", "translate(0," + marginTop + ")");

        // Function to render chart
        function renderChart() {
            // Bind data to bars
            var bars = svg.selectAll("rect")
                .data(dataset);

            // Enter phase for new data
            bars.enter()
                .append("rect")
                .attr("x", function (d, i) {
                    return xScale(i);
                })
                .attr("y", h)  // Start from bottom
                .attr("width", xScale.bandwidth())
                .attr("height", 0)  // Initial height 0 for smooth animation
                .attr("fill", "steelblue")
                .on("mouseover", function(event, d) {
                    d3.select(this)
                    .transition()   // Add transition for smooth effect
                    .duration(300)
                    .attr("fill", "orange");

                    // Tooltip logic
                    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                    var yPosition = yScale(d) + 15;

                    svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", xPosition)
                        .attr("y", yPosition)
                        .attr("text-anchor", "middle")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "12px")
                        .attr("font-weight", "bold")
                        .attr("fill", "black")
                        .text(d);
                })
                .on("mouseout", function() {
                    d3.select(this)
                    .transition()   // Add transition for smooth effect
                    .duration(300)
                    .attr("fill", "steelblue");  // Revert color on mouse out

                    // Remove the tooltip
                    d3.select("#tooltip").remove();
                })
                .merge(bars)  // Merge with existing bars
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return xScale(i);
                })
                .attr("y", function (d) {
                    return yScale(d);
                })
                .attr("height", function (d) {
                    return h - yScale(d);
                });

            // Exit phase for removing data
            bars.exit()
                .transition()
                .duration(1000)
                .attr("x", w)  // Move out of view
                .attr("height", 0)
                .remove();
        }

        // Initial render
        renderChart();

        // Add bar button functionality
        d3.select("#addButton").on("click", function () {
            // Generate a new random number and add it to the dataset
            var newNumber = Math.floor(Math.random() * 50) + 10;
            dataset.push(newNumber);

            // Update xScale domain
            xScale.domain(d3.range(dataset.length));

            // Render chart
            renderChart();
        });

        // Remove bar button functionality
        d3.select("#removeButton").on("click", function () {
            // Remove the first element from the dataset
            dataset.shift();

            // Update xScale domain
            xScale.domain(d3.range(dataset.length));

            // Render chart
            renderChart();
        });
   