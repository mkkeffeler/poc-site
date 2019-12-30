import { CheckStatusDelete, ParseJSON } from './utility'

export async function DoDelete (url, headers, data) {
  var returnValue = await fetch(url, {
    method: 'DELETE',
    headers: headers
  })
    .then(CheckStatusDelete)
    .then(ParseJSON)
    .then(data)
  return returnValue
}
