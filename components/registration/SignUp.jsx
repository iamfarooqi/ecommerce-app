import { View, Text, TextInput, Pressable } from 'react-native';
import tailwind from 'twrnc';

export default function SignUpScreen({ navigation }) {
  return (
    <View style={tailwind`flex-1 items-center justify-center bg-slate-50`}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
        <Text
          style={tailwind`text-5xl font-bold mb-6 text-center text-slate-900`}
        >
          Sign Up
        </Text>

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter email address"
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4`}
          placeholderTextColor="#000"
          placeholder="Enter password"
        />

        <View style={tailwind`flex flex-row justify-between items-center my-8`}>
          <View style={tailwind`flex-row items-center`}>
            <Pressable
              style={tailwind`bg-white border border-slate-200 h-6 w-6 rounded-sm mr-2 flex items-center justify-center`}
            >
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

        <Pressable
          onPress={() => navigation.navigate('sign-in')}
          style={tailwind`h-12 bg-purple-500 rounded-md flex flex-row justify-center items-center px-6`}
        >
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
