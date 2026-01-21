import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/Slice';
import Toast from 'react-native-toast-message';
export const useProfilevm = navigation => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.loggedInUser);
  const projects = useSelector(state => state.projects.list);

const streak = projects
  .flatMap(project => project.tasks || [])
  .filter(
    task =>
      task.done === true &&
      task.assignedTo === user.username
  ).length;

  const handleLogout = () => {
    

    Toast.show({
      type: 'success',
      text1: 'Logout successful',
      visibilityTime: 3000, // 3 seconds
      position: 'top',
    });

    dispatch(logout());

      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthView' }],
      });
      
  };
  return {
    user,
    handleLogout,
  };
};
