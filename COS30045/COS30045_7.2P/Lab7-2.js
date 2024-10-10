// Step 1: Set up the data
const data = [45, 25, 20, 10, 6, 5];
const width = 300;
const height = 300;
const outerRadius = width / 2; // Changed 'w' to 'width'
const innerRadius = 50; // Kept this for a pie chart

// Step 2: Set up the pie chart parameters
const pie = d3.pie();
const arc = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius); // Change to a value greater than 0 for a donut chart

// Step 3: Set up the arcs
const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Step 4: Draw the arcs
const color = d3.scaleOrdinal(d3.schemePastel2);
const arcs = svg.selectAll("g.arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc")
    .attr("transform", "translate(0, 0)"); // Changed from using outerRadius to (0, 0)

// Corrected 'd' and 'i' parameters in the arc function call
arcs.append("path")
    .attr("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arc); // Directly use arc(d)

// Step 5: Add text labels
arcs.append("text")
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .text(function(d) {
        return d.value;
    });
