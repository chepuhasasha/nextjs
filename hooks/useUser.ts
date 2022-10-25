import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import axios from "axios";

const fetcher = async (url) =>
  await axios
    .get(url)
    .then((res) => {
      return { data: res.data, error: null };
    })
    .catch((error) => {
      return { data: null, error: error.message };
    });

export function useUser(redirectTo: string) {
  const { data, error } = useSWR("/api/user", fetcher);
  const user = data?.data;
  
  useEffect(() => {
    if (user === null) {
      Router.push(redirectTo);
    }
  }, [user]);

  return {
    user,
    error,
  }
}
