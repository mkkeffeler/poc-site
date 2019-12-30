import { CheckStatusGet, ParseJSON } from './utility'

export async function DoGet (url, headers, data) {
  var returnValue = await fetch(url, {
    method: 'GET',
    headers: headers
  })
    .then(CheckStatusGet)
    .then(ParseJSON)
    .then(data)
  return returnValue
}

export async function DoGetAsync (url, headers) {
  var response = await fetch(url, {
    method: 'GET',
    headers: headers
  }).then(CheckStatusGet)
  var data = await response.json()
  return data
}
