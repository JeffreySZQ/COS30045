function init(){
    d3.csv("Task_2.4_data.csv").then(function(data){
        console.log(data);
        wombatSightings = data;

        barChart(wombatSightings);
        addTextLabels(wombatSightings);
    });

    var w = 500;
    var h = 150;
    var barPadding = 3;

    //D3 block
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    function barChart(wombatSightings) {
        svg.selectAll("rect")
            .data(wombatSightings)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
                return i * (w / wombatSightings.length);
            })
            .attr("y", function(d) {
                return h - (d.wombats * 4);
            })
            .attr("width", function(d) {
                return (w / wombatSightings.length - barPadding);
            })
            .attr("height", function(d) {
                return d.wombats * 4;
            })
            .attr("fill", function(d) {
                // Set bars to light green shade
                return "rgb(144, 238, 144)";
            });
    }

    function addTextLabels(wombatSightings) {
        svg.selectAll("text")
            .data(wombatSightings)
            .enter()
            .append("text")
            .text(function(d) {
                return d.wombats;
            })
            .attr("fill", "black")
            .attr("x", function(d, i) {
                return i * (w / wombatSightings.length) + 10.5;
            })
            .attr("y", function(d) {
                // Adjust the y position to place the text below the bar's top
                return h - (d.wombats * 4) + 15;  // Move down 15 pixels from the top of the bar
            });
    }
}

window.onload = init;
