import { InMemoryCache } from '@apollo/client/cache'

export const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      projectType: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'ProjectType', id }),
      script: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'NpmScript', id }),
    },
  },

  typePolicies: {
    PackageMetadata: {
      fields: {
        latestVersion: {
          merge (existing = null, incoming) {
            if (incoming != null) {
              return incoming
            }
            return existing
          },
        },
      },
    },
  },
})
