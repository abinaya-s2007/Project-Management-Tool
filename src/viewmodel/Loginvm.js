import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../redux/Slice';

const validateEmail = email => {
  const gmailRegex = /^[a-z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(email);
};

const validatePassword = password => {
  return password.length >= 8;
};

export const useAuthViewModel = (navigation) => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector(state => state.auth.loggedInUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [toastType, setToastType] = useState('success');

  const showToastMessage = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(null), 3000);
  };


  useEffect(() => {
    if (loggedInUser) {
      navigation.replace('Dash', {
        username: loggedInUser.username,
      });
    }
  }, [loggedInUser, navigation]);

const submit = () => {
  if (!email || !password || (isRegister && !username)) {
    showToastMessage('Please fill all fields', 'error');
    return;
  }

  // ✅ EMAIL VALIDATION
  if (!validateEmail(email)) {
    showToastMessage(
      'Email must be lowercase and end with @gmail.com',
      'error'
    );
    return;
  }

  // ✅ PASSWORD VALIDATION
  if (!validatePassword(password)) {
    showToastMessage(
      'Password must be at least 8 characters long',
      'error'
    );
    return;
  }

  const userPayload = {
    email,
    password,
    username,
  };

  if (isRegister) {
    dispatch(registerUser(userPayload));
    showToastMessage(`Registered Successfully: ${username}`, 'success');
    setIsRegister(false);
    setUsername('');
  } else {
    dispatch(loginUser({ email, password }));
  }
};


  return {
    email,
    password,
    username,
    setEmail,
    setPassword,
    setUsername,
    isRegister,
    setIsRegister,
    submit,
    toastMsg,
    toastType,
  };
};
