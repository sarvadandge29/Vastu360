import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/superbase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionAndUser = async () => {
      setLoading(true);

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error fetching session:", sessionError.message);
      } else {
        const currentSession = sessionData.session;
        setSession(currentSession);

        if (currentSession?.user?.user_metadata?.user_type === "customer") {
          const { data: customerData, error: customerError } = await supabase
            .from("customer") 
            .select("*")
            .eq("id", currentSession.user.id)
            .single();

          if (customerError) {
            console.error("Error fetching customer data:", customerError.message);
          } else {
            setUser(customerData);
          }
        } else {
          setUser(currentSession?.user ?? null);
        }
      }

      setLoading(false);
    };

    fetchSessionAndUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);

      const user_type = session?.user?.user_metadata?.options?.data?.user_type

      if (user_type === "customer") {
        supabase
          .from("customer")
          .select("*")
          .eq("userId", session.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error("Error fetching customer data on state change:", error.message);
            } else {
              setUserType("customer")
              setUser(data);
            }
          });
      } else if (user_type === "builder") {
        supabase
          .from("builder")
          .select("*")
          .eq("userId", session.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error("Error fetching builder data on state change:", error.message);
            } else {
              setUserType("builder")
              setUser(data);
            }
          });
        }
        setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, userType, supabase }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
