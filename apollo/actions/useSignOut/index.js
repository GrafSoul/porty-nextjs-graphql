// Apollo
import { useMutation } from '@apollo/client';
import { SIGN_OUT } from '@/apollo/mutation';

export const useSignOut = () => useMutation(SIGN_OUT);
