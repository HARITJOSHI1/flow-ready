import db from "@/db";
import { workflow } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Editor from "../_components/editor";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const { id } = params;
  const { userId } = auth();

  if (!userId) return <div>unauthenticated</div>;
  const data = await db.select().from(workflow).where(eq(workflow.id, id));

  if (!data) return <div>No workflow</div>;
  return <Editor workflow={data[0]} />;
};

export default page;
