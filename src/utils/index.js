import qs from "qs";
import { fetch2 } from "./fetch";

function buildURL(url, params) {
	if (params == null) return url;

	const serializedParams = qs.stringify(params);
	if (!serializedParams) return url;

	return `${url}${url.indexOf("?") < 0 ? "?" : "&"}${serializedParams}`;
}

function ParseQueryString(location, querystring) {
	let search;

	if (location != null) {
		search = location.search; // eslint-disable-line
	} else if (querystring != null) {
		search = querystring;
	} else {
		search = window.location.search; // eslint-disable-line
	}

	return qs.parse(search, { ignoreQueryPrefix: true });
}

export { buildURL, fetch2, ParseQueryString };
