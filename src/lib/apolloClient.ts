/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMemo } from "react";
import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import merge from "deepmerge";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/client";
import { Photo } from "../graphql-operations";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

const httpLink = createHttpLink({
  // Server URL (must be absolute )
  // uri: "https://api.gibbs-photography.com"
  uri: "http://localhost:4000/api"
});

const authLink = setContext(async (_, { headers }) => {
  if (typeof window !== "undefined") {
    const session = await getSession();
    if (session && typeof session !== "undefined") {
      const token = session.accessToken;
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ""
        }
      };
    }
  }
  return undefined;
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPhotos: {
              merge(existing, incoming) {
                console.log(`MERGE`);
                const photos = existing
                  ? [...existing.photos, ...incoming.photos]
                  : [...incoming.photos];
                // console.log(`incoming: ${JSON.stringify(incoming, null, 2)}`);

                console.log(photos);
                // incoming.photos.forEach(photo => {
                //   photos[readField("id", photo)] = photo;
                // });
                return {
                  startCursor: incoming.startCursor,
                  endCursor: incoming.endCursor,
                  total: incoming.total,
                  photos: photos
                };
              },

              read(existing) {
                if (!existing) {
                  return;
                }
                return {
                  startCursor: existing.startCursor,
                  endCursor: existing.endCursor,
                  total: existing.total,
                  photos: Object.values(existing.photos)
                };
              }
            },
            allPhotosOfSubject: {
              keyArgs: ["subject"],
              merge(existing, incoming) {
                const photos = existing
                  ? { ...existing.photos, ...incoming.photos }
                  : { ...incoming.photos };

                return {
                  // subjectInfo: incoming.startInfo,
                  startCursor: incoming.startCursor,
                  endCursor: incoming.endCursor,
                  total: incoming.total,
                  photos: photos
                };
              },
              read(existing) {
                if (!existing) {
                  return;
                }
                return {
                  subjectInfo: existing.subjectInfo,
                  startCursor: existing.startCursor,
                  endCursor: existing.endCursor,
                  total: existing.total,
                  photos: Object.values(existing.photos)
                };
              }
            }
          }
        }
      }
    })
  });
}

export function initializeApollo(initialState = null): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addApolloState(client: any, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApollo(pageProps: any): ApolloClient<NormalizedCacheObject> {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
