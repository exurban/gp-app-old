import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";
import merge from "deepmerge";
// import { getSession } from "next-auth/client";

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

function createApolloClient() {
  // const session = await getSession();
  // console.log(`SESSION: Access Token: ${JSON.stringify(session.accessToken, null, 2)}`);

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      // Server URL (must be absolute)
      uri: "https://gp-api-server.herokuapp.com/api",
      credentials: "include"
      // Additional fetch() options like `credentials` or `headers`

      // headers: {
      //   authorization: "Bearer " //+ session.accessToken
      //   // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYwNTM4OTQ2NX0.2Jri2VkuIt4ktDsBc_z4bc9PqK2c5pjSu3RzYgPpkco"
      // }
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination()
          }
        }
      }
    })
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState as any, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
