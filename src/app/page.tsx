import { auth } from "@/auth";
import { SignIn } from "@/components/signIn";
import { SignOut } from "@/components/signOut";

export default async function Home() {
  const session = await auth();
  console.log(session);

  if (!session)
    return (
      <div>
        I am not signed in!!!
        <SignIn />
      </div>
    );
  if (session)
    return (
      <div>
        LOGGED IN
        {session.user?.name}
        <SignOut />
      </div>
    );
}
