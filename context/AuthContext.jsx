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

        if (currentSession?.user) {
          setTimeout(() =>{
            fetchUser(currentSession.user);
          },3000)
        }
      }

      setLoading(false);
    };

    const fetchUser = async (user) => {
      if (!user) return;

      const userType = user?.user_metadata?.options?.data?.user_type;

      if (userType === "customer") {
        const { data, error } = await supabase
          .from("customer")
          .select("*")
          .eq("userId", user.id)
          .limit(1);

        if (error) {
          console.error("Error fetching customer data:", error.message);
        } else if (data?.length > 0) {
          setUserType("customer");
          setUser(data[0]);
        } else {
          console.log("No customer found 45.");
        }
      } else if (userType === "builder") {
        const { data, error } = await supabase
          .from("builder")
          .select("*")
          .eq("userId", user.id);

        if (error) {
          console.error("Error fetching builder data:", error.message);
        } else {
          setUserType("builder");
          setUser(data[0]);
        }
      }
    };

    fetchSessionAndUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session?.user) {
        setTimeout(() => {
          fetchUser(session.user);
        }, 3000);
      } else {
        setUser(null);
        setUserType(null);
      }
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