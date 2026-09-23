const { Client } = require('pg');

const client = new Client({
  host: 'aws-0-ap-southeast-2.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  user: 'postgres.nbgdryaqfrvthkkxminq',
  password: 'Bismillah@1m202303',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to DB via pg');
    
    // Check if column exists
    const checkRes = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='User' and column_name='monthlyTarget';
    `);
    
    if (checkRes.rows.length === 0) {
      console.log('Column monthlyTarget does not exist. Adding it...');
      await client.query(`ALTER TABLE "User" ADD COLUMN "monthlyTarget" INTEGER NOT NULL DEFAULT 5;`);
      console.log('Column added successfully.');
    } else {
      console.log('Column already exists.');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

run();
