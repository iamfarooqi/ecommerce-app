import {View, Text, TextInput, Pressable} from 'react-native';
import tailwind from 'twrnc';
import {useState} from 'react';

export default function SignUpScreen({navigation}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // const onRegisterPress = () => {
  //   if (password !== confirmPassword) {
  //     alert("Passwords don't match.");
  //     return;
  //   }
  //   firebaseConfig
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(response => {
  //       const uid = response.user.uid;
  //       const data = {
  //         id: uid,
  //         email,
  //         fullName,
  //       };
  //       const usersRef = firebase.firestore().collection('users');
  //       usersRef
  //         .doc(uid)
  //         .set(data)
  //         .then(() => {
  //           navigation.navigate('Home', {user: data});
  //         })
  //         .catch(error => {
  //           alert(error);
  //         });
  //     })
  //     .catch(error => {
  //       alert(error);
  //     });
  // };
  return (
    <View style={tailwind`flex-1 items-center justify-center bg-slate-50`}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
        <Text
          style={tailwind`text-5xl font-bold mb-6 text-center text-slate-900`}>
          Sign Up
        </Text>

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter your name"
          onChangeText={text => setFullName(text)}
          value={fullName}
          autoCapitalize="none"
        />
        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter your email address"
          onChangeText={text => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4`}
          placeholderTextColor="#000"
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4`}
          placeholderTextColor="#000"
          placeholder="Confirm password"
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          autoCapitalize="none"
        />

        <View style={tailwind`flex flex-row justify-between items-center my-8`}>
          <View style={tailwind`flex-row items-center`}>
            <Pressable
              style={tailwind`bg-white border border-slate-200 h-6 w-6 rounded-sm mr-2 flex items-center justify-center`}>
              {/* selected state */}
              <View style={tailwind`bg-green-400 w-4 h-4 rounded-sm`} />
            </Pressable>
            <Text style={tailwind`text-slate-900`}>Remember me</Text>
          </View>
          <Pressable>
            <Text style={tailwind`text-blue-400 font-bold`}>
              Reset password
            </Text>
          </Pressable>
        </View>

        {/* onPress={() => navigation.navigate('sign-in')} */}
        <Pressable
          onPress={() => onRegisterPress()}
          style={tailwind`h-12 bg-purple-500 rounded-md flex flex-row justify-center items-center px-6`}>
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-white text-base font-medium`}>
              Sign Up
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
