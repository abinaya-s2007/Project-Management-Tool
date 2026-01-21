import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import openGoogleCalendar from '../../service/Calendar';
import { Data } from '../../service/icon';
import Avatar from '../components/Avatar';
import { useProfilevm } from '../../viewmodel/profilevm';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { addSubtask, toggleSubtask } from '../../redux/projectSlice';

export default function Task({ route, navigation }) {
  const dispatch = useDispatch();
  const { user } = useProfilevm(navigation);

  const { projectId, taskId } = route?.params || {};


  if (!projectId || !taskId) {
    const projects = useSelector(state => state.projects.list);

    const allTasks = projects.flatMap(p =>
      p.tasks.map(t => ({ ...t, projectId: p.id })),
    );

    const renderBottomItem = ({ item }) => {
      const onPress = () => {
        if (item.name === 'Calendar') {
          openGoogleCalendar();
        } else if (item.name === 'Profile') {
          navigation.navigate('ProfileScreen');
        } else if (item.Screen) {
          navigation.navigate(item.Screen);
        }
      };

      return (
        <TouchableOpacity onPress={onPress} style={styles.bottomItem}>
          <View style={styles.bottomIconBox}>
            {item.name === 'Profile' ? (
              <Avatar name={user?.username} size={40} />
            ) : (
              <Image source={item.icon} style={styles.bottomIcon} />
            )}
          </View>
          <Text style={styles.bottomText}>{item.name}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#010f29ff', '#2c012eff', '#010f29ff']}
      >
        <View style={styles.container}>
          <Text style={styles.header}>📋 Tasks</Text>

          <FlatList
            data={allTasks}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.check}>{item.done ? '✅' : '⬜'}</Text>
                <Text style={styles.cardText}>{item.title || 'Task'}</Text>
              </View>
            )}
          />
        </View>

        <View style={styles.bottomBar}>
          {Data.map(item => (
            <React.Fragment key={item.id}>
              {renderBottomItem({ item })}
            </React.Fragment>
          ))}
        </View>
      </LinearGradient>
    );
  }

  const task = useSelector(state =>
    state.projects.list
      .find(p => p.id === projectId)
      ?.tasks.find(t => t.id === taskId),
  );

  const [inputText, setInputText] = useState('');
  const [active, setActive] = useState(false);

  if (!task) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#fff' }}>Task not found</Text>
      </View>
    );
  }

  const addCard = () => {
    if (!inputText.trim()) return;

    dispatch(
      addSubtask({
        projectId,
        taskId,
        subtask: {
          id: Date.now().toString(),
          text: inputText,
          done: false,
        },
      }),
    );

    setInputText('');
    setActive(false);
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['#010f29ff', '#2c012eff', '#010f29ff']}
    >
      <View style={styles.container}>
        <Text style={styles.header}>👤 {task.assignedTo}'s Tasks</Text>

        <FlatList
          data={task.subtasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                dispatch(
                  toggleSubtask({
                    projectId,
                    taskId,
                    subtaskId: item.id,
                  }),
                )
              }
            >
              <Text style={styles.check}>{item.done ? '✅' : '⬜'}</Text>
              <Text
                style={[
                  styles.cardText,
                  item.done && styles.doneText,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            active ? (
              <>
                <TextInput
                  placeholder="Enter card..."
                  placeholderTextColor="#aaa"
                  style={styles.input}
                  value={inputText}
                  onChangeText={setInputText}
                />
                <TouchableOpacity style={styles.addBtn} onPress={addCard}>
                  <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => setActive(true)}>
                <Text style={styles.addCard}>＋ Add a card</Text>
              </TouchableOpacity>
            )
          }
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  check: {
    fontSize: 16,
    marginRight: 8,
  },
  cardText: {
    color: '#fff',
    flex: 1,
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  addCard: {
    color: '#ffd700',
    marginTop: 20,
    marginLeft: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 8,
    marginHorizontal: 20,
    marginTop: 10,
  },
  addBtn: {
    backgroundColor: '#67026eff',
    borderRadius: 6,
    padding: 8,
    marginTop: 6,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  addText: {
    fontWeight: 'bold',
    color: 'white',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    paddingVertical: 12,
    bottom: 30, // Keeping original offset
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  bottomItem: {
    alignItems: 'center',
  },
  bottomIconBox: {
    width: 55,
    height: 55,
    backgroundColor: '#9b59b6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  bottomText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
  },
});
