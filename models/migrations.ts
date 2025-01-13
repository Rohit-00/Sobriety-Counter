// app/model/migrations.js

import { tableSchema } from '@nozbe/watermelondb'
import { schemaMigrations, createTable, addColumns } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 12, // Target schema version
      steps: [
        addColumns({
          table: 'personalReasons',
          columns: [
            { name: 'personalReason', type: 'string'}
           
          ],
        }),
      ],
    },
  ],
})