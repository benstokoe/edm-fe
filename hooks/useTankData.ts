import fetchTankData from "@/api/fetchTankData";
import { useEffect, useState } from "react";

export type Tank = {
  name: string;
  year: string;
};

type UseTankData = {
  loading: boolean;
  error: boolean;
  data: Tank[] | undefined;
};

const useTankData = (): UseTankData => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTankData();

      if (data.error) {
        setError(data.error);

        return;
      }

      setData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { data, error, loading };
};

export default useTankData;
