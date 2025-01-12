import { Model } from '@nozbe/watermelondb';
import { field, children } from '@nozbe/watermelondb/decorators';
import Reason from './reasons'; // Import the Reason model

export default class User extends Model {
  static table = 'user';

  @field('username') username!: string;
  @field('email') email!: string;
  @field('password') password!: string;
  @field('totalCount') totalCount!: number;
  @field('userId') userId!: string;

  @children('reasons') reasons!: Reason[]; // Define the inverse relationship
}