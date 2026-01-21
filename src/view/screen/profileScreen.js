import React from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import { useProfilevm } from '../../viewmodel/profilevm';
import LinearGradient from 'react-native-linear-gradient';
import Avatar from '../components/Avatar';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const { user, handleLogout } = useProfilevm(navigation);
  const projects = useSelector(state => state.projects.list);

  if (!user) return null;

  const avatarSize = Math.min(width, height) * 0.25;
  const streakCount = projects.reduce((total, project) => {
  if (!project.tasks) return total;

  project.tasks.forEach(task => {
    if (
      task.assignedTo === user.username &&
      Array.isArray(task.subtasks)
    ) {
      task.subtasks.forEach(subtask => {
        if (subtask.done === true) {
          total += 1;
        }
      });
    }
  });

  return total;
}, 0);


  const isLandscape = width > height;
  const cardWidth = isLandscape || width > 600 ? 500 : '90%';

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['#010f29ff', '#2c012eff', '#010f29ff']}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../assets/close.png')}
            style={styles.drawer}
          />
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 40,
          }}
          style={{ width: '100%' }}
        >
          <View
            style={[
              styles.card,
              {
                width: cardWidth,
                marginTop: isLandscape ? 40 : 80,
              },
            ]}
          >
            <View style={styles.cardContent}>
              <Text style={styles.title}>Profile</Text>

              <View style={styles.avatarRow}>
                <Avatar name={user.username} size={avatarSize} />

                <View style={styles.fireBox}>
                  <Image
                    source={require('../../assets/pinkfire.png')}
                    style={styles.fire}
                  />
                  <Text style={styles.fireText}>{streakCount}</Text>
                </View>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.label}>Username</Text>
                <Text style={styles.value}>{user.username}</Text>

                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{user.email}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20, // Handled by scrollview/card margins
  },

  back: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },

  drawer: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },

  card: {
    backgroundColor: '#ffffff67',
    borderRadius: 20,
    padding: 30,
    // flex: 0.5, // Removed flex to let content size drive height
    // marginTop: 80, // Handled dynamically
  },

  cardContent: {
    flex: 1,
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  fireBox: {
    marginLeft: 20,
    alignItems: 'center',
  },

  fire: {
    width: 45,
    height: 45,
  },

  fireText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: -10,
  },

  infoBox: {
    marginTop: 10,
  },

  label: {
    fontSize: 14,
    color: '#f6c7fa9c',
    marginTop: 12,
  },

  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  button: {
    marginTop: 30,
    backgroundColor: '#67026eff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#f8f8f8ff',
    fontSize: 16,
    fontWeight: '600',
  },

  bottomBar: {
    paddingVertical: 16,
  },

  item: {
    alignItems: 'center',
    marginHorizontal: -3,
    marginTop: 130,
    right: 5,
  },

  iconBox: {
    width: 55,
    height: 55,
    backgroundColor: '#9b59b6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },

  text: {
    color: '#fff',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
});
