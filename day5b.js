/* I have replaced the seeds and maps with mock values. I entered them manually before changing it for the purpose of showing it publicly */
var seedClusters = `12345 23456 34567 45678`.match(/\d+ \d+/g).map(el=>el.split(' ').map(ele=>parseInt(ele)));

var seedToSoil = `12345 23456 34567
123456 234567 345678`.split('\n').map(el=>el.split(/\s+/).map(ele=>parseInt(ele)));

var soilToFertilizer = `12345 23456 34567
123456 234567 345678`.split('\n').map(el=>el.split(/\s+/).map(ele=>parseInt(ele)));

var fertilizerToWater = `12345 23456 34567
123456 234567 345678`.split('\n').map(el=>el.split(/\s+/).map(ele=>parseInt(ele)));

var waterToLight = `12345 23456 34567
123456 234567 345678`.split('\n').map(el=>el.split(/\s+/).map(ele=>parseInt(ele)));

var lightToTemperature = `12345 23456 34567
123456 234567 345678`.split('\n').map(el=>el.split(/\s+/).map(ele=>parseInt(ele)));

var temperatureToHumidity = `12345 23456 34567
123456 234567 345678`.split('\n').map(el=>el.split(/\s+/).map(ele=>parseInt(ele)));

var humidityToLocation = `12345 23456 34567
123456 234567 345678`.split('\n').map(el=>el.split(/\s+/).map(ele=>parseInt(ele)));

var maps = [
	{
		index: 0,
		name: 'seedToSoil',
		values: seedToSoil
	}, {
		index: 1,
		name: 'soilToFertilizer',
		values: soilToFertilizer
	}, {
		index: 2,
		name: 'fertilizerToWater',
		values: fertilizerToWater
	}, {
		index: 3,
		name: 'waterToLight',
		values: waterToLight
	}, {
		index: 4,
		name: 'lightToTemperature',
		values: lightToTemperature
	}, {
		index: 5,
		name: 'temperatureToHumidity',
		values: temperatureToHumidity
	}, {
		index: 6,
		name: 'humidityToLocation',
		values: humidityToLocation
	}
];

var breakpoints = [];
maps.forEach(obj=>{
	obj.values.forEach(vals=>{
		/* breakpoints.push(vals[0]);
		breakpoints.push(vals[0]+vals[2]); */
		/* not sure if need to consider destinations for breakpoints */

		breakpoints.push(vals[1]);
		breakpoints.push(vals[1]+vals[2]);
	});
});
breakpoints = breakpoints.sort((a,b)=>a>b?1:-1);
breakpoints = breakpoints.filter((val,ind)=>breakpoints.indexOf(val) === ind);
console.log(breakpoints);

var seeds = seedClusters.map(cluster=>{
	var start = cluster[0];
	var length = cluster[1];
	var output = [];

	breakpoints.forEach(point=>{
		if (
			point > start &&
			point < start + length
		) {
			output.push([start, point - start]);
			output.push([point, length - (point - start)]);
		}
	});

	return output.length ? output : [cluster];
}).flat();

console.log(seeds);

var soils = seeds.map(seed=>{
	var output;
	for (const el of maps[0].values) {
		var destRangeStart = el[0];
		var srcRangeStart = el[1];
		var rangeLength = el[2];
		
		if (
			seed[0] >= srcRangeStart && 
			seed[0] < srcRangeStart + rangeLength
			) {
				output = {
					status: 'mapped',
					value: seed[0] - srcRangeStart + destRangeStart
				};
				break;
		}
	}
	if (typeof output === 'undefined') {
		output = {
			status: 'unchanged',
			value: seed[0]
		};
	}
	return output;
});

// console.log(soils);


/**
 * BELOW THIS POINT IS UNCHANGED FROM PART 1
 */

