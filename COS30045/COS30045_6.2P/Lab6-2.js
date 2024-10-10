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
    var bars = svg.selectAll("rect")
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
        .attr("fill", "rgb(255,192,203)")
        .on("mouseover", function(event, d) {
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 15;

            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .text(d)
                .attr("font-size", "12px")
                .attr("fill", "black")
                .attr("text-anchor", "middle");

            d3.select(this)
                .attr("fill", "orange");
        })
        .on("mouseout", function() {
            d3.select("#tooltip").remove();
            d3.select(this)
                .attr("fill", "rgb(255,192,203)");
        });

    // Add new data
    d3.select("#addButton")
        .on("click", function() {
            var maxValue = 25;
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);
            updateBars();
        });

    // Remove data
    d3.select("#removeButton")
        .on("click", function() {
            dataset.pop();
            updateBars();
        });

    // Track sorting order
    var isAscending = true;

    // Sort bars
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

    // Update bars and scales
    function updateBars() {
        xScale.domain(d3.range(dataset.length));
        
        bars = svg.selectAll("rect")
            .data(dataset, (d, i) => i); // Use index as key for data join
    
        // Enter selection for new bars
        var newBars = bars.enter()
            .append("rect")
            .attr("x", w) // Start outside of view
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return yScale(d);
            })
            .attr("fill", "rgb(255,192,203)");
    
        // Attach mouseover and mouseout event listeners to new bars
        newBars.on("mouseover", function(event, d) {
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 15;
    
            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .text(d)
                .attr("font-size", "12px")
                .attr("fill", "black")
                .attr("text-anchor", "middle");
    
            d3.select(this)
                .attr("fill", "orange");
        })
        .on("mouseout", function() {
            d3.select("#tooltip").remove();
            d3.select(this)
                .attr("fill", "rgb(255,192,203)");
        });
    
        // Merge existing bars with new bars
        bars.merge(newBars) // Merge new bars with existing ones
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
    
        bars.exit()
            .transition()
            .duration(500)
            .attr("x", w)
            .remove();
    }

}

window.onload = init;
