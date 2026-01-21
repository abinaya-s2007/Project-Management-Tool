import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Avatar from '../components/Avatar';
import { useNavigation } from '@react-navigation/native';
import { useProfilevm } from '../../viewmodel/profilevm';
import { Data } from '../../service/icon';

import { useSelector } from 'react-redux';
import openGoogleCalendar from '../../service/Calendar';
import Svg, { Circle } from 'react-native-svg';

const CircleProgress = ({ percentage, size = 260, strokeWidth = 20 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (circumference * percentage) / 100;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#ffffff30"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#4CAF50"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <View style={{ position: 'absolute' }}>
        <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>
          {percentage}%
        </Text>
        <Text style={{ color: '#ccc', fontSize: 14, textAlign: 'center' }}>
          Overall Progress
        </Text>
      </View>
    </View>
  );
};

export default function Dash() {
  const projects = useSelector(state => state.projects.list);

const totalTasks = projects.reduce(
  (sum, p) => sum + (p.tasks?.length || 0),
  0
);

const completedTasks = projects.reduce(
  (sum, p) =>
    sum + (p.tasks?.filter(t => t.done).length || 0),
  0
);

const overallProgress =
  totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const { user } = useProfilevm();
  const avatarSize = Math.min(width, height) * 0.09;

  const username = useSelector(state => state.auth.loggedInUser?.username);

  const ITEM_COUNT = Data.length;
  const ITEM_WIDTH = width / ITEM_COUNT;


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, { width: ITEM_WIDTH }]}
      onPress={() => {
        if (item.name === 'Calendar') {
          openGoogleCalendar();
        } else if (item.name === 'Profile') {
          navigation.navigate('ProfileScreen');
        } else {
          navigation.navigate(item.Screen);
        }
      }}
    >
      <View style={styles.iconBox}>
        <View>
          {item.icon ? (
            <Image source={item.icon} style={styles.Icon} />
          ) : (
            <Avatar name={user.username} size={avatarSize} />
          )}
        </View>
      </View>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
    
  );

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['#010f29ff', '#2c012eff', '#010f29ff']}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Boards</Text>
        <Text style={styles.workspace}>HI {username ? username : 'User'}</Text>


        <View style={[styles.bigCard, { height: height * 0.55 }]}>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',paddingTop:'15%' }}>
    <CircleProgress percentage={overallProgress} />
  </View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20,paddingBottom:'40%' }}>
  <Text style={{ color: '#fff',fontWeight:'bold',fontSize:16 }}>Projects: {projects.length}</Text>
  <Text style={{ color: '#fff',fontWeight:'bold',fontSize:16 }}>Tasks: {totalTasks}</Text>
  <Text style={{ color: '#fff' ,fontWeight:'bold',fontSize:16}}>Done: {completedTasks}</Text>
</View>

 {/* <View style={styles.card}>
  <Text style={{ color: '#fff',fontWeight:'bold' }}>Projects: {projects.length}</Text>
  </View>
  <View style={styles.card}>
  <Text style={{ color: '#fff' ,fontWeight:'bold'}}>Tasks: {totalTasks}</Text>
  </View>
  <View style={styles.card}>
  <Text style={{ color: '#fff',fontWeight:'bold' }}>Done: {completedTasks}</Text>
</View> */}

  <TouchableOpacity
    style={styles.Btn}
    onPress={() => navigation.navigate('CreateProjectScreen')}
  >
    <Text style={styles.createText}>+ Create board</Text>
  </TouchableOpacity>
</View>


        <View style={styles.bottomBar}>
          <FlatList
            data={Data}
            horizontal
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    fontSize: 24,
    top: 5,
    fontWeight: 'bold',
    color: '#fff',
  },

  workspace: {
    color: '#bbb',
    marginTop: 30,
    marginBottom: 30,
  },

  bigCard: {
    backgroundColor: '#9e9f9f7e',
    borderRadius: 16,
    flex: 1,
  },

  bottomBar: {
    paddingVertical: 16,
  },

  item: {
    alignItems: 'center',
    marginHorizontal: -3,
  },

  iconBox: {
    width: 55,
    height: 55,
    backgroundColor: '#9b59b6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  Btn: {
    position: 'absolute',
    right: 20,
    bottom: 70,
    backgroundColor: '#a78bfa',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
  },
});
