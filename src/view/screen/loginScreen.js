import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useAuthViewModel } from '../../viewmodel/Loginvm';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const AuthView = () => {
  const navigation = useNavigation();
  const {
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
  } = useAuthViewModel(navigation);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const cardWidth = isLandscape || width > 600 ? 500 : '90%';

  return (
    // <View style={{flex:1}}>
    <LinearGradient
      style={{ flex: 1 }}
      colors={['#010f29ff', '#2c012eff', '#010f29ff', '#2c012eff']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      {/* <TaskBar style={{flex:1}} title='Project Management'/> */}
      {/* <TaskBar style={{flex:1}} title='Project Management'/> */}
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 20,
          }}
          style={{ width: '100%' }}
        >
          <View
            style={{
              backgroundColor: '#fffefe3f',
              borderRadius: 10,
              width: cardWidth,
              padding: 20,
              paddingVertical: 40,
              alignItems: 'center',
            }}
          >
            <Text style={styles.title}>{isRegister ? 'Register' : 'Login'}</Text>

            {isRegister && (
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
            )}

           <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text.toLowerCase())}
          />


            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={submit}>
              <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}>
                {isRegister ? 'Register' : 'Login'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsRegister(!isRegister);
                setUsername('');
              }}
            >
              <Text style={styles.switchText}>
                {isRegister
                  ? <Text>Already have an account? Login</Text>
                  : <Text>New user? Register</Text>}
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
        {
          toastMsg && (
            <View
              style={[
                styles.toast,
                { borderLeftColor: toastType === 'error' ? '#E53935' : '#4CAF50' },
              ]}
            >
              <Text style={styles.toastText}>{toastMsg}</Text>
            </View>
          )
        }
      </View >
    </LinearGradient >
    // </View>
  );
};

export default AuthView;

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'#383838ff',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    color: '#fff',
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 15,
    width: '70%',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#67026eff',
    padding: 15,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 100,
  },
  toastText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
