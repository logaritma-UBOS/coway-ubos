const { Client } = require('pg');

const client = new Client({
  host: 'aws-0-ap-southeast-2.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  user: 'postgres.nbgdryaqfrvthkkxminq',
  password: 'logaritma2026',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to DB via pg');
    
    // Check if columns exist
    const checkRes = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='User' and column_name IN ('hasProductLp', 'hasRecruitLp');
    `);
    
    const existingCols = checkRes.rows.map(r => r.column_name);
    
    if (!existingCols.includes('hasProductLp')) {
      console.log('Adding hasProductLp...');
      await client.query(`ALTER TABLE "User" ADD COLUMN "hasProductLp" BOOLEAN NOT NULL DEFAULT false;`);
    }
    
    if (!existingCols.includes('hasRecruitLp')) {
      console.log('Adding hasRecruitLp...');
      await client.query(`ALTER TABLE "User" ADD COLUMN "hasRecruitLp" BOOLEAN NOT NULL DEFAULT false;`);
    }
    
    console.log('Migration completed.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

run();
