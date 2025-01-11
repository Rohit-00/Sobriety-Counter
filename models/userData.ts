import { field, text } from '@nozbe/watermelondb/decorators'
import { Model } from '@nozbe/watermelondb'
export default class ReasonsModel extends Model {
  static table = 'reasons'

  @text('userId') userId:string
  @text('totalCount') totalCount:number
  @field('reasons') reasons:string
}