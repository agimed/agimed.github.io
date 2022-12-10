import { createClient } from "@supabase/supabase-js";
import env from "../env";

const supabaseUrl = env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
