"use client";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Guild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
}

async function Guilds() {
  // const { data: session } = useSession();
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [error, setError] = useState<string | null>(null);

  const session = await auth();

  useEffect(() => {
    if (session?.accessToken) {
      fetch(`/api/guilds?accessToken=${session.accessToken}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch guilds.");
          }
          return res.json();
        })
        .then((data) => setGuilds(data.guilds || []))
        .catch((err) => setError(err.message));
    }
  }, [session]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Your Discord Guilds</h1>
      {guilds.length === 0 ? (
        <p>No guilds found or user is not logged in.</p>
      ) : (
        <ul>
          {guilds.map((guild) => (
            <li key={guild.id}>
              <div>
                <p>{guild.name}</p>
                {guild.icon ? (
                  <img
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                    alt={guild.name}
                    width={50}
                  />
                ) : (
                  <span>No icon</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Guilds;
