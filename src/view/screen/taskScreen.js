import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleTask } from '../../redux/projectSlice';
import LinearGradient from 'react-native-linear-gradient';

const TaskScreen = ({ route, navigation }) => {
  const { projectId } = route.params;
  const dispatch = useDispatch();

  const project = useSelector(state =>
    state.projects.list.find(p => p.id === projectId)
  );

  const [taskTitle, setTaskTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  if (!project) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Project not found</Text>
      </View>
    );
  }


  const createTask = () => {
    if (!taskTitle.trim() || !assignedTo.trim()) return;

    dispatch(
      addTask({
        projectId,
        task: {
          id: Date.now().toString(),
          title: taskTitle,
          assignedTo,
          done: false,
          subtasks: [],
        },
      })
    );

    setTaskTitle('');
    setAssignedTo('');
  };

  const getTaskProgress = task => {
    if (!task.subtasks || task.subtasks.length === 0) return 0;
    const done = task.subtasks.filter(s => s.done).length;
    return Math.round((done / task.subtasks.length) * 100);
  };

  return (
    <LinearGradient
          style={{ flex: 1 }}
          colors={['#010f29ff', '#2c012eff', '#010f29ff', '#2c012eff']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
    <View style={styles.container}>
      <Text style={styles.title}>{project.name}</Text>

    
      <View style={styles.createBox}>
        <TextInput
          placeholder="Task title"
          placeholderTextColor="#cccccc6a"
          style={styles.input}
          value={taskTitle}
          onChangeText={setTaskTitle}
        />

        <TextInput
          placeholder="Assign to"
          placeholderTextColor="#cccccc6a"
          style={styles.input}
          value={assignedTo}
          onChangeText={setAssignedTo}
        />

        <TouchableOpacity style={styles.addBtn} onPress={createTask}>
          <Text style={{color:'#fff',paddingBottom:'2%'}}>＋ Add Task</Text>
        </TouchableOpacity>
      </View>


{project.tasks.map(task => (
  <TouchableOpacity
    key={task.id}
    style={styles.taskCard}
    onPress={() =>
      navigation.navigate('Task', {
        projectId,
        taskId: task.id,
      })
    }
  >
    <View style={styles.taskRow}>

      {/* Checkbox */}
      <TouchableOpacity
        style={[
          styles.checkbox,
          task.done && styles.checkedBox,
        ]}
        onPress={() =>
          dispatch(toggleTask({ projectId, taskId: task.id }))
        }
      >
        {task.done && <Text style={styles.check}>✓</Text>}
      </TouchableOpacity>

      {/* Task info */}
      <View style={{ flex: 1 }}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.memberText}>👤 {task.assignedTo}</Text>

        {/* Progress */}
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${getTaskProgress(task)}%` },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {getTaskProgress(task)}% completed
        </Text>
      </View>
    </View>
  </TouchableOpacity>
))}

    </View>
    </LinearGradient>
  );
};

export default TaskScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    paddingVertical:20,
    fontSize: 24,
    fontWeight: 'bold',
    color:'#fff',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color:'#fff',
    fontSize: 16,
  },
  taskCard: {
  backgroundColor: '#ffffff30',
  borderRadius: 10,
  padding: 12,
  marginBottom: 10,
},

taskRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

taskTitle: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

memberText: {
  color: '#ddd',
  fontSize: 12,
  marginBottom: 4,
},

progressBar: {
  height: 6,
  backgroundColor: '#ffffff55',
  borderRadius: 3,
  marginTop: 4,
},

progressFill: {
  height: 6,
  backgroundColor: '#4CAF50',
  borderRadius: 3,
},

progressText: {
  color: '#fff',
  fontSize: 10,
  marginTop: 2,
},
input:{
    color:'#fff',
},
checkbox: {
  width: 22,
  height: 22,
  borderWidth: 2,
  borderColor: '#fff',
  borderRadius: 4,
  marginRight: 12,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
},

checkedBox: {
  backgroundColor: '#4CAF50',
  borderColor: '#4CAF50',
},

check: {
  color: '#fff',
  fontSize: 14,
  fontWeight: 'bold',
},

});
