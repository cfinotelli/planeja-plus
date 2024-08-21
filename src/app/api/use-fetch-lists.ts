import { useQuery } from "@tanstack/react-query";

export const useFetchLists = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/lists");
      const data = await response.json();
      return data.lists;
    },
  });

  console.log(data);

  return { data, isLoading };
};
