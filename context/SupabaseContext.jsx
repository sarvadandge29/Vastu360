import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/superbase';


const SupabaseContext = createContext(supabase);

const SupabaseProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export { SupabaseProvider, SupabaseContext };