var fertilizers = soils.map(soil=>{
	var output;
	for (const el of maps[1].values) {
		var destRangeStart = el[0];
		var srcRangeStart = el[1];
		var rangeLength = el[2];
		
		if (
			soil.value >= srcRangeStart && 
			soil.value < srcRangeStart + rangeLength
			) {
				output = {
					status: 'mapped',
					value: soil.value - srcRangeStart + destRangeStart
				};
				break;
		}
	}
	if (typeof output === 'undefined') {
		output = {
			status: 'unchanged',
			value: soil.value
		};
	}
	return output;
});

//console.log('fertilizers: ', fertilizers);

var waters = fertilizers.map(fertilizer=>{
	var output;
	for (const el of maps[2].values) {
		var destRangeStart = el[0];
		var srcRangeStart = el[1];
		var rangeLength = el[2];
		
		if (
			fertilizer.value >= srcRangeStart && 
			fertilizer.value < srcRangeStart + rangeLength
			) {
				output = {
					status: 'mapped',
					value: fertilizer.value - srcRangeStart + destRangeStart
				};
				break;
		}
	}
	if (typeof output === 'undefined') {
		output = {
			status: 'unchanged',
			value: fertilizer.value
		};
	}
	return output;
});

//console.log('fertilizers: ', fertilizers);

var lights = waters.map(water=>{
	var output;
	for (const el of maps[3].values) {
		var destRangeStart = el[0];
		var srcRangeStart = el[1];
		var rangeLength = el[2];
		
		if (
			water.value >= srcRangeStart && 
			water.value < srcRangeStart + rangeLength
			) {
				output = {
					status: 'mapped',
					value: water.value - srcRangeStart + destRangeStart
				};
				break;
		}
	}
	if (typeof output === 'undefined') {
		output = {
			status: 'unchanged',
			value: water.value
		};
	}
	return output;
});

//console.log('lights: ', lights);

var temperatures = lights.map(light=>{
	var output;
	for (const el of maps[4].values) {
		var destRangeStart = el[0];
		var srcRangeStart = el[1];
		var rangeLength = el[2];
		
		if (
			light.value >= srcRangeStart && 
			light.value < srcRangeStart + rangeLength
			) {
				output = {
					status: 'mapped',
					value: light.value - srcRangeStart + destRangeStart
				};
				break;
		}
	}
	if (typeof output === 'undefined') {
		output = {
			status: 'unchanged',
			value: light.value
		};
	}
	return output;
});

//console.log('temperatures: ', temperatures);

var humidities = temperatures.map(temperature=>{
	var output;
	for (const el of maps[5].values) {
		var destRangeStart = el[0];
		var srcRangeStart = el[1];
		var rangeLength = el[2];
		
		if (
			temperature.value >= srcRangeStart && 
			temperature.value < srcRangeStart + rangeLength
			) {
				output = {
					status: 'mapped',
					value: temperature.value - srcRangeStart + destRangeStart
				};
				break;
		}
	}
	if (typeof output === 'undefined') {
		output = {
			status: 'unchanged',
			value: temperature.value
		};
	}
	return output;
});

//console.log('humidities: ', humidities);

var locations = humidities.map(humidity=>{
	var output;
	for (const el of maps[6].values) {
		var destRangeStart = el[0];
		var srcRangeStart = el[1];
		var rangeLength = el[2];
		
		if (
			humidity.value >= srcRangeStart && 
			humidity.value < srcRangeStart + rangeLength
			) {
				output = {
					status: 'mapped',
					value: humidity.value - srcRangeStart + destRangeStart
				};
				break;
		}
	}
	if (typeof output === 'undefined') {
		output = {
			status: 'unchanged',
			value: humidity.value
		};
	}
	return output;
});

//console.log('locations: ', locations);

console.log(
	'Smallest location from seeds: ',
	locations.reduce((a,v)=>{
		if (v.value < a) {
			return v.value;
		} else {
			return a;
		}
	}, 9007199254740991)
);
