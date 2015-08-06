var meteoObj;

$(document).ready(function ()
{
				waitingDialog.show();
				print_termometro($('#gauge'));

				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function ()
				{
							if (xhr.readyState==4 && xhr.status==200)
							{
									waitingDialog.hide();
									//console.log(xhr.responseText);
									meteoObj=JSON.parse(xhr.responseText);
									//alert(meteoObj.temperatura_esterna);
									$('#gauge').jqxLinearGauge('animationDuration', 1000);
									$('#gauge').jqxLinearGauge('value',meteoObj.temperatura_esterna*1);
									$('#text').html("Temperatura : "+meteoObj.temperatura_esterna*1+"&#x2103");
							}
				}
				xhr.open("GET", 'http://meteo.ozzyboshi.com:8082/WeatherStation/MeteoServices/Readings/lastReading', true);
				xhr.send();
});

function print_termometro(divobjectselector)
{
				var theme = getDemoTheme(),
				majorTicks = { size: '15%', interval: 10 },
				minorTicks = { size: '5%', interval: 2.5, style: { 'stroke-width': 1, stroke: '#aaaaaa'} },
				labels = { interval: 10 };

				divobjectselector.jqxLinearGauge(
				{
								orientation: 'vertical',
								labels: labels,
								ticksMajor: majorTicks,
								ticksMinor: minorTicks,
								max: 60,
								value: -60,
								pointer: { size: '6%', style: { fill: '#FF0000'} },
								colorScheme: 'scheme05',
				});
				divobjectselector.jqxLinearGauge({ pointer: { pointerType: 'default', size: '5%', visible: true, offset: -5,style: { fill: '#FF0000'}}});
				divobjectselector.jqxLinearGauge({height: 250 });
				divobjectselector.jqxLinearGauge({width: 100 })
				divobjectselector.jqxLinearGauge({min: -10 });
}
