import { BaseModel } from '@ioc:Adonis/Lucid/Orm';
import { DatabaseQueryBuilderContract } from '@ioc:Adonis/Lucid/Database';

export default class BaseFilter {
  constructor({ Model, query, field, operation, value, searchEntity }) {
    this.model = Model;
    this.query = query;
    this.field = field;
    this.operation = operation;
    this.value = value;
    this.searchEntity = searchEntity;
  }

  public model: typeof BaseModel;
  public query: DatabaseQueryBuilderContract;
  public field: string;
  public operation: string;
  public value: string;
  public searchEntity: string;

  public withBaseRules() {
    return true;
  }

  public rule() {
    return true;
  }

  public _baseRules() {
    return typeof this.field !== 'undefined';
  }

  public check() {
    let baseRules = this.withBaseRules() ? this._baseRules() : true;
    return baseRules && this.rule();
  }

  public apply() {
    return this.query.where(this.field, this.operation, this.value);
  }
}
