import { ListProps } from "@/stories/repo-store.types";
import { database } from "../../database";

export async function GET(
  _request: Request,
  { userId }: Record<string, string>
): Promise<Response> {
  console.log({ userId });

  if (!userId) {
    return new Response("No userId found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const response = await database.app.name.

  const lists: ListProps[] = response.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    userId: doc.data().userId,
    createdAt: doc.data().createdAt,
    updatedAt: doc.data().updatedAt,
  }));

  return Response.json(lists);
}
