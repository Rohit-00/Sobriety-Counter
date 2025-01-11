// model/schema.js
import { appSchema, tableSchema } from '@nozbe/watermelondb'

type reasons = {
    reason : string,
    date   : string,
    time   : string,
}
export const mySchema = appSchema({ 
  version: 1,
  tables: [
    tableSchema({
      name: 'reasons',
      columns: [
        { name: 'userId', type: 'string' },
        { name: 'totalCount', type: 'number'},
        { name: 'reasons', type: 'string', isOptional:true },
      ]
    }),
    tableSchema({
        name:'user',
        columns: [
            {name :'username', type: 'string'},
            {name :'email', type: 'string'},
            {name :'password', type: 'string'},
        ]
    })
  ]
})