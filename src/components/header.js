import React, { Component } from "react";
import {
	Row,
	Col,
	Navbar,
	Nav,
	NavbarBrand,
	NavLink,
	NavItem,
	Button
} from "reactstrap";
import { GetGitLabOAuthURL } from "../OAuth";
import { RouteUrls } from "../constants/route-urls";
import { Constants } from "../constants/index";

const URL = GetGitLabOAuthURL();

export class Header extends Component {
	redirectToSelfService = e => {
		e.preventDefault();
		this.props.history.push(RouteUrls.SELF_SERVICE);
	};

	setSelfServiceView = (e, view) => {
		e.preventDefault();
		this.props.setSelfServiceNavView(view);
	};

	render() {
		let showSelfServiceNavLinks =
			window.location.pathname === RouteUrls.SELF_SERVICE;
		let hideConnectToGitLab = this.props.oAuth.token ? true : false;
		let { selfServiceView } = this.props;
		return (
			<div>
				<header>
					<Navbar
						expand="xs"
						className="border-bottom border-gray"
						style={{ height: 80 }}
					>
						<Row
							noGutters
							className="position-relative w-100 align-items-center"
						>
							<Col className="d-none d-sm-flex justify-content-end">
								<Nav navbar>
								</Nav>
							</Col>
						</Row>
					</Navbar>
				</header>
			</div>
		);
	}
}
