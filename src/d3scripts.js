async function handleData() {
	const data = await d3.csv('abyss.csv');

	// data stuffs
	const margin = { top: 10, right: 10, bottom: 20, left: 40 };
	const width = 2000 - (margin.left + margin.right);
	// const height = 210 - (margin.top + margin.bottom);
	const height = 210 - (margin.top + margin.bottom);
	const height2 = 210 - (margin.top + margin.bottom);

	const usedExtent = d3.extent(data, (d) => d.used);
	const ownExtent = d3.extent(data, (d) => d.own);

	// scales

	const xscale = d3
		.scaleBand()
		.domain(data.map((d) => d.name))
		.range([margin.left, width + margin.left])
		.padding(0.55);

	const yscale = d3
		.scaleLinear()
		.domain(usedExtent)
		.range([height, margin.top]);

	const xscale2 = d3
		.scaleBand()
		.domain(data.map((d) => d.name))
		.range([margin.left, width + margin.left])
		.padding(0.55);

	const yscale2 = d3
		.scaleLinear()
		.domain(ownExtent)
		.range([margin.top, height]);

	// Axis vars

	const bottomAxis1 = d3.axisBottom(xscale);
	const leftAxis1 = d3
		.axisLeft(yscale)
		.tickValues([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
	const bottomAxis2 = d3.axisTop(xscale2);
	const leftAxis2 = d3
		.axisLeft(yscale2)
		// .tickValues([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
		.tickValues([100, 90, 80, 70, 60, 50, 40, 30, 20, 10]);

	// Premake d3 vars

	const svg = d3.select('#svg');
	const svg2 = d3.select('#svg2');
	const svgimg = d3.select('#svgimg');
	const barGroup = svg.append('g');
	const barGroup2 = svg2.append('g');

	//	// Creating

	// Axis Create

	svg
		.append('g')
		.attr('transform', `translate(${0}, ${height})`)
		.call(bottomAxis1);

	svg
		.append('g')
		.attr('transform', `translate(${margin.left}, 0)`)
		.call(leftAxis1);

	svg2
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top + 4})`)
		.call(leftAxis2);

	svg2
		.append('g')
		.attr('transform', `translate(0, ${margin.bottom - 4})`)
		.call(bottomAxis2);

	// Bar Create
	console.log(data.map((e) => e.element));

	barGroup
		.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('x', (d, i) => xscale(d.name))
		.attr('y', (d) => yscale(d.used))
		.attr('width', xscale.bandwidth())
		.attr('height', (d) => height - yscale(d.used))
		.attr('fill', (d) => `${d.element}`)
		// .attr('stroke', (d) => 'black')
		.attr('rx', (d) => '8');

	barGroup2
		.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('x', (d, i) => xscale2(d.name))
		.attr('y', (d) => margin.bottom - 4)
		.attr('width', xscale.bandwidth())
		.attr('height', (d) => yscale2(d.own))
		.attr('fill', (d) => `${d.element}`)
		// .attr('stroke', (d) => 'black')
		.attr('rx', (d) => '8');

	svgimg
		.selectAll('image')
		.data(data)
		.enter()
		.append('image')
		.attr('class', 'image')
		.attr('x', (d) => xscale(d.name) - margin.right - 4)
		.attr('width', (d) => '50px')
		.attr('height', (d) => '50px')
		.attr('href', (d) => `${d.photo}`);
}

// ----------

// --------

// ----------

// --------

// ----------

// --------

// ----------

// --------
handleData();
