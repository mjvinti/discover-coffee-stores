import Head from "next/head";
import { useRouter } from "next/router";

const DynamicRoute = () => {
  const { query } = useRouter();

  return (
    <div>
      <Head>
        <title>{query.dynamic}</title>
      </Head>
      Hi there! I am a dynamic route: {query.dynamic}
    </div>
  );
};

export default DynamicRoute;
