import { buildURL } from "../utils";
import { Constants } from "../constants";

export function RedirectToGitLabForOAuth() {
	window.location.assign(GetGitLabOAuthURL());
}

export function GetGitLabOAuthURL(path = "") {
	const url = buildURL(`${Constants.AUTHORIZE_URL}`, {
		client_id: Constants.CLIENT_ID,
		redirect_uri: Constants.REDIRECT_URI,
		response_type: "code",
		state: JSON.stringify({
			to: `${window.location.origin}?deep_linking_path=${path}`
		})
	});

	return url;
}
