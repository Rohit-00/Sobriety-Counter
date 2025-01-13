// reasons.ts
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class personalReasons extends Model {
  static table = 'personalReasons';
  @field('personalReason') personalReason!: string;

}