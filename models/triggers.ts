// reasons.ts
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Triggers extends Model {
  static table = 'triggers';
  @field('userId') userId!: string;
  @field('rank') rank!: number;
  @field('trigger') trigger!: string;


}