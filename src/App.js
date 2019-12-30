/* eslint-disable no-console */
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"; // eslint-disable-line
import { Container } from "reactstrap";
import "./bootstrap.css";
import "./App.css";
import { Header } from "./components/header";
import { Home } from "./components/home";
import { RouteUrls } from "./constants/route-urls";
import { GetUserInfo } from "./actions/backend";
import { Constants } from "./constants/index";
import { GetGitLabOAuthURL } from "./OAuth";

const initialUserInfo = {
	username: "",
	name: "",
	email: "",
	memNonProdGuid: "",
	memProdGuid: "",
	dalNonProdGuid: "",
	dalProdGuid: "",
	hasDevPlaygroundAccess: false,
	isLoading: true,
	hasRequestFailed: false
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			oAuth: {
				token: null,
				createdAt: null
			},
			userInfo: initialUserInfo,
			selfServiceView: Constants.SLOTTING_NAV_VIEW
		};
		if (window.location.pathname && window.location.pathname !== "/") {
			window.location.href = GetGitLabOAuthURL(window.location.pathname);
		}
	}

	setOAuthToken = (GatewayToken, accessToken) => {
		this.setUserInfo(accessToken);
		this.setState({
			oAuth: {
				token: accessToken,
				GatewayToken: GatewayToken,
				createdAt: new Date()
			}
		});
	};

	setUserInfo = token => {
		GetUserInfo(token, data => {
			this.setState({
				userInfo: {
					username: data.username,
					name: data.name,
					email: data.email,
					isLoading: false,
					hasRequestFailed: false
				}
			});
		}).catch(error => {
			console.log(error);
			this.setState({
				userInfo: initialUserInfo,
				isLoading: false,
				hasRequestFailed: true
			});
		});
	};

	setUserInfoToNull = () => {
		this.setState({
			userInfo: undefined
		});
	};

	setSelfServiceNavView = view => {
		this.setState({
			selfServiceView: view
		});
	};

	render() {
		return (
			<BrowserRouter>
				<Container>
					<Route
						render={props => (
							<Header
								{...props}
								oAuth={this.state.oAuth}
								selfServiceView={this.state.selfServiceView}
								setSelfServiceNavView={this.setSelfServiceNavView}
							/>
						)}
					/>
					<br />
					<Switch>
						<Route
							exact
							path={RouteUrls.HOME_URL}
							render={props => (
								<Home
									{...props}
									oAuth={this.state.oAuth}
									setUserInfoToNull={this.setUserInfoToNull}
									setOAuthToken={this.setOAuthToken}
								/>
							)}
						/>
					</Switch>
				</Container>
			</BrowserRouter>
		);
	}
}

export default App;
