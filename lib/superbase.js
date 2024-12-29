import { createClient } from '@supabase/supabase-js'
import Constants from "expo-constants";

const projectId = Constants.expoConfig.extra.projectId;
const supabaseUrl = Constants.expoConfig.extra.supabaseUrl;
const supabaseKey = Constants.expoConfig.extra.supabaseKey;

export const supabase = createClient(supabaseUrl, supabaseKey)