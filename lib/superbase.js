    import { createClient } from '@supabase/supabase-js'
    import Constants from "expo-constants";

    export const projectId = Constants.expoConfig.extra.projectId;
    export const supabaseUrl = Constants.expoConfig.extra.supabaseUrl;
    export const supabaseKey = Constants.expoConfig.extra.supabaseKey;

    export const supabase = createClient(supabaseUrl, supabaseKey)