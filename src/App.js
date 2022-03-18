import './App.css';
import DoubleChart from './DoubleChart';
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Navbar from './Navbar';
import data from './getData';
import 'bootstrap/dist/css/bootstrap.min.css';

const row = (d) => {
	d.used = +d.used;
	return d;
};

function App() {
	const [d1, setD1] = useState([]);
	useEffect(() => {
		data.then((d) => {
			setD1(d);
		});
	}, []);
	return (
		<div className="App">
			<Navbar />
			<div className="bg" style={{ display: 'flex', flexDirection: 'row' }}>
				<DoubleChart data={d1} />
			</div>
		</div>
	);
}

export default App;
