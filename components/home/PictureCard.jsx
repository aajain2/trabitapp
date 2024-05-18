import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomButton from '../buttons/CustomButton'
import CustomLink from '../CustomLink'

const PictureCard = ({
  prompt,
  image,
  completed
}) => {
  return (
    <View>
      <View className="w-full h-[60vh] flex justify-center">
        <Image
          blurRadius={completed ? 0 : 75}
          className="w-full h-[60vh] rounded-xl absolute"
          resizeMode="cover"
          source={{
            uri: image
          }}
        />

        {!completed &&
          <View className="items-center">
            <Text className="text-base font-inter-bold text-white mb-4">
              Complete your habit today.
            </Text>

            <CustomButton
              containerStyles="bg-transparent border-white border w-64 h-16 px-4 mb-4"
              textStyles="text-white font-inter-regular text-center"
              title={prompt}
            />

            <Text className="text-center text-sm font-inter-regular text-white w-56 mb-4">
              To view your friends’ completed habit, you must post yours first.
            </Text>

            <CustomButton
              containerStyles="w-36 h-8 border-transparent bg-dark-blue"
              textStyles="text-xs text-white font-inter-regular"
              title="Complete Habit."
            />
          </View>
        }
      </View>

      <View className="mt-2 h-5">
        {completed && 
          <CustomLink
            handlePress={() => console.log("Add comment")}
            containerStyles=""
            title="Add comment..."
            textStyles="text-light-gray font-inter-medium"
          />
        }
        
      </View>
    </View>
  )
}

export default PictureCard