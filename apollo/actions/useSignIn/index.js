// Apollo
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '@/apollo/mutation';
import { GET_USER } from '@/apollo/queries';

export const useSignIn = () =>
    useMutation(SIGN_IN, {
        update(cache, { data: { signIn: signedInUser } }) {
            cache.writeQuery({
                query: GET_USER,
                data: { user: signedInUser },
            });
        },
    });
