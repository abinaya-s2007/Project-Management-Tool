import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../redux/projectSlice';

export const useCreateScreenVm = () => {
  const dispatch = useDispatch();
  const [projectname, setprojectname] = useState('');
  const [membername, setmembername] = useState('');
  const [members, setmembers] = useState([]);

  const [toastMsg, setToastMsg] = useState(null);
  const [toastType, setToastType] = useState('success');

  const showToastMessage = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const addmember = () => {
    if (!membername.trim()) return;
    setmembers(prev => [...prev, membername.trim()]);
    setmembername('');
  };

  const removemember = index => {
    setmembers(prev => prev.filter((_, i) => i !== index));
  };

  const createproject = () => {
    if (!projectname.trim()) {
      showToastMessage('Enter project name', 'error');
      return;
    }

    if (members.length === 0) {
      showToastMessage('Add at least one team member', 'error');
      return;
    }

    const project = {
      id: Date.now().toString(),
      name: projectname,
      team: members,
    };

    dispatch(addProject(project));

    setprojectname('');
    setmembers([]);

    showToastMessage('Project Created Successfully', 'success');
  };


  return {
    projectname,
    setprojectname,
    membername,
    setmembername,
    members,
    addmember,
    removemember,
    createproject,
    toastMsg,
    toastType,
  };
};

