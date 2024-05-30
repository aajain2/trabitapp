import { View, Text } from 'react-native'
import React from 'react'
import { Video, ResizeMode } from 'expo-av'
import videos from '../../constants/videos'
import { SafeAreaView } from 'react-native-safe-area-context'

import HomeHeaderBar from './HomeHeaderBar'
import Countdown from './Countdown'
import Streak from './Streak'
import HabitPrompt from './HabitPrompt'
import { useGlobalContext } from '../../context/GlobalProvider'

const HomeLanding = ({
  prompt
}) => {
  const { user } = useGlobalContext()

  return (
    <View className={`w-full ${user.completed ? "h-[30vh]" : "h-[100vh]"}`}>
      <View className={`absolute z-10 w-full ${user.completed ? "h-[30vh]" : "h-[100vh]"}`}>
        <SafeAreaView>
          <View className="h-full flex justify-center">
            <View className="absolute w-full top-0">
              <HomeHeaderBar 
                profilePicture={user.avatar}
              />
            </View>

            <View className={`flex-row mt-2 absolute top-14`}>
              <Countdown
                smaller={user.completed}
                completed={user.completed}
                containerStyles="ml-4"
              />
              <Streak
                smaller={user.completed}
                containerStyles="flex-grow mr-4"
                days={user.streak}
              />
            </View>

            {user.completed ? 
              <View className="absolute bottom-0 w-full items-center">
                <Text className="text-white font-inter-bold text-lg">
                  You completed your habit today.
                </Text> 
              </View> : 
              <HabitPrompt 
                prompt={prompt}
              />
            }
          </View>
        </SafeAreaView>
      </View>

      <Video
        className="w-full h-full"
        source={user.completed ? videos.greenBackground : videos.blueOrangeBackground}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted
        shouldPlay
      />
    </View>
  )
}

export default HomeLanding