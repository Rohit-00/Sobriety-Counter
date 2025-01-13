// app/model/migrations.js

import { schemaMigrations, createTable } from '@nozbe/watermelondb/Schema/migrations'
export const Migrations = [
  {
    toVersion: 1, // Target schema version
    steps: [
      // Add the `totalCount` column to the `user` table
      {
        type: 'add_columns',
        table: 'user',
     
      },
    ],
  },
]
export default schemaMigrations({
  migrations: [
    {
      toVersion: 8, // Target schema version
      steps: [
        
      ],
    },
  ],
})