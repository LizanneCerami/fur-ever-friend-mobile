import { Box, Text, Image, ScrollView, Toast } from "native-base";
import { useState, useEffect, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { MatchListContext } from "../App";
import puppocketpic from "../assets/puppocketpic.png";
import pawprintheart from "../assets/pawprintheart.png";
import rejecticon from "../assets/rejecticon.png";

export default function Home({ navigation }) {
  
  const [thisDog, setThisDog] = useState(0);
  const [dogList, setDogList] = useState(0);

  const { matchList, setMatchList } = useContext(MatchListContext);

  useEffect(() => {
    fetch("https://fur-ever-friend-api.web.app/dogList")
      .then((resp) => resp.json())
      .then(setDogList)
      .catch(alert);
  }, []);

  useEffect(() => {
    if (dogList) {
      const matches = dogList.filter((dog) => dog.match);
      setMatchList(matches);
    }
  }, [dogList]);

  const getNextDog = () => {
    if (thisDog < dogList.length - 1) setThisDog(thisDog + 1);
    else setThisDog(0);
  };

  const handleUpdate = async (dog, match) => { // adds dog to match list
    const dogObj = {
      match: match,
    };
    const response = await fetch(
      `https://fur-ever-friend-api.web.app/dogList/${dog.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dogObj),
      }
    );
    const data = await response.json();
    setDogList(data);
      getNextDog();
  };

  return (
    <Box bgColor="cyan.50">
      <Box flexDirection="row" justifyContent="flex-end" w="95%">
        <TouchableOpacity onPress={() => navigation.navigate("Pup Pocket")}>
          <Image
            source={puppocketpic}
            size={5}
            mt={3}
            mb={10}
            alt="Pup Pocket Icon"
          />
        </TouchableOpacity>
      </Box>
      <Box>
        {dogList && dogList[thisDog] && (
          <>
            <Box h={670}>
              <View
                alignItems="center"
                justifyContent="center"
                onTouchStart={(e) => (this.touchX = e.nativeEvent.pageX)}
                onTouchEnd={(e) => {
                  const swipeX = Math.round(this.touchX - e.nativeEvent.pageX);
                  if (swipeX < -20){
                    Toast.show({
                      title: "Dog added to PupPocket",
                      bg: "darkBlue.200",
                      w: 200,
                      h: 50,
                      p: 16

                    })

                    handleUpdate(dogList[thisDog], true)} // adds dog to puppocket
                  

                  if ( swipeX > 20) getNextDog(); // goes to next dog without adding to puppocket
                }}
              >
                <Image
                  size={325}
                  borderRadius={15}
                  borderColor="blueGray.400"
                  borderWidth={1}
                  source={{
                    uri: dogList[thisDog].picture,
                  }}
                  alt="Dog profile pictures"
                />
              </View>

              <Box>
                <Box flexDirection="row" justifyContent="center" mt={5}>
                  <Text fontSize={25} color="darkBlue.600" fontWeight="700">
                    {" "}
                    {dogList[thisDog]?.name}{" "}
                  </Text>
                </Box>

                <Box
                  flexDirection="row"
                  justifyContent="space-around"
                  w="100%"
                  pt={5}
                >
                  <Text color="darkBlue.600" fontSize={15} bold> {dogList[thisDog]?.age} </Text>
                  <Text color="darkBlue.600" fontSize={15} bold> {dogList[thisDog]?.sex} </Text>
                  <Text color="darkBlue.600" fontSize={15} bold> {dogList[thisDog]?.breed} </Text>
                </Box>

                <ScrollView
                  w="90%"
                  maxHeight={200}
                  ml={5}
                  mt={2}
                  bgColor="white"
                  borderColor="coolGray.300"
                  borderWidth={2}
                  borderRadius={15}

                >
                  <Text
                    justifyContent="center"
                    w="100%"
                    p={5}
                    alignContent="space-around"
                    textAlign="center"
                    color="darkBlue.600"
                    fontSize={15}
                  >
                    {dogList[thisDog]?.about}
                  </Text>
                </ScrollView>
              </Box>
            </Box>

            <Box justifyContent="flex-end">
              <Box flexDir="row" w="95%" justifyContent="space-between">
                <TouchableOpacity onPress={() => handleUpdate(dogList[thisDog],false)}>
                  <Image
                    source={rejecticon}
                    size={12}
                    justifyContent="flex-start"
                    ml={5}
                    alt="X button"
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleUpdate(dogList[thisDog],true)}>
                  <Image
                    source={pawprintheart}
                    size={9}
                    justifyContent="flex-end"
                    mt={1}
                    alt="heart button"
                  />
                </TouchableOpacity>
              </Box>
              <Text>Matches: {matchList.length}</Text>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
