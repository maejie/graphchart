
var barchart = dc.barChart("#barchart"),
	graphviewer = dc.graphChart("#graphviewer");

d3.csv("morley.csv", function(error, experiments) {

  experiments.forEach(function(x) {
    x.Speed = +x.Speed;
  });

  var ndx                 = crossfilter(experiments),
      runDimension        = ndx.dimension(function(d) {return +d.Run;}),
      speedSumGroup       = runDimension.group().reduceSum(function(d) {return d.Speed * d.Run / 1000;}),
	  pairDimension		  = ndx.dimension(function(d) {return d.Expt + "," + d.Run ; }),
	  pairCounts		  = pairDimension.group().reduceSum(function(d) {return d.Speed;});

  barchart
    .width(768)
    .height(480)
    .x(d3.scale.linear().domain([1,20]))
    .brushOn(true)
    .yAxisLabel("This is the Y Axis!")
    .dimension(runDimension)
    .group(speedSumGroup);

  graphviewer
    .width(768)
    .height(2000)
	.gap(0)
    .dimension(pairDimension)
    .group(pairCounts);

	dc.renderAll();

});
