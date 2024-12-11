import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);

  if (!session) return <div>I am not signed in!!!</div>;
  if (session)
    return (
      <div>
        LOGGED IN
        {session.user?.name}
      </div>
    );
}
