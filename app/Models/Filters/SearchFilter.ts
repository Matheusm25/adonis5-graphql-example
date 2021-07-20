'use strict';

import BaseFilter from './BaseFilter';

export default class SearchFilter extends BaseFilter {
  public withBaseRules() {
    return false;
  }

  public rule() {
    return this.field === undefined && !this.searchEntity;
  }

  public apply() {
    return this.model.search(this.value, this.query);
  }
}
