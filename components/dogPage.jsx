import { Box, Text, Image } from "native-base"
import { useState, useEffect } from "react"
import { TouchableOpacity, View } from "react-native";
import puppocketpic from '../assets/puppocketpic.png';


export default function Home({ navigation }) {
  const [ thisDog, setThisDog ] = useState(0);
  const [ dogList, setDogList ] = useState(0);

  useEffect(() => {
    fetch("https://fur-ever-friend-api.web.app/dogList")
      .then((resp) => resp.json())
      .then(setDogList)
      .catch(alert);
  }, []);

  const getNextDog = (swipeX) => {
    if(swipeX < 20) {
      const saveDog = dogList[thisDog]
      alert("Saving " + saveDog.name)
      // put in pup pocket
    }
    if(thisDog < dogList.length - 1) setThisDog(thisDog + 1)
    else setThisDog(0)
  }
    return (
    <>
          <Box flexDirection="row" justifyContent="flex-end" w="95%">

          <TouchableOpacity onPress={() => navigation.navigate('Pup Pocket')}>
            <Image
              source={ puppocketpic }
              size={5}
              mt={3}
              mb={10}

              alt="Pup Pocket Icon"

            />
          </TouchableOpacity>
          </Box>
      { dogList && dogList[thisDog] && (
          <View
            alignItems="center"
            justifyContent="center"
            onTouchStart={e => this.touchX = e.nativeEvent.pageX}
            onTouchEnd={e => {
              const swipeX = Math.round(this.touchX - e.nativeEvent.pageX)
              if(swipeX > 20 || swipeX < - 20) getNextDog(swipeX)
              }
            }
          >
            <Image 
              size={325}
              borderRadius={15}
              borderColor="blueGray.400"
              borderWidth={1}
              source={{
                uri: dogList[thisDog].picture
              }}
                alt="Dog profiles pictures"
            />
          </View>

          )}
          <Box flexDirection="row" justifyContent="space-around" w="100%"  pt={5}>
            <Text > {dogList[thisDog]?.age} </Text>
            <Text > {dogList[thisDog]?.sex} </Text>
            <Text > {dogList[thisDog]?.breed} </Text>
          </Box>

          <Box flexDirection="row" justifyContent="space-around" w="90%" ml={5} mt={5} bgColor="amber.700">
            <Text justifyContent="center" w="100%" p={5} alignContent="space-around" textAlign="center"> {dogList[thisDog]?.about} </Text>
          </Box>

    </>
    )
}