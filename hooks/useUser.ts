import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) =>
  axios(url)
    .then((r) => r.data)
    .then((data) => {
      return { user: data?.user || null };
    });

export function useUser({
  redirectTo,
  redirectIfFound,
}: { redirectTo?: string; redirectIfFound?: string } = {}) {
  const { data, error } = useSWR("/api/user", fetcher);
  const user = data;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      (redirectTo && !redirectIfFound && !hasUser) ||
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return error ? null : user;
}
