import { useDispatch } from 'react-redux';
import { Navigate, Link, useSearchParams } from 'react-router-dom';
import RecoveryForm from '../../components/RecoveryForm/RecoveryForm';
import { resetPassword } from '../../redux/user/operations';
import { useState } from 'react';

export default function PasswordResetPage () {
  const { token } = useSearchParams();
  const [isPassword, setIsPassword] = useState(undefined);

  const dispatch = useDispatch();

  function handleSubmit(password) {
    dispatch(resetPassword({ token, password }));
    setIsPassword(password);
  }

  return (
    <>
          <div className="wrapper">
            <div className="formCont">
              <h2 className="title">Recover Password</h2>
          <RecoveryForm submitFunc={handleSubmit} token={token} />
              <div className="link-container">
                <Link className="link" to="/signin">
                  Sign In
                </Link>
                <Link className="link" to="/signup">
                  Sign Up
                </Link>
              </div>
            </div>
            {/* <picture className="bottle">
              <source
                srcSet={`${bottleImage_desk_1x} 1x, ${bottleImage_desk_2x} 2x`}
                media="(min-width: 1440px)"
                type="image/png"
              />
              <source
                srcSet={`${bottleImage_tab_1x} 1x, ${bottleImage_tab_2x} 2x`}
                media="(min-width: 768px)"
                type="image/png"
              />
              <source
                srcSet={`${bottleImage_mob_1x} 1x, ${bottleImage_mob_2x} 2x`}
                media="(min-width: 320px)"
                type="image/png"
              />
              <img
                className="bottle"
                alt="bottle of water"
                src={bottleImage_mob_1x}
              />
            </picture> */}
          </div>
      {isPassword && <Navigate to="/signin" />}
    </>
  );
};

