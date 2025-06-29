import postgres from 'postgres'

const connectionString = process.env.wvrlzurpmqwjezgxjvjc.supabase.co
const sql = postgres(connectionString)

export default sql