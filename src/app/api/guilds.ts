import { NextApiRequest, NextApiResponse } from "next";

interface Guild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = req.query;

  if (!accessToken || typeof accessToken !== "string") {
    return res
      .status(401)
      .json({ error: "Access token is missing or invalid." });
  }

  try {
    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch guilds from Discord API.");
    }

    const guilds: Guild[] = await response.json();
    res.status(200).json({ guilds });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
