import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { deleteProject, updateProject } from '../../redux/projectSlice';
import openGoogleCalendar from '../../service/Calendar';
import { Data } from '../../service/icon';
import Avatar from '../components/Avatar';
import { useProfilevm } from '../../viewmodel/profilevm';



const ProjectScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects.list);
  const { user } = useProfilevm(navigation);

  const [expandedId, setExpandedId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editMembers, setEditMembers] = useState([]);
  const [newMember, setNewMember] = useState('');

  const getProgress = project => {
    if (!project.tasks || project.tasks.length === 0) return 0;
    const done = project.tasks.filter(t => t.done).length;
    return Math.round((done / project.tasks.length) * 100);
  };

  const startEdit = project => {
    setEditId(project.id);
    setEditName(project.name);
    setEditMembers(project.team);
  };

  const saveEdit = id => {
    dispatch(updateProject({ id, name: editName, team: editMembers }));
    setEditId(null);
    setNewMember('');
  };

  const addMember = () => {
    if (!newMember.trim()) return;
    setEditMembers(prev => [...prev, newMember.trim()]);
    setNewMember('');
  };

  const removeMember = index => {
    setEditMembers(prev => prev.filter((_, i) => i !== index));
  };


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
    <LinearGradient style={{ flex: 1 }} colors={['#010f29', '#2c012e']}>
      <View style={styles.container}>
        <Text style={styles.title}>My Projects</Text>

        <FlatList
          data={projects}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => {
            const isEditing = editId === item.id;
            const isExpanded = expandedId === item.id;

            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  if (!isEditing) {
                    navigation.navigate('TaskScreen', { projectId: item.id });
                  }
                }}
              >
                <View style={styles.card}>
                  <View style={styles.headerRow}>
                    {isEditing ? (
                      <TextInput
                        style={styles.editInput}
                        value={editName}
                        onChangeText={setEditName}
                      />
                    ) : (
                      <Text style={styles.projectName}>{item.name}</Text>
                    )}

                    <View style={styles.iconRow}>
                      <TouchableOpacity onPress={() => startEdit(item)}>
                        <Image
                          source={require('../../assets/edit.png')}
                          style={styles.actionIcon}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => dispatch(deleteProject(item.id))}
                      >
                        <Image
                          source={require('../../assets/bin.png')}
                          style={styles.actionIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {!isEditing && (
                    <TouchableOpacity
                      onPress={() =>
                        setExpandedId(isExpanded ? null : item.id)
                      }
                    >
                      <Text style={styles.dropdown}>
                        {isExpanded ? 'Hide Members ▲' : 'View Members ▼'}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {isExpanded && !isEditing && (
                    <View style={styles.membersBox}>
                      {item.team.map((m, i) => (
                        <Text key={i} style={styles.member}>• {m}</Text>
                      ))}
                    </View>
                  )}

                  {isEditing && (
                    <>
                      {editMembers.map((m, i) => (
                        <View key={i} style={styles.memberRow}>
                          <Text style={styles.member}>• {m}</Text>
                          <TouchableOpacity onPress={() => removeMember(i)}>
                            <Text style={styles.remove}>✕</Text>
                          </TouchableOpacity>
                        </View>
                      ))}

                      <View style={styles.row}>
                        <TextInput
                          style={[styles.editInput, { flex: 1 }]}
                          placeholder="Add member"
                          placeholderTextColor="#ccc"
                          value={newMember}
                          onChangeText={setNewMember}
                        />
                        <TouchableOpacity onPress={addMember}>
                          <Text style={styles.add}>＋</Text>
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity
                        style={styles.saveBtn}
                        onPress={() => saveEdit(item.id)}
                      >
                        <Text style={styles.saveText}>Save</Text>
                      </TouchableOpacity>
                    </>
                  )}

                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${getProgress(item)}%` },
                      ]}
                    />
                  </View>

                  <Text style={styles.progressText}>
                    {getProgress(item)}% completed
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
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
};

export default ProjectScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#ffffff41',
  },
  projectName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionIcon: {
    width: 22,
    height: 22,
  },
  dropdown: {
    color: '#ef9df5',
    marginTop: 8,
    fontWeight: '600',
  },
  membersBox: {
    marginTop: 10,
    paddingLeft: 10,
  },
  member: {
    color: '#fff',
    marginTop: 2,
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  remove: {
    color: '#E53935',
    fontSize: 16,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    padding: 6,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  add: {
    fontSize: 26,
    color: '#4CAF50',
    marginLeft: 10,
  },
  saveBtn: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ffffff55',
    borderRadius: 4,
    marginTop: 8,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },


  bottomBar: {
    paddingVertical: 12,
    bottom: 30, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  bottomItem: {
    alignItems: 'center',
    // marginHorizontal: 22,
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
