'use strict';

import BaseFilter from './BaseFilter';
import Database from '@ioc:Adonis/Lucid/Database';
import moment from 'moment';

export default class DateEqualFilter extends BaseFilter {
  public rule() {
    return !!(
      typeof this.value === 'string' &&
      this.isValidDate() &&
      this.getDate() &&
      this.operation === '='
    );
  }

  public apply() {
    return this.query.where(
      Database.raw(
        `DATE_FORMAT(${this.field}, '%Y-%m-%d') = "${this.getDate()}"`,
      ),
    );
  }

  public isValidDate() {
    var dateReg = /^\d{4}([./-])\d{2}\1\d{2}$/;
    return typeof this.value === 'string' ? this.value.match(dateReg) : false;
  }

  public getDate() {
    var date = moment(this.value, 'YYYY-MM-DD');
    return date.isValid() ? date.format('YYYY-MM-DD') : false;
  }
}
