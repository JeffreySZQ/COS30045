
            // Set up SVG dimensions and dataset
            var w = 500;
            var h = 150;
            var barPadding = 3;
            var dataset = [14, 5, 26, 23, 9, 14, 5, 26, 23, 9];

            var xScale = d3.scaleBand()
                .domain(d3.range(dataset.length))
                .range([0, w])
                .paddingInner(0.05);

            // Create SVG container
            var svg1 = d3.select("article.content")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

            // Add an axis using d3.axisBottom() for the x-axis
            var xAxis = d3.axisBottom(xScale);

            svg1.append("g")
                .attr("transform", "translate(0," + h + ")")
                .call(xAxis);

            // Draw bars for each data point
            var bars = svg1.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x", function (d, i) {
                    return xScale(i);
                })
                .attr("y", function (d) {
                    return h - (d * 4);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function (d) {
                    return d * 4;
                })
                .attr("fill", "rgb(106, 90, 205)");  // Set fill color for bars

            // Add text labels inside bars
            var textLabels = svg1.selectAll("text")
                .data(dataset)
                .enter()
                .append("text")
                .text(function (d, i) { // Include index
                    return d + ' (' + i + ')'; // Show value and index
                })
                .attr("fill", "white") // Change text color for visibility
                .attr("x", function (d, i) {
                    return xScale(i) + xScale.bandwidth() / 2; // Center horizontally
                })
                .attr("text-anchor", "middle")
                .attr("y", function (d) {
                    return h - (d * 4) + 15; // Position inside the bar
                });

            // Update button functionality
            function updateBars(newDataset, easingFunction) {
                // Update the text labels
                var labels = svg1.selectAll("text")
                    .data(newDataset);

                labels.enter()
                    .append("text")
                    .merge(labels)
                    .transition()
                    .duration(2000) // Change duration as needed
                    .ease(easingFunction) // Apply easing function
                    .text(function (d, i) { // Update to include index
                        return d + ' (' + i + ')'; // Show value and index
                    })
                    .attr("x", function (d, i) {
                        return xScale(i) + xScale.bandwidth() / 2; // Center horizontally
                    })
                    .attr("y", function (d) {
                        return h - (d * 4) + 15; // Position inside the bar
                    });

                labels.exit().remove();

                // Update the bars
                var bars = svg1.selectAll("rect")
                    .data(newDataset);

                bars.enter()
                    .append("rect")
                    .merge(bars)
                    .transition()
                    .duration(2000) // Change duration as needed
                    .ease(easingFunction) // Apply easing function
                    .attr("y", function (d) {
                        return h - (d * 4);
                    })
                    .attr("height", function (d) {
                        return d * 4;
                    });

                bars.exit().remove();
            }

            d3.select("#updateButton").on("click", function () {
                // Generate new random dataset
                var newDataset = [];
                for (var i = 0; i < dataset.length; i++) {
                    newDataset.push(Math.floor(Math.random() * 25));
                }
                updateBars(newDataset, d3.easeCubicInOut); // Default easing
            });

            d3.select("#easeCircleButton").on("click", function () {
                // Generate new random dataset
                var newDataset = [];
                for (var i = 0; i < dataset.length; i++) {
                    newDataset.push(Math.floor(Math.random() * 25));
                }
                updateBars(newDataset, d3.easeCircleOut); // Circle easing
            });

            d3.select("#easeElasticButton").on("click", function () {
                // Generate new random dataset
                var newDataset = [];
                for (var i = 0; i < dataset.length; i++) {
                    newDataset.push(Math.floor(Math.random() * 25));
                }
                updateBars(newDataset, d3.easeElasticOut); // Elastic easing
            });
       