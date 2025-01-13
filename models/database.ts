// database/index.ts
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from './schema';
import migrations from './migrations';
import User from './userData'; 
import Reason from './reasons';
import personalReasons from './personReasons';
import Triggers from './triggers';

// Create the adapter
const adapter = new SQLiteAdapter({
  dbName: 'MyAppDB',
  schema: mySchema,
  migrations,
});

// Create the database
export const database = new Database({
  adapter,
  modelClasses: [User,Reason,personalReasons,Triggers], 
  
});