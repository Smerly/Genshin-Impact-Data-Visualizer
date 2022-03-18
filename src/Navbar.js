import React, { useState } from 'react';
import logo from './static/images/genshin_logo.png';
function Navbar() {
	const [show, setShow] = useState(false);
	return (
		<div className="wrapper">
			{/* Actual Bar */}

			<nav className="sidebar" id={show ? 'show' : 'hidden'}>
				<div className="sidebar-dec">
					<div className="sidebar-header">
						<img src={logo} alt="Genshin Impact Logo" className="logo" />
						<h4> Data Visualizer </h4>
					</div>

					<ul className="list-unstyled components">
						<p>Chart 1</p>
						<li className="active">
							<a
								href="#homeSubmenu"
								data-toggle="collapse"
								aria-expanded="false"
								// className="dropdown-toggle"
							>
								Home
							</a>
						</li>
						<li>
							<a href="#">About</a>
						</li>
						<li>
							<a
								// href="#pageSubmenu"
								// data-toggle="collapse"
								// aria-expanded="false"
								className="navlinks"
							>
								Charts
							</a>
							<ul className="collapse list-unstyled" id="pageSubmenu">
								<li>
									<a href="#" className="navlinks">
										Page 1
									</a>
								</li>
								<li>
									<a href="#" className="navlinks">
										Page 2
									</a>
								</li>
								<li>
									<a href="#" className="navlinks">
										Page 3
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
			{/* <div id="content">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="container-fluid">
						<button
							type="button"
							id="sidebarCollapse"
							className="btn btn-info"
							onClick={() => {
								setShow(!show);
								console.log(show);
							}}
						>
							<i className="fas fa-align-left"></i>
							<span>Toggle Sidebar</span>
						</button>
					</div>
				</nav>
			</div> */}
		</div>

		// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

		// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

		// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

		// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

		// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

		// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

		// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
	);
}

export default Navbar;
