import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wvrlzurpmqwjezgxjvjc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cmx6dXJwbXF3amV6Z3hqdmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MTQ5NTQsImV4cCI6MjA2NjQ5MDk1NH0.MKcQpVwZqONrHn5CwIl89qztV2hR65RBMseTzisqfyM'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
