import React from "react";
import {
	Button,
	FormGroup,
	FormFeedback,
	FormText,
	ListGroup,
	ListGroupItem,
	Badge,
	Label,
	Input,
	Row,
	Form,
	Col,
	Modal,
	ModalHeader,
	ModalBody,
	Table,
	ModalFooter,
	Spinner
} from "reactstrap";

import Octicon, { Smiley, Report } from "@githubprimer/octicons-react";
import { CreateGroupRequest,UpdateGroupRequest,GetIndividualGroup,IpDnsSearch,GroupSearch,GroupSearchbyRecentandMe,GroupSearchbyRecent,GroupSearchbyMe } from "../../actions/backend/index";

export class ModalWindowGroups extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groupname: "",
			hostName: "",
			hoststoadd: [],
			groupnames: [],
			formErrors: {
				groupName: {
					isValid: false,
					message: ""
				}
			}
		};
	}
	removeHostfromGroup = index => {
		let { hoststoadd } = this.state;
		hoststoadd.splice(index, 1);
		this.setState({
			hoststoadd
		});
	};
	
	addHosttoGroup  = name => {
		let { hoststoadd } = this.state;
		this.props.associatedHosts.forEach(host => {
			if (host.hostName === name) {
				hoststoadd.push(host);
			}
		});
		this.setState({
			hoststoadd
		});
	};
	updateGroupContent = (e, index) => {
		let { name, value } = e.target;
		e.preventDefault();
		console.log(e.target.checked);
		if (e.target.checked === true) {
			this.addHosttoGroup(name);
		}
		else {
			this.removeHostfromGroup(index);
		}
	};
	componentWillMount() {
		let { groupnames } = this.state;

		GroupSearchbyMe("Search", data => {
			console.log("THIS IS WHERE IT IS ")
			groupnames = data;
			this.setState({
				groupnames
			});
		}).catch(err => {});
		
		let { Type } = this.props;
		
		//more to do here, will have to do same for type update.
		if (Type == "Update"){
			let middleware = this.props.associatedHosts;
			this.setState({
				hoststoadd: middleware
			});
		}
	}
	renderModalFooter = () => {
		let request = this.props.request;
		return (
			<Button
				color={request.failed ? "warning" : "primary"}
				onClick={this.props.footerButtonOnClick}
			>
				{this.props.footerButtonText}
			</Button>
		);
	};

	getProcessingHeader = () => {
		let { processing } = this.props;
		if (typeof processing !== "undefined") {
			if (typeof processing.header !== "undefined") {
				return processing.header;
			}
		}
		return "Please wait!";
	};

	PromptforName = () => {
		return "We are processing your request.";
	};

	getErrorHeader = () => {
		let { error } = this.props;
		if (typeof error !== "undefined") {
			if (typeof error.header !== "undefined") {
				return error.header;
			}
		}
		return "Request has failed!";
	};

	getErrorBody = () => {
		let { error } = this.props;
		if (typeof error !== "undefined") {
			if (typeof error.body !== "undefined") {
				return error.body;
			}
		}
		return "Your request has failed, please reach out to Miclain Keffeler for further assitance!";
	};
    handleKeyDown = e => {
		if (e.key === "Enter") {
			if (this.isFormValid()) {
				this.submit();
			}
		}
	};
	renderAssociatedHosts = () => {
		let { associatedHosts,Type } = this.props;
		if (Type == "Create" ){
			return associatedHosts.map((host, index) => {
				return (
					<tr key={index}>
						<td>{host.hostType}</td>
						<td>{host.hostName}</td>
						<td>{host.ipAddress}</td>
						<td>{host.description}</td>
						<td>
						<Label check>
									<Input
										type="checkbox"
										name={host.hostName}
										id={host.hostName}
										onChange={e => this.updateGroupContent(e, index)}
									/>{" "}
									Include in Group?
								</Label>
						</td>
					</tr>
				);
			});
		}
		if (Type == "Update"){
			return associatedHosts.map((host, index) => {
				return (
					<tr key={index}>
						<td>{host.hostType}</td>
						<td>{host.hostName}</td>
						<td>{host.ipAddress}</td>
						<td>{host.description}</td>
						<td>
						<Label check>
									<Input
										type="checkbox"
										defaultChecked="true"
										name={host.hostName}
										id={host.hostName}
										onChange={e => this.updateGroupContent(e, index)}
									/>{" "}
									Include in Group?
								</Label>
						</td>
					</tr>
				);
			});
		}
		else{
			return associatedHosts.map((host, index) => {
				return (
					<tr key={index}>
						<td>{host.hostType}</td>
						<td>{host.hostName}</td>
						<td>{host.ipAddress}</td>
						<td>{host.description}</td>
					</tr>
				);
			});
		}
	};
	closemodal = () => {
		let { request } = this.props;
		
		request.processing = true;	
		this.setState({ request });
	
		request.submitted = true;
		request.processing = false;
		request.showModal = false;

		this.setState({ request });

	};
	updategroup = () => {
		let { token,request } = this.props;
		let { hostName,hoststoadd } = this.state;
		let body = {
			groupname: hostName,
			groupcontent: hoststoadd,
			token: token
		};

		
		request.processing = true;
		this.setState({ request });
		
		UpdateGroupRequest(JSON.stringify(body))
			.then(() => {
				request.submitted = true;
				request.processing = false;
				hoststoadd = [];
				this.setState({ request,hoststoadd });
			})
			.catch(error => {
				console.log(error);
				request.failed = true;
				request.processing = false;
				this.setState({ request });
			});
			this.addAssociatedHost();
		

	};
    submit = () => {
		let { token,request } = this.props;
		let { hoststoadd,groupname } = this.state;
		let body = {
			groupname: groupname,
			groupcontent: hoststoadd,
			token: token
		};

		
		request.processing = true;
		
		this.setState({ request });
		
		CreateGroupRequest(JSON.stringify(body))
			.then(() => {
				request.submitted = true;
				request.processing = false;
				this.setState({ request });
			})
			.catch(error => {
				console.log(error);
				request.failed = true;
				request.processing = false;
				this.setState({ request });
			});
			this.addAssociatedHost();
			this.props.clearAssociatedHosts(hoststoadd);
			hoststoadd = [];
			this.setState({ request,hoststoadd });



	};
	getSuccessBody = () => {
		let { success } = this.props;
		if (typeof success !== "undefined") {
			if (typeof success.body !== "undefined") {
				return success.body;
			}
		}
		return "Your request has been submitted, please provide us up to 4 hours to review and process the request.";
	};
	CheckifGroupExists = searchTerm => {
		let { formErrors } = this.state;
		GetIndividualGroup(searchTerm, data => {
			if (data.length > 0) {
				formErrors.groupName.isValid = false;
				this.setState({
					formErrors
				});
			} 
		}).catch(err => {});
	};
	handleChange = async event => {
		let { name, value } = event.target;
		console.log("THIS EVENT IS")
		console.log(name)
		let { description, formErrors,filteronmygroups,trueHostname,ipAddress,recentgroups,groupnames } = this.state;
		let groupnamesinternal = groupnames;
		let hostType = this.state.hostType;
		let recentgroupsinternal = recentgroups;
		let filteronmygroupsinternal = filteronmygroups;
		let searchTerm = value;
		if (recentgroupsinternal === ""){
			recentgroupsinternal = false;
		}
		if (filteronmygroupsinternal === ""){
			filteronmygroupsinternal = false;
		}
		switch (name) {
			case "groupname":
				value = value.toLowerCase();

				if (value.length < 4){
					formErrors.groupName.message =
						"That group name isn't long enough!";
					formErrors.groupName.isValid = false;
				}
				case "filteronmygroups":
				searchTerm = value;
				filteronmygroupsinternal = event.target.checked;
				if (filteronmygroupsinternal === true && recentgroupsinternal === true){
					await GroupSearchbyRecentandMe(searchTerm, data => {
						formErrors.ipAddress.isValid = true;
						formErrors.hostName.isValid = true;
						groupnamesinternal = data;
						description = "Custom Group";
						trueHostname = data[0]["groupName"];
						ipAddress = "NA";
						
					}).catch(err => {});
				}
				else if (filteronmygroupsinternal === false && recentgroupsinternal === true){
					await GroupSearchbyRecent(searchTerm, data => {
						formErrors.ipAddress.isValid = true;
						formErrors.hostName.isValid = true;
						groupnamesinternal = data;
						description = "Custom Group";
						trueHostname = data[0]["groupName"];
						ipAddress = "NA";
					}).catch(err => {});
				}
				else if (filteronmygroupsinternal === true && recentgroupsinternal === false){
					await GroupSearchbyMe(searchTerm, data => {
						formErrors.ipAddress.isValid = true;
						formErrors.hostName.isValid = true;
						groupnamesinternal = data;
						description = "Custom Group";
						trueHostname = data[0]["groupName"];
						ipAddress = "NA";
					}).catch(err => {});
				}
				else {
					await GroupSearch(searchTerm, data => {
						formErrors.ipAddress.isValid = true;
						formErrors.hostName.isValid = true;
						console.log(data);
						groupnamesinternal = data;
						description = "Custom Group";
						trueHostname = data[0]["groupName"];
						ipAddress = "NA";
					}).catch(err => {});
				}
				break;
			case "recentgroups":
				searchTerm = value;
				recentgroupsinternal = event.target.checked;
				
				if (filteronmygroupsinternal === true && recentgroupsinternal === true){
					await GroupSearchbyRecentandMe(searchTerm, data => {
						formErrors.ipAddress.isValid = true;
						formErrors.hostName.isValid = true;
						groupnamesinternal = data;
						description = "Custom Group";
						trueHostname = data[0]["groupName"];
						ipAddress = "NA";
						
					}).catch(err => {});
				}
				else if (filteronmygroupsinternal === false && recentgroupsinternal === true){
					await GroupSearchbyRecent(searchTerm, data => {
						formErrors.ipAddress.isValid = true;
						formErrors.hostName.isValid = true;
						groupnamesinternal = data;
						description = "Custom Group";
						trueHostname = data[0]["groupName"];
						ipAddress = "NA";
					}).catch(err => {});
				}
				else if (filteronmygroupsinternal === true && recentgroupsinternal === false){
					await GroupSearchbyMe(searchTerm, data => {
						formErrors.ipAddress.isValid = true;
						formErrors.hostName.isValid = true;
						groupnamesinternal = data;
						description = "Custom Group";
						trueHostname = data[0]["groupName"];
						ipAddress = "NA";
					}).catch(err => {});
				}
				else {
					await GroupSearch(searchTerm, data => {
						formErrors.ipAddress.isValid = true;
						formErrors.hostName.isValid = true;
						console.log(data);
						groupnamesinternal = data;
						description = "Custom Group";
						trueHostname = data[0]["groupName"];
						ipAddress = "NA";
					}).catch(err => {});
				}

				break;
			case "hostName":
				await GetIndividualGroup(searchTerm, data => {
						console.log(data);
						this.props.associatedHosts = data;
					}).catch(err => {});
				
					break;
			default:
				break;
			
		}

		console.log(groupnamesinternal);
		await this.setState({
			description,
			formErrors,
			[name]: value,
			recentgroups: recentgroupsinternal,
			filteronmygroups: filteronmygroupsinternal,
			groupnames: groupnamesinternal,
			description: description,
			trueHostname: trueHostname,
			ipAddress: ipAddress

		});
	};
	addAssociatedHost = () => {
		let { request } = this.props;
		let { groupname,associatedHosts } = this.state;
		let host = {
			hostType: "Group",
			hostName: groupname,
			description: "Custom Group",
			ipAddress: "NA"
		};
		this.props.addAssociatedHost(host);
		this.setState({
			groupname: ""
		});
		request.showModal = false;
	};
	getGroups = () => {
		console.log("I CALLED GET GROUPS");
		let { groupnames } = this.state;
		if (groupnames.length > 0) {
			return groupnames.map(group => {
				return <option value={group.groupName}>{group.groupName}</option>;
			});
		}
		return <option value="">no groups matched this filter</option>;
	};
	render() {
		let request = this.props.request;
		let { formErrors, groupname,groupnames,hoststoadd } = this.state;
		return (
			<Modal isOpen={request.showModal} className="font-weight-bold">
				<ModalHeader hidden={!request.processing} className="bg-warning">
					<Spinner type="grow" />info
					&nbsp; {this.getProcessingHeader()}
				</ModalHeader>
				<ModalBody hidden={!request.getname} className="primary">
                <Form>
                    <Row>
						<Col xs="12" lg="4" className={this.props.Type === "View" || this.props.Type === "Update" ? "" : "d-none"}>
							<FormGroup>
									<Label for="hostName">Custom Groups:</Label>
									<Input
										type="select"
										name="hostName"
										id="hostName"
										onChange={e => this.handleChange(e)}
										defaultValue="Select a Group"
									>
										{this.getGroups()}
									</Input>
								</FormGroup>
						</Col>
						<Col
						xs="12"
						lg="2"
						className={this.props.Type === "Create" ? "" : "d-none"}
					>
                            <FormGroup>
                                <Label for="groupname">Group Name:</Label>
								<Input
								type="text"
								name="groupname"
								id="groupname"
								placeholder="Like: b2b-webdmz-servers"
								onChange={e => this.handleChange(e)}
								defaultValue={groupname}
								value={groupname}
								valid={formErrors.groupName.isValid}
								invalid={formErrors.groupName.isValid}

							/>
							<FormText
								color="success"
								className={groupname.length > 3 && formErrors.groupName.isValid ? "" : "d-none"}
							>
								Valid Group Name
							</FormText>
							<FormFeedback>{formErrors.groupName.message}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
					<Row>
					<Col xs="12">
						<div class="table-responsive">
							<Table className="table-dark">
								<thead>
									<tr>
										<th>Host Type</th>
										<th>Host/Network Name</th>
										<th>IP Address/Network Range</th>
										<th>Add to New Group?</th>
										<th />
									</tr>
								</thead>
								<tbody>{this.props.associatedHosts && this.renderAssociatedHosts()}</tbody>
							</Table>
						</div>
					</Col>
				</Row>
					<Row>
					<Col xs="12" lg="4" className={this.props.Type === "Create" ? "" : "d-none"}>
						<FormGroup className="clearfix">
                        <Button
								onClick={this.submit}
								color="success"
								className="float-right"
								disabled={groupname.length < 4 && hoststoadd.length < 2 }

							>
								Submit
							</Button>
						</FormGroup>
					</Col>
					<Col xs="12" lg="4" className={this.props.Type === "View" || this.props.Type === "Update" || this.props.Type === "Create" ? "" : "d-none"}>
						<FormGroup className="clearfix">
                        <Button
								onClick={this.closemodal}
								color="success"
								className="float-right"

							>
								Close, Go Back to Adding Hosts
							</Button>
						</FormGroup>
					</Col>
					<Col xs="12" lg="4" className={this.props.Type === "Update" ? "" : "d-none"}>
						<FormGroup className="clearfix">
                        <Button
								onClick={this.updategroup}
								color="success"
								className="float-right"

							>
								Update Group
							</Button>
						</FormGroup>
					</Col>

				</Row>
                    </Form>
				</ModalBody>
			</Modal>
		);
	}
}
