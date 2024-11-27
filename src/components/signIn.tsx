import { signIn, auth } from "@/auth";
import { Button } from "@/components/ui/button";

export async function SignIn() {
  const session = await auth();
  if (!session)
    return (
      <div>
        <form
          action={async () => {
            "use server";
            await signIn("discord", {
              redirectTo: "/",
            });
          }}
        >
          <Button type="submit" variant="default">
            Log In
          </Button>
        </form>
      </div>
    );
}
