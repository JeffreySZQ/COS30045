
    // Step 1: Set up the data
    var dataset = [
        { apples: 5, oranges: 10, grapes: 22 },
        { apples: 4, oranges: 12, grapes: 28 },
        { apples: 2, oranges: 19, grapes: 32 },
        { apples: 7, oranges: 23, grapes: 35 },
        { apples: 23, oranges: 17, grapes: 43 }
    ];

    // Step 2: Set up the stack
    var stack = d3.stack()
        .keys(['apples', 'oranges', 'grapes']);

    var series = stack(dataset);  // Creating the stack series

    // Step 3: Set up the SVG
    var width = 300, height = 300, margin = { top: 20, right: 30, bottom: 30, left: 40 };

    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Step 4: Set up scales
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .range([0, width - margin.left - margin.right])
        .padding(0.1);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d.apples + d.oranges + d.grapes; })])
        .range([height - margin.top - margin.bottom, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Step 5: Draw the stacked bars
    svg.selectAll("g")
        .data(series)
        .enter().append("g")
        .attr("fill", function(d, i) { return color(i); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d, i) { return xScale(i); })
        .attr("y", function(d) { return yScale(d[1]); })
        .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
        .attr("width", xScale.bandwidth());

    // Step 6: Add axes (optional, for visual reference)
    var xAxis = d3.axisBottom(xScale).tickFormat(function(d, i) { return "Data " + (i + 1); });
    var yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);


