import { CheckStatusPut } from "./utility";
import { Constants } from "../../constants/index";

export async function DoPut(url, headers, body) {
	var returnValue = await fetch(url, {
		method: "PUT",
		headers: headers,
		body: body
	}).then(CheckStatusPut);

	return returnValue;
}
