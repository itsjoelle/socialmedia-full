import './Login.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import google from '../../assets/google.jpeg';
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { schema } from '../../firebase/schema';
import { FormValues } from '../../interfaces_types/types';
import { signInGoogle, signUpEmail } from '../../firebase/auth';

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const signUpWithEmail = async (data: FormValues) => {
    const result = await signUpEmail(data);
    if (result.status === 'ok') {
      reset();
      navigate('/');
    } else {
      throw new Error(result.status);
    }
  };

  const signInWithGoogle = async () => {
    const result = await signInGoogle();
    if (result.status === 'ok') {
      navigate('/');
    } else {
      throw new Error(result.status);
    }
  };

  return (
    <div className="login-page">
      <div className="left-container">
        <div className="login">
          <div className="login-container">
            <div className="login-title">Login</div>
            <div className="login-user-pass">
              <input className="input-login" placeholder="Email" />
              <input
                className="input-login"
                placeholder="Password"
                type="password"
              />
            </div>
            <button className="button-signIn">LOGIN</button>
          </div>
          <div className="login-divider"></div>
          <div className="login-container">
            <div className="login-title">Create new account</div>
            <>
              <form onSubmit={handleSubmit(signUpWithEmail)}>
                <div className="login-user-pass">
                  <input
                    className="input-login"
                    placeholder="Name"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="login-error-message">{errors.name.message}</p>
                  )}
                  <input
                    className="input-login"
                    placeholder="Email"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="login-error-message">
                      {errors.email.message}
                    </p>
                  )}{' '}
                  <input
                    className="input-login"
                    placeholder="Password"
                    type="password"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="login-error-message">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <button type="submit" className="button-signIn">
                  SIGN UP
                </button>
              </form>
            </>
            <button onClick={signInWithGoogle} className="button-google">
              <img src={google} alt="google" />
              Sign In With Google
            </button>
          </div>
        </div>
      </div>
      <div className="right-container">
        <div className="logo">
          <div>s</div>
          <div className="vertikal"></div>
          <div>socialfandom</div>
        </div>
        <div className="getconnected-container">
          <div className="getconnected">
            Get connected and sign up today <span></span>
          </div>
          <div className="getconnected-icon">
            <HiOutlineChatBubbleLeftEllipsis fontSize={82} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
