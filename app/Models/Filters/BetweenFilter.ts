'use strict';

import BaseFilter from './BaseFilter';

export default class BetweenFilter extends BaseFilter {
  public rule() {
    return this.operation.toLowerCase() === 'between';
  }

  public apply() {
    return this.query.whereBetween(this.field, this.value);
  }
}
