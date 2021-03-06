import Mock from 'mockjs'
import {param2Obj} from '../src/utils'
// 根据环境不同引入不同api地址
import {baseApi} from '../src/config'

import user from './user'
import meetingList from './meeting-list'
import msgLIst from './msg-list'
import addressList from './address-list'
import pressList from './press-list'
import waitList from './wait-list'
import informList from './inform-list'
import emailList from './email-list'
import loginForm from './login-form'
import normalForm from './normal-form'
import receiveForm from './receive-form'
import meetingForm from './meeting-form'
import emailForm from './email-form'

const mocks = [
  ...user,
  ...meetingList,
  ...msgLIst,
  ...addressList,
  ...pressList,
  ...waitList,
  ...informList,
  ...emailList,
  ...loginForm,
  ...normalForm,
  ...receiveForm,
  ...meetingForm,
  ...emailForm
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const {body, type, url} = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${baseApi}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
