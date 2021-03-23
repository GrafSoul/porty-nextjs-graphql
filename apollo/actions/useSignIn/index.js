// Apollo
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '@/apollo/mutation';

export const useSignIn = () => useMutation(SIGN_IN);
