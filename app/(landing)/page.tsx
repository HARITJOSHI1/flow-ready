import { currentUser } from "@clerk/nextjs/server";
import LandingPage from "./_components/landing-page";

const page = async () => {
  const user = await currentUser();
  return <LandingPage userId={user?.id} />;
};

export default page;
