'use strict';

import BaseFilter from './BaseFilter';

export default class BooleanFilter extends BaseFilter {
  public rule() {
    return this.value === 'true' || this.value === 'false';
  }

  public apply() {
    return this.query.where(
      this.field,
      this.operation,
      this.handleBooleanValue(this.value),
    );
  }

  public handleBooleanValue(value) {
    if (value == 'true') return true;
    if (value == 'false') return false;
    return value;
  }
}
