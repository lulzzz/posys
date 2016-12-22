import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Request, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from 'ng2-webstorage';

@Injectable()
export class HttpClient {

  private locationName: string;
  private terminalId: string;

  constructor(private http: Http,
              private localStorage: LocalStorageService) {
    this.localStorage.observe('locationName').subscribe(v => this.locationName = v);
    this.localStorage.observe('terminalId').subscribe(v => this.terminalId = v);
  }

  private _setCustomHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {

    if(!options) {
      options = new RequestOptions({});
    }

    if(!options.headers) {
      options.headers = new Headers();
    }

    if(this.locationName) {
      options.headers.set('X-Location', this.locationName);
    }

    if(this.terminalId) {
      options.headers.set('X-Terminal', this.terminalId);
    }

    return options;
  }

  get(url, options?) {
    const reqOpts = { method: RequestMethod.Get };
    _.extend(reqOpts, options);
    return this.request(url, reqOpts);
  }

  delete(url, options?) {
    const reqOpts = { method: RequestMethod.Delete };
    _.extend(reqOpts, options);
    return this.request(url, reqOpts);
  }

  post(url, body, options?) {
    const reqOpts = { method: RequestMethod.Post, body };
    _.extend(reqOpts, options);
    return this.request(url, reqOpts);
  }

  put(url, body, options?) {
    const reqOpts = { method: RequestMethod.Put, body };
    _.extend(reqOpts, options);
    return this.request(url, reqOpts);
  }

  patch(url, body, options?) {
    const reqOpts = { method: RequestMethod.Patch, body };
    _.extend(reqOpts, options);
    return this.request(url, reqOpts);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    options = this._setCustomHeaders(options);
    return this.http.request(url, options);
  }
}
