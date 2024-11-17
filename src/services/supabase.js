
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://qsrpcpslrrmticsafiqa.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcnBjcHNscnJtdGljc2FmaXFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyNjc4NzEsImV4cCI6MjA0Njg0Mzg3MX0._4hmLapIU_3X8xVjPf0TN_Rsfe7DB3UkclqyuYKGOdM";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;