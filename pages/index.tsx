import DataTable from "@/components/DataTable/DataTable";
import { AuthContext } from "@/contexts/AuthContext";
import useTankData from "@/hooks/useTankData";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const { loggedIn, loading } = useContext(AuthContext);
  const { data, error, loading: dataLoading } = useTankData();

  useEffect(() => {
    if (!loading && !loggedIn) {
      router.push("/account/login");
    }
  }, [loading, loggedIn, router]);

  if (loading || dataLoading) {
    return "loading";
  }

  if (!loggedIn) {
    return null;
  }

  if (error) {
    return <p>Sorry, something went wrong</p>;
  }

  return (
      <DataTable data={data} />
  );
};

export default Home;
