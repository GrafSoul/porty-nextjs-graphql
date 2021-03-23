// Apollo
import { useLazyQuery } from '@apollo/client';
import { GET_USER } from '@/apollo/queries';

export const useLazyGetUser = () => useLazyQuery(GET_USER);
