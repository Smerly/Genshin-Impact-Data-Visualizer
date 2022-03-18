import * as d3 from 'd3';

async function handleData() {
	const data = await d3.csv('data.csv');
	return data;
}

// reactjs d3 with csv

export default handleData();
