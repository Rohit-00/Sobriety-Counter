// reasons.ts
import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';
import User from './userData'; // Import the User model

export default class Reason extends Model {
  static table = 'reasons';

  @field('reason') reason!: string;
  @field('date') date!: string;
  @field('time') time!: number;
  @field('user') userId!:string;
  @relation('user', 'userId') user!: User; // Fix: Use 'userId' as the foreign key
}