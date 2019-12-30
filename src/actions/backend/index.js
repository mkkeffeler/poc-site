import { ApiUrls } from '../../constants/api_urls'
import { Constants } from '../../constants/index'
import { DoGet, DoGetAsync } from './do-get'
import { DoPut } from './do-put'
import { DoPost, DoPostWithResponseBody, DoPostWithResponseBodyaSync, DoPostAsync } from './do-post'
import { DoDelete } from './do-delete'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const fortifyheaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const getHeaders = {
  Accept: 'application/json'
}

// User Section

export async function GetUserInfo (token, data) {
  headers.token = token
  return DoGet(ApiUrls.GET_USER_INFO, headers, data)
}

