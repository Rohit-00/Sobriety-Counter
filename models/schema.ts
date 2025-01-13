// schema.ts
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 7,
  tables: [
    tableSchema({
      name: 'reasons',
      columns: [
        { name: 'date', type: 'string' },
        { name: 'time', type: 'string' },
        { name: 'reason', type: 'string', isOptional: true },
        { name: 'userId', type: 'string', isIndexed: true }, // Foreign key
        { name: 'user', type:'string',isIndexed:true}
      ],
    }),
    tableSchema({
      name: 'user',
      columns: [
        { name: 'username', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' },
        { name: 'totalCount', type: 'number' },
        { name: 'userId', type: 'string', isIndexed: true }, // Primary key
      ],
    }),

  ],
});