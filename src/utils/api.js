import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
});

const getCharacters = async(page = Number) => {
    try {
        const { data } = await client.query({
            query: gql `
            query getCharactersByPage($page: Int) {
              characters(page: $page) {
                  info {
                      pages
                  }
                  results {
                      id, name, image, status, species, 
                      episode{
                        id, name
                      },location{
                        id, name
                      }                  }
              }
            }`,
            variables: { page },
        });
        return data
    } catch (error) {
        throw (error)
    }
}

const getCharacter = async(id = Number) => {
    try {
        const { data } = await client.query({
            query: gql `query{
                charactersByIds(ids:${id}){
                  id,
                  name,
                  status,
                  species,
                  type,
                  gender,
                  origin{
                    name,
                    dimension,
                    type
                  },
                  location{
                    name,
                    dimension,
                    type
                  },
                  image,
                  episode{
                    id,
                    name
                  },
                  created
                }
              }`,
            variables: {},
        });
        return data
    } catch (error) {
        throw (error)
    }
}


const getEpisode = async(episodeId) => {
    try {
        const { data } = await client.query({
            query: gql `query{
              episodesByIds(ids:${episodeId}){
                id,
                name,
                air_date,
                episode,
                characters{
                  name,
                  image
                },
                created
              }
            }`,
            variables: {},
        });
        return data
    } catch (error) {
        throw (error)
    }
}

export default { getCharacters, getCharacter, getEpisode };