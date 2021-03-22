// Apollo
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '@/apollo/mutation';
import withApollo from '@/hoc/withApollo';
// Component
import RegisterForm from '@/components/RegisterForm';
import Redirect from '@/components/Redirect';

const Register = ({ history }) => {
    const [signUp, { data, error }] = useMutation(SIGN_UP);

    const register = (registerData) => {
        signUp({
            variables: {
                ...registerData,
            },
            onCompleted: () => {
                history.push(`/`);
            },
        });
    };

    return (
        <>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Register</h1>
                        <RegisterForm onSubmit={register} />
                        {data && data.signUp && <Redirect to="/login" />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default withApollo(Register);
