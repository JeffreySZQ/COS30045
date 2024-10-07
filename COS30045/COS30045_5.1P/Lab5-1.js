
            var w = 500;
            var h = 100;
            var barPadding = 3;

            var dataset = [12, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28]; // Initial dataset

            var svg = d3.select("body")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);

            // Create the initial bar chart
            function drawBars(data) {
                var xscale = d3.scaleBand()
                                .domain(d3.range(data.length))
                                .range([0, w])
                                .paddingInner(0.05);

                var yscale = d3.scaleLinear()
                                .domain([0, d3.max(data)])
                                .range([h, 0]);

                // Create bars
                var bars = svg.selectAll("rect")
                                .data(data);

                bars.enter()
                    .append("rect")
                    .merge(bars)
                    .attr("x", function(d, i) {
                        return xscale(i);
                    })
                    .attr("y", function(d) {
                        return yscale(d);
                    })
                    .attr("width", xscale.bandwidth())
                    .attr("height", function(d) {
                        return h - yscale(d);
                    })
                    .attr("fill", "rgb(106,90,205)");

                // Add text to bars
                var labels = svg.selectAll("text")
                                .data(data);

                labels.enter()
                    .append("text")
                    .merge(labels)
                    .text(function(d) {
                        return d;
                    })
                    .attr("x", function(d, i) {
                        return xscale(i) + xscale.bandwidth() / 2;
                    })
                    .attr("y", function(d) {
                        return yscale(d) + 15;
                    })
                    .attr("fill", "black")
                    .attr("text-anchor", "middle");

                // remove all the bars and labels before updating
                bars.exit().remove();
                labels.exit().remove();
            }

            // Draw the initial chart
            drawBars(dataset);

            // Button click event
            d3.select("#updateButton").on("click", function() {
                // Now, update the dataset with new random values
                dataset = dataset.map(function() {
                    return Math.floor(Math.random() * 30); // New random values
                });

                // redraw if updated
                drawBars(dataset);
            });
        