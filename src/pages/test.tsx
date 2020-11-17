import { useEffect } from "react";
import { useSession, getSession } from "next-auth/client";

const testPage: React.FC = () => {
  const session = useSession();

  async function s() {
    const session = await getSession();
    console.log(`GET SESSION: ${JSON.stringify(session, null, 2)}`);
  }

  useEffect(() => {
    s();
  }, []);

  console.log(`SESSION: ${JSON.stringify(session, null, 2)}`);
  if (session) return <p>session</p>;
  else return <p>no session</p>;
};

export default testPage;
