import { router } from 'expo-router'
import { Alert, SafeAreaView, Text, View } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';
import SignUpInput from '../../components/SignUpInput';
import DismissKeyboard from '../../components/DismissKeyboard';
import BackButton from '../../components/buttons/BackButton';
import { useSignUpContext } from '../../context/SignUpProvider';
import TrabitHeader from '../../components/TrabitHeader';

const NameSignUp = () => {
  const { firstName, setFirstName, lastName, setLastName } = useSignUpContext();

  return (
    <DismissKeyboard>
      <SafeAreaView>
        <View className="h-full">
          <TrabitHeader 
            color="orange"
          />

          <BackButton 
            containerStyles="absolute pl-4 h-10 justify-center"
            handlePress={() => router.back()}
          />

          <View className="flex items-center justify-center h-full">
            <View className="h-20 flex items-center">
              <Text className="font-inter-bold text-lg">What's your name?</Text>
              <Text className="font-inter-regular text-xs">First and Last Please!</Text>
            </View>

            <SignUpInput 
              containerStyles="mt-12"
              handleChangeText={(e) => setFirstName(e)}
              placeholder="First Name"
              value={firstName}
            />

            <SignUpInput 
              containerStyles="mt-12"
              handleChangeText={(e) => setLastName(e)}
              placeholder="Last Name"
              value={lastName}
            />

            <CustomButton
              handlePress={() => {
                if (firstName !== "" && lastName !== "") {
                  router.navigate("/birthday")
                } else {
                  Alert.alert("Please enter a name")
                }
              }}
              title="Next"
              containerStyles="mt-32"
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

export default NameSignUp
