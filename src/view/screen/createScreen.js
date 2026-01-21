import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useCreateScreenVm } from '../../viewmodel/createScreenvm';
import LinearGradient from 'react-native-linear-gradient';

const CreateProjectScreen = () => {

  const {
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
  } = useCreateScreenVm();

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['#010f29ff', '#2c012eff', '#010f29ff', '#2c012eff']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Text style={styles.title}>Create Project</Text>

      <TextInput
        style={styles.input}
        placeholder="Project Name"
        value={projectname}
        onChangeText={setprojectname}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Team Member Name"
          value={membername}
          onChangeText={setmembername}
        />

        <TouchableOpacity style={styles.addButton} onPress={addmember}>
          <Text style={{ color: '#fff', fontSize: 26 }}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={members}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[styles.input, { padding: 1, justifyContent: 'center' }]}
          >
            <Text
              style={{ fontSize: 16, color: '#fff', top: '20%', left: '3%' }}
            >
              {item}
            </Text>
            <TouchableOpacity onPress={() => removemember(index)}>
              <Text
                style={{
                  color: '#E53935',
                  fontSize: 18,
                  marginLeft: '92%',
                  bottom: 20,
                  bottom: '50%',
                }}
              >
                ✕
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.createButton} onPress={createproject}>
        <Text style={styles.createText}>Create Project</Text>
      </TouchableOpacity>

      {toastMsg && (
        <View
          style={[
            styles.toast,
            { borderLeftColor: toastType === 'error' ? '#E53935' : '#4CAF50' },
          ]}
        >
          <Text style={styles.toastText}>{toastMsg}</Text>
        </View>
      )}

    </LinearGradient>
  );
};

export default CreateProjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    padding: 20,
    paddingTop: 60,
  },
  input: {
    borderColor: '#fff',
    color: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#a04da577',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberItem: {
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  createButton: {
    justifyContent: 'center',
    backgroundColor: '#67026eff',
    padding: 15,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
    bottom: '15%',
    left: '20%',
  },
  createText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toast: {
    position: 'absolute',
    top: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 8,
    alignSelf: 'center',
    width: '80%',
    borderLeftWidth: 8,
    borderLeftColor: '#4CAF50',
  },
  toastText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
