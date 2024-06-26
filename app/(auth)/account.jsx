import { router } from 'expo-router'
import { Alert, SafeAreaView, Text, View } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';
import SignUpInput from '../../components/SignUpInput';
import DismissKeyboard from '../../components/DismissKeyboard';
import validator from 'validator';
import BackButton from '../../components/buttons/BackButton';
import { useSignUpContext } from '../../context/SignUpProvider';
import { useState } from 'react';
import TrabitHeader from '../../components/TrabitHeader';
import { getCurrentUser, handleNewUserRegistration } from '../../firebase/auth';
import { useGlobalContext } from '../../context/GlobalProvider';

const Account = () => {
  const { 
    firstName,
    lastName,
    birthday, 
    email, 
    username, setUsername, 
    password, setPassword,
    resetSignUp
  } = useSignUpContext()
  const { setUser, setIsLogged } = useGlobalContext();  

  const [verifyPassword, setVerifyPassword] = useState("")
  const [passwordStrengthError, setPasswordStrengthError] = useState(false)
  
  const handleSubmit = async () => {
    let uid = ""

    if (username === "" || password.includes(" ")) {
      Alert.alert("Invalid username. Empty spaces are not allowed")
      return
    }

    if (password === verifyPassword) {
      try {
        uid = await handleNewUserRegistration({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName, 
          birthday: birthday,
          username: username,
        })

        if (uid) {
          const currentUser = await getCurrentUser()
          setUser(currentUser)
          setIsLogged(true)
          resetSignUp()
          router.push("/avatar")
        }
      } catch (e) {
        Alert.alert("Error registering. Please make sure your password is strong enough, you have a valid username without any spaces, and email is not already being used", e.message)
      }
    } else {
      Alert.alert("Passwords do not match")
    }
  }

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
              <Text className="font-inter-bold text-lg">Let’s create an account.</Text>
              <Text className="font-inter-regular text-xs">Use it for future log ins!</Text>
            </View>

            <SignUpInput 
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              containerStyles="mt-12"
              handleChangeText={(e) => setUsername(e)}
              placeholder="Username"
              value={username}
            />

            <SignUpInput
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              containerStyles="mt-20"
              error={passwordStrengthError}
              errorMessage="Please enter a strong password. Must be 8 characters long, include one uppercase letter, one symbol, and one number."
              handleChangeText={(e) => {
                setPassword(e)
                setPasswordStrengthError(!validator.isStrongPassword(e))
              }}
              password={true}
              placeholder="Password"
              value={password}
            />

            <SignUpInput
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              containerStyles="mt-4"
              error={password !== verifyPassword}
              errorMessage="Passwords do not match"
              handleChangeText={(e) => setVerifyPassword(e)}
              password={true}
              placeholder="Verify Password"
            />

            <CustomButton
              containerStyles="mt-16"
              handlePress={() => handleSubmit()}
              title="Next"
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

export default Account
