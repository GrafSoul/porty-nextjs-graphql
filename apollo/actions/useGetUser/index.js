// Apollo
import { useQuery } from '@apollo/client';
import { GET_USER } from '@/apollo/queries';

export const useGetUser = () => useQuery(GET_USER);
