import { Transport } from 'jmap-client';
import * as axios from 'axios';

export default class AxiosTransport extends Transport {
  /**
   * A {@link Transport} implementation for [Request]{@link https://github.com/request/request}.<br />
   * This class requires `request` to be installed as dependency.
   *
   * @constructor
   *
   * @param [promiseProvider=null] {PromiseProvider} A {@link PromiseProvider} implementation.
   *
   * @see Transport
   */
  constructor(promiseProvider) {
    super();

    this.promiseProvider = promiseProvider;
  }

  post(url, headers, data, raw) {
    return this.promiseProvider.newPromise((resolve, reject) => {
      axios({
        url,
        headers,
        method: 'post',
        data,
        json: !raw
      })
        .then(response => resolve(response.data))
        .catch(err => reject(err));
    });
  }
}
