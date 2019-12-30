import { Constants } from '../../constants/index'

export function ParseJSON (response) {
  return response.json()
}

export function CheckStatusGet (response) {
  return checkStatus(response, Constants.GET_SUCCESS_STATUS_CODE)
}
export function CheckStatusDelete (response) {
  return checkStatus(response, Constants.DELETE_SUCCESS_STATUS_CODE)
}

export function CheckStatusPost (response) {
  return checkStatus(response, Constants.POST_SUCCESS_STATUS_CODE)
}
export function CheckStatusPostAsync (response) {
  return checkStatus(response, Constants.ASYNC_TASK_POST_SUCCESS_STATUS_CODE)
}

export function CheckStatusPut (response) {
  return checkStatus(response, Constants.PUT_SUCCESS_STATUS_CODE)
}

function checkStatus (response, successStatusCode) {
  if (
    response.status === successStatusCode ||
    response.status === Constants.NO_CONTENT_STATUS_CODE ||
    response.status === Constants.GET_SUCCESS_STATUS_CODE
  ) {
    return response
  }
  const error = new Error(`HTTP Error ${response.statusText}`)
  error.status = response.statusText
  error.response = response
  throw error
}
