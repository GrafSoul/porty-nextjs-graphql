// Apollo
import { useQuery } from '@apollo/client';
import { GET_USER } from '@/apollo/queries';

const useGetUser = () => useQuery(GET_USER);
export default useGetUser;
