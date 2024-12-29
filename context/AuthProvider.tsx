import { supabase } from "@/lib/superbase";
import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type AuthData = {
  session: Session | null;
  mounting: boolean;
  user: any;
};

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<any>(null);
  const [mounting, setMounting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const AuthContext = createContext<AuthData>({
    session: null,
    mounting: true,
    user: null,
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);

        if (session) {
          const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (error) {
            setError("Failed to fetch user data");
            console.log("error", error);
          } else {
            setUser(user);
          }
        }

        setMounting(false);
      } catch (err) {
        setError("An error occurred while fetching session data");
        console.log("error", err);
      }
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // If mounting or error state, show loading/error message
  if (mounting) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <AuthContext.Provider value={{ session, mounting, user }}>
      {children}
    </AuthContext.Provider>
  );
}
