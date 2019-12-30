import React from 'react'
import { RouteUrls } from './route-urls'

export class Constants extends React.Component {
  static GET_SUCCESS_STATUS_CODE = 200;
  static NO_CONTENT_STATUS_CODE = 204;
  static POST_SUCCESS_STATUS_CODE = 201;
  static ASYNC_TASK_POST_SUCCESS_STATUS_CODE = 202;
  static PUT_SUCCESS_STATUS_CODE = 204;
  static DELETE_SUCCESS_STATUS_CODE = 204;
  static INTEGER_ONLY_REGEX = /(^[0-9$]{1,9})/;
}
