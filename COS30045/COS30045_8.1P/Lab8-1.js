function init(){
    var w = 500;
    var h = 300;

    var projection =  d3.geoMercator()
                        .center([145, -36.5])
                        .translate([w / 2, h / 2])
                        .scale(3000);


    var path = d3.geoPath()
                .projection(projection);

    var svg = d3.select("#MapOnPage")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill","steelblue")

    d3.json("https://raw.githubusercontent.com/JeffreySZQ/COS30045/refs/heads/main/COS30045/COS30045_8.1P/LGA_VIC.json").then(function(json){


        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path);
    });
}
window.onload = init;