// schema.ts
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 8,
  tables: [
    tableSchema({
      name: 'reasons',    //This one's for tracking 
      columns: [
        { name: 'date', type: 'string' },
        { name: 'time', type: 'string' },
        { name: 'reason', type: 'string', isOptional: true },
        { name: 'userId', type: 'string', isIndexed: true }, // Foreign key
        { name: 'user', type:'string',isIndexed:true}
      ],
    }),
    tableSchema({
      name: 'user',   //This is the user
      columns: [
        { name: 'username', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' },
        { name: 'totalCount', type: 'number' },
        { name: 'userId', type: 'string', isIndexed: true }, // Primary key
      ],
    }),
    tableSchema({
      name:'personalReasons',  //This is the original reasons that users set
      columns: [
        {name:'personalReason',type:'string'}
      ]
    }),
    tableSchema({
      name:'triggers',  //This is the triggers don't mistake it for reasons
      columns: [
        {name:'userId',type:'string'},
        {name:'rank',type:'number'},
        {name:'trigger',type:'string'}
      ]
    })

  ],
});