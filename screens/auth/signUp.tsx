import React, { useState, useRef, useContext } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { 
  StyleSheet, 
  View, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  Appearance,
  Animated 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import appwriteService from '../../utils/appwrite';
import { useAuth } from '../../store/loginContextProvider';
const theme = {
  light: {
    primary: '#007AFF',
    background: '#FFFFFF',
    surface: '#F2F2F2',
    text: '#333333',
    textSecondary: '#666666',
    border: '#E0E0E0',
    error: '#FF3B30',
    inputBackground: '#F2F2F2',
  },
  dark: {
    primary: '#0A84FF',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    border: '#38383A',
    error: '#FF453A',
    inputBackground: '#1C1C1E',
  },
};

type RootStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  Home: undefined
};


const isDarkMode = Appearance.getColorScheme() === 'dark';
const colors = theme[isDarkMode ? 'dark' : 'light'];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

type Props = {
  navigation: NavigationProp;
};

const SignInForm = ({navigation}:any) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);
  const {toggleLogin} = useAuth()

  

  // Animated values for username label
  const usernameLabelPositionY = useRef(new Animated.Value(0)).current;
  const usernameLabelPositionX = useRef(new Animated.Value(0)).current;
  const usernameLabelScale = useRef(new Animated.Value(1)).current;

  // Animated values for email label
  const emailLabelPositionY = useRef(new Animated.Value(0)).current;
  const emailLabelPositionX = useRef(new Animated.Value(0)).current;
  const emailLabelScale = useRef(new Animated.Value(1)).current;

  // Animated values for password label
  const passwordLabelPositionY = useRef(new Animated.Value(0)).current;
  const passwordLabelPositionX = useRef(new Animated.Value(0)).current;
  const passwordLabelScale = useRef(new Animated.Value(1)).current;

  // Animation config
  const animationConfig = {
    duration: 200,
    useNativeDriver: true,
  };


  // Handlers for username input focus and blur
  const handleUsernameFocus = () => {
    Animated.parallel([
      Animated.timing(usernameLabelPositionY, {
        toValue: -35,
        ...animationConfig,
      }),
      Animated.timing(usernameLabelPositionX, {
        toValue: -10,
        ...animationConfig,
      }),
      Animated.timing(usernameLabelScale, {
        toValue: 0.8,
        ...animationConfig,
      }),
    ]).start();
  };

  const handleUsernameBlur = () => {
    if (username === '') {
      Animated.parallel([
        Animated.timing(usernameLabelPositionY, {
          toValue: 0,
          ...animationConfig,
        }),
        Animated.timing(usernameLabelPositionX, {
          toValue: 0,
          ...animationConfig,
        }),
        Animated.timing(usernameLabelScale, {
          toValue: 1,
          ...animationConfig,
        }),
      ]).start();
    }
  };

  // Handlers for email input focus and blur
  const handleEmailFocus = () => {
    Animated.parallel([
      Animated.timing(emailLabelPositionY, {
        toValue: -35,
        ...animationConfig,
      }),
      Animated.timing(emailLabelPositionX, {
        toValue: -10,
        ...animationConfig,
      }),
      Animated.timing(emailLabelScale, {
        toValue: 0.8,
        ...animationConfig,
      }),
    ]).start();
  };

  const handleEmailBlur = () => {
    if (email === '') {
      Animated.parallel([
        Animated.timing(emailLabelPositionY, {
          toValue: 0,
          ...animationConfig,
        }),
        Animated.timing(emailLabelPositionX, {
          toValue: 0,
          ...animationConfig,
        }),
        Animated.timing(emailLabelScale, {
          toValue: 1,
          ...animationConfig,
        }),
      ]).start();
    }
  };

  // Handlers for password input focus and blur
  const handlePasswordFocus = () => {
    Animated.parallel([
      Animated.timing(passwordLabelPositionY, {
        toValue: -35,
        ...animationConfig,
      }),
      Animated.timing(passwordLabelPositionX, {
        toValue: -10,
        ...animationConfig,
      }),
      Animated.timing(passwordLabelScale, {
        toValue: 0.8,
        ...animationConfig,
      }),
    ]).start();
  };

  const handlePasswordBlur = () => {
    if (password === '') {
      Animated.parallel([
        Animated.timing(passwordLabelPositionY, {
          toValue: 0,
          ...animationConfig,
        }),
        Animated.timing(passwordLabelPositionX, {
          toValue: 0,
          ...animationConfig,
        }),
        Animated.timing(passwordLabelScale, {
          toValue: 1,
          ...animationConfig,
        }),
      ]).start();
    }
  };

  const handleVisibility = () => {
    setVisible(!visible);
  };

  const signUp = async () => {
    try{
    const newUser = await appwriteService.createUserAccount({email:email,password:password,name:username})
    const user = await appwriteService.addUserData({userId:newUser.$id,totalCount:0,reasons:[]})
    console.log(user)
    if(newUser){
      toggleLogin()
    }
  }catch(error){
      console.log(error)
    }
  }

  return (
    <View style={styles.signInContainer}>
      <Text style={styles.header}>Sign Up</Text>

            {/* Username Input with Animated Label */}
            <View style={styles.inputView}>
        <Animated.Text
          style={[
            styles.label,
            {
              transform: [
                { translateY: usernameLabelPositionY },
                { translateX: usernameLabelPositionX },
                { scale: usernameLabelScale },
              ],
            },
          ]}
        >
          Username
        </Animated.Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
          onFocus={handleUsernameFocus}
          onBlur={handleUsernameBlur}
        />
      </View>

      {/* Email Input with Animated Label */}
      <View style={styles.inputView}>
        <Animated.Text
          style={[
            styles.label,
            {
              transform: [
                { translateY: emailLabelPositionY },
                { translateX: emailLabelPositionX },
                { scale: emailLabelScale },
              ],
            },
          ]}
        >
          Email
        </Animated.Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
        />
      </View>

      {/* Password Input with Animated Label */}
      <View style={styles.inputView}>
        <Animated.Text
          style={[
            styles.label,
            {
              transform: [
                { translateY: passwordLabelPositionY },
                { translateX: passwordLabelPositionX },
                { scale: passwordLabelScale },
              ],
            },
          ]}
        >
          Password
        </Animated.Text>
        <TextInput
          style={styles.input}
          secureTextEntry={visible}
          value={password}
          onChangeText={setPassword}
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
        />
        <TouchableOpacity onPress={handleVisibility}>
          <Icon
            name={visible ? 'eye-outline' : 'eye-off-outline'}
            size={28}
            style={{ marginRight: 10 }}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
        <Text style={styles.forgotPassword}>forgot password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
     
      <Text style={{ marginTop: 16, color: colors.text }}>
      Already have an account?{' '}
      <Text 
        style={{ color: colors.primary, textDecorationLine: 'underline' }} 
        onPress={() => navigation.push('signIn')}
      >
        Sign in
      </Text>
    </Text>
        

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.text}>or</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => appwriteService.logout()}>
          <Icon
            name="logo-google"
            size={32}
            color={colors.textSecondary}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('facebook auth clicked')}>
          <Icon
            name="logo-facebook"
            size={32}
            color={colors.textSecondary}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('github auth clicked')}>
          <Icon
            name="logo-github"
            size={32}
            color={colors.textSecondary}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    paddingHorizontal: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: colors.text,
  },
  inputView: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    color: colors.text,
    height: 50,
    alignItems: 'center',
    paddingLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  label: {
    position: 'absolute',
    left: 10,
    top: 13,
    color: '#aaa',
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    height: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'gray',
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 20,
  },
  socialIcon: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 50,
  },
  forgotPassword: {
    color: colors.primary,
    marginVertical: 5,
  },
});

export default SignInForm;