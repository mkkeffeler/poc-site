import { CheckStatusPost, ParseJSON, CheckStatusPostAsync } from './utility'

export async function DoPost (url, headers, body) {
  var returnValue = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  }).then(CheckStatusPost)

  return returnValue
}
export async function DoPostAsync (url, headers, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  }).then(CheckStatusPostAsync)

  return response.json()
}

export async function DoPostWithResponseBodyaSync (url, headers, body, data) {
  var returnValue = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  })
    .then(CheckStatusPostAsync)
    .then(ParseJSON)
    .then(data)
    .catch(error => {
      console.log(error)
    })

  return returnValue
}

export async function DoPostWithResponseBody (url, headers, body, data) {
  var returnValue = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  })
    .then(CheckStatusPost)
    .then(ParseJSON)
    .then(data)
    .catch(error => {
      console.log(error)
    })

  return returnValue
}
