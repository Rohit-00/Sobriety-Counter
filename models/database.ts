import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { mySchema } from './schema';
import { schemaMigrations } from '@nozbe/watermelondb/Schema/migrations';
import ReasonsModel from './userData';

const adapter = new SQLiteAdapter({
  schema: mySchema,
});

export const database = new Database({
  adapter,
  modelClasses:[ReasonsModel]
});
