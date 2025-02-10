import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = <T,>(resources: string[]) => {
  const [data, setData] = useState<{ [key: string]: T | null }>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [prevResources, setPreviousResources] = useState<string[]>([]);

  useEffect(() => {
    if (JSON.stringify(prevResources) === JSON.stringify(resources)) {
      return;
    }

    setPreviousResources(resources);

    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          resources.map((resource) =>
            axios
              .get<T>(`https://www.dnd5eapi.co/api/${resource}`)
              .then((res) => ({
                key: resource,
                data: res.data,
              }))
          )
        );

        const responseData = responses.reduce((acc, curr) => {
          acc[curr.key] = curr.data;
          return acc;
        }, {} as { [key: string]: T });
        setData(responseData);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [resources, prevResources]);
  return { data, error, loading };
};

export default useFetch;
