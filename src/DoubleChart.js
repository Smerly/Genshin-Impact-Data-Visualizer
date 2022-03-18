// import * as d3 from 'd3';
// import React, { Component, useState, useEffect, useRef, setState } from 'react';
// // import data from './getData';

import * as d3 from 'd3';
import React, { Component, useState, useEffect, useRef, setState } from 'react';
import { stratify } from 'd3';
// import data from './getData';

function DoubleChart(props) {
	const { data } = props;
	// const [chart1, setChart1] = useState();
	// const [chart2, setChart2] = useState();
	const chart1 = useRef();
	const chart2 = useRef();
	const characterPics = useRef();
	const [dat, setDat] = useState(data);
	setTimeout(() => {
		setDat(data);
	}, 200);
	console.log(dat);

	const getName = () => {
		if (this.props.data.length == 0) {
			console.log('loading...');
		} else {
			return this.props.data[0].name;
		}
	};

	const drawChart1 = () => {
		// Measurements

		const margin = { top: 10, right: 10, bottom: 20, left: 40 };

		const width = 1500 - (margin.left + margin.right);
		const height = 210 - (margin.top + margin.bottom);

		const usedExtent = d3.extent(dat, (d) => d.used);

		let accessToRef = d3
			.select(chart1.current)
			.append('svg')
			.attr('width', width + 50)
			.attr('height', height + 30)
			.style('border', '1px black solid')
			.style('padding', '10px');

		// Scales

		const xscale = d3
			.scaleBand()
			.domain(dat.map((d) => d.name))
			.range([margin.left, width + margin.left])
			.padding(0.55);

		const yscale = d3
			.scaleLinear()
			.domain(usedExtent)
			.range([height, margin.top]);

		// Axis Variables

		const bottomAxis1 = d3.axisBottom(xscale);
		const leftAxis1 = d3
			.axisLeft(yscale)
			.tickValues([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

		// Axis

		accessToRef
			.append('g')
			.attr('transform', `translate(${0}, ${height})`)
			.call(bottomAxis1);

		accessToRef
			.append('g')
			.attr('transform', `translate(${margin.left}, 0)`)
			.call(leftAxis1);

		// Bars

		accessToRef
			.selectAll('rect')
			.data(dat)
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
	};

	const drawChart2 = () => {
		// Measurements

		const margin = { top: 10, right: 10, bottom: 20, left: 40 };

		const width = 1500 - (margin.left + margin.right);
		const height = 210 - (margin.top + margin.bottom);

		const ownExtent = d3.extent(dat, (d) => d.own);

		let accessToRef = d3
			.select(chart2.current)
			.append('svg')
			.attr('width', width + 50)
			.attr('height', height + 30)
			.style('border', '1px black solid')
			.style('padding', '10px');

		// Scales

		const xscale = d3
			.scaleBand()
			.domain(dat.map((d) => d.name))
			.range([margin.left, width + margin.left])
			.padding(0.55);

		const xscale2 = d3
			.scaleBand()
			.domain(dat.map((d) => d.name))
			.range([margin.left, width + margin.left])
			.padding(0.55);

		const yscale2 = d3
			.scaleLinear()
			.domain(ownExtent)
			.range([margin.top, height]);

		// Axis Variables

		const bottomAxis2 = d3.axisTop(xscale2);
		const leftAxis2 = d3
			.axisLeft(yscale2)
			.tickValues([100, 90, 80, 70, 60, 50, 40, 30, 20, 10]);
		// .style('color', 'white');
		// .tickValues(
		// 	dat.map((d) => {
		// 		let newvar = d.own;
		// 		if (newvar.length == 2) {
		// 			newvar = newvar.substring(0, 1) + '0' + newvar.substring(1 + 1);
		// 			return newvar;
		// 		}
		// 	})
		// );

		// Axis

		accessToRef
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top + 4})`)
			.call(leftAxis2);

		accessToRef
			.append('g')
			.attr('transform', `translate(0, ${margin.bottom - 4})`)
			.call(bottomAxis2);

		// Bars

		accessToRef
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
	};

	const drawCharacterPic = () => {
		// Measurements

		const margin = { top: 10, right: 10, bottom: 20, left: 40 };
		const width = 1500 - (margin.left + margin.right);

		const height = 150 - (margin.top + margin.bottom);
		const height2 = 150 - (margin.top + margin.bottom);

		const usedExtent = d3.extent(dat, (d) => d.used);
		const ownExtent = d3.extent(dat, (d) => d.own);

		let character = d3.select(characterPics.current);

		// Scales

		const xscale = d3
			.scaleBand()
			.domain(dat.map((d) => d.name))
			.range([margin.left, width + margin.left])
			.padding(0.55);

		character
			.selectAll('image')
			.data(dat)
			.enter()
			.append('image')
			.attr('class', 'image')
			.attr('x', (d) => xscale(d.name) - margin.right + 2)
			.attr('width', (d) => '35px')
			.attr('height', (d) => '35px')
			.attr('href', (d) => `${d.photo}`);
	};

	useEffect(() => {
		drawChart1();
		drawChart2();
		drawCharacterPic();
	}, [dat]);
	return (
		<div className="card-background">
			<div className="inner-card-bg">
				<svg
					ref={chart1}
					className="index2"
					style={{
						width: 1500,
						height: 200,
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-end',
						alignItems: 'flex-end',
						margin: 10,
					}}
				></svg>
				<div className="card-decoration"></div>
				<svg
					ref={characterPics}
					style={{ width: 1500, height: 50, margin: 10 }}
					className="index2"
				></svg>
				<svg
					ref={chart2}
					className="index2"
					style={{
						width: 1500,
						height: 200,
						margin: 10,
					}}
				></svg>
			</div>
		</div>
	);
}

export default DoubleChart;

// class DoubleChart extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.chart1 = React.createRef();
// 		this.chart2 = React.createRef();
// 		this.state = {
// 			data: [],
// 		};
// 		this.handleStatusChange = this.handleStatusChange.bind(this);
// 	}
// 	getData() {
// 		// while (this.props.data.length == 0) {
// 		// 	console.log('loading...');
// 		// 	return [];
// 		// }
// 		return this.props.data;
// 	}

// 	getName() {
// 		if (this.props.data.length == 0) {
// 			console.log('loading...');
// 		} else {
// 			return this.props.data[0].name;
// 		}
// 	}

// 	drawChart1() {
// 		// Measurements

// 		const margin = { top: 10, right: 10, bottom: 20, left: 40 };

// 		const width = 2000 - (margin.left + margin.right);
// 		const height = 210 - (margin.top + margin.bottom);

// 		const usedExtent = d3.extent(this.getData(), (d) => d.used);

// 		let accessToRef = d3
// 			.select(this.chart1.current)
// 			.append('svg')
// 			.attr('width', width)
// 			.attr('height', height)
// 			.style('border', '1px black solid');

// 		// Scales

// 		const xscale = d3
// 			.scaleBand()
// 			.domain(this.getData().map((d) => d.name))
// 			.range([margin.left, width + margin.left])
// 			.padding(0.55);

// 		const yscale = d3
// 			.scaleLinear()
// 			.domain(usedExtent)
// 			.range([height, margin.top]);

// 		// Axis Variables

// 		const bottomAxis1 = d3.axisBottom(xscale);
// 		const leftAxis1 = d3
// 			.axisLeft(yscale)
// 			.tickValues([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

// 		// Axis

// 		accessToRef
// 			.append('g')
// 			.attr('transform', `translate(${0}, ${height})`)
// 			.call(bottomAxis1);

// 		accessToRef
// 			.append('g')
// 			.attr('transform', `translate(${margin.left}, 0)`)
// 			.call(leftAxis1);

// 		// Bars

// 		accessToRef
// 			.append('g')
// 			.selectAll('rect')
// 			.data(this.getData())
// 			.enter()
// 			.append('rect')
// 			.attr('class', 'bar')
// 			.attr('x', (d, i) => xscale(d.name))
// 			.attr('y', (d) => yscale(d.used))
// 			.attr('width', xscale.bandwidth())
// 			.attr('height', (d) => height - yscale(d.used))
// 			.attr('fill', (d) => `${d.element}`)
// 			// .attr('stroke', (d) => 'black')
// 			.attr('rx', (d) => '8');
// 	}

// 	drawChart2() {
// 		// Measurements

// 		const margin = { top: 10, right: 10, bottom: 20, left: 40 };
// 		const width = 2000 - (margin.left + margin.right);

// 		const height = 210 - (margin.top + margin.bottom);
// 		const height2 = 210 - (margin.top + margin.bottom);

// 		const usedExtent = d3.extent(this.getData(), (d) => d.used);
// 		const ownExtent = d3.extent(this.getData(), (d) => d.own);

// 		let accessToRef = d3
// 			.select(this.chart1.current)
// 			.append('svg')
// 			.attr('width', width)
// 			.attr('height', height)
// 			.style('border', '1px black solid');

// 		// Scales

// 		const xscale = d3
// 			.scaleBand()
// 			.domain(this.getData().map((d) => d.name))
// 			.range([margin.left, width + margin.left])
// 			.padding(0.55);

// 		const xscale2 = d3
// 			.scaleBand()
// 			.domain(this.getData().map((d) => d.name))
// 			.range([margin.left, width + margin.left])
// 			.padding(0.55);

// 		const yscale2 = d3
// 			.scaleLinear()
// 			.domain(ownExtent)
// 			.range([margin.top, height]);

// 		// Axis Variables

// 		const bottomAxis2 = d3.axisTop(xscale2);
// 		const leftAxis2 = d3
// 			.axisLeft(yscale2)
// 			// .tickValues([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
// 			.tickValues([100, 90, 80, 70, 60, 50, 40, 30, 20, 10]);

// 		// Axis

// 		setTimeout(() => {
// 			accessToRef
// 				.append('g')
// 				.attr('transform', `translate(${margin.left}, ${margin.top + 4})`)
// 				.call(leftAxis2);

// 			accessToRef
// 				.append('g')
// 				.attr('transform', `translate(0, ${margin.bottom - 4})`)
// 				.call(bottomAxis2);

// 			// Bars

// 			accessToRef
// 				.append('g')
// 				.selectAll('rect')
// 				.data(this.getData())
// 				.enter()
// 				.append('rect')
// 				.attr('class', 'bar')
// 				.attr('x', (d, i) => xscale2(d.name))
// 				.attr('y', (d) => margin.bottom - 4)
// 				.attr('width', xscale.bandwidth())
// 				.attr('height', (d) => yscale2(d.own))
// 				.attr('fill', (d) => `${d.element}`)
// 				// .attr('stroke', (d) => 'black')
// 				.attr('rx', (d) => '8');
// 		}, 1000);

// 		// accessToRef
// 		// 	.append('g')
// 		// 	.attr('transform', `translate(${margin.left}, ${margin.top + 4})`)
// 		// 	.call(leftAxis2);

// 		// accessToRef
// 		// 	.append('g')
// 		// 	.attr('transform', `translate(0, ${margin.bottom - 4})`)
// 		// 	.call(bottomAxis2);

// 		// // Bars

// 		// accessToRef
// 		// 	.append('g')
// 		// 	.selectAll('rect')
// 		// 	.data(this.getData())
// 		// 	.enter()
// 		// 	.append('rect')
// 		// 	.attr('class', 'bar')
// 		// 	.attr('x', (d, i) => xscale2(d.name))
// 		// 	.attr('y', (d) => margin.bottom - 4)
// 		// 	.attr('width', xscale.bandwidth())
// 		// 	.attr('height', (d) => yscale2(d.own))
// 		// 	.attr('fill', (d) => `${d.element}`)
// 		// 	// .attr('stroke', (d) => 'black')
// 		// 	.attr('rx', (d) => '8');
// 	}

// 	componentDidUpdate() {
// 		this.drawChart1();
// 		this.drawChart2();
// 	}
// 	handleStatusChange() {

//     }

// 	render() {
// 		// this.drawChart1();
// 		// this.drawChart2();
// 		console.log(this.props.data);
// 		return (
// 			<div>
// 				<svg ref={this.chart1} style={{ width: 3000, height: 200 }}></svg>
// 				<div style={{ marginTop: 200 }}></div>
// 				<svg ref={this.chart2} style={{ width: 3000, height: 200 }}></svg>
// 			</div>
// 		);
// 	}
// }

// export default DoubleChart;
