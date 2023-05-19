import { Box, Text, Image, ScrollView, Toast } from "native-base";
import { useState, useEffect, useContext, useRef } from "react";
import { TouchableOpacity, PanResponder, Animated } from "react-native";
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

  const handleUpdate = async (dog, match) => {
    // adds dog to match list
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
 
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return (
    <Box flex={1} bgColor="cyan.50">
      <Box flexDirection="row" justifyContent="flex-end" w="95%">
        <TouchableOpacity onPress={() => navigation.navigate("Pup Pocket")}>
          <Image
            source={puppocketpic}
            size={7}
            mt={3}
            mb={3}
            alt="Pup Pocket Icon"
            // add indicator
          />
        </TouchableOpacity>
      </Box>
      <Box>
        {dogList && dogList[thisDog] && (
          <>
            <Box h={685}>
              <Box 
                borderColor={"blueGray.400"}
                borderWidth={3}
                ml={2}
                mr={2}
                pt={4}
                pb={6}
                bgColor="#f5deb3"
                borderRadius={20}
              >
                <Animated.View
                  style={{
                    transform: [{translateX: pan.x}, {translateY: pan.y}],
                  }}
                  {...panResponder.panHandlers}
                  alignItems="center"
                  justifyContent="center"
                  onTouchStart={(e) => (this.touchX = e.nativeEvent.pageX)}
                  onTouchEnd={(e) => {
                    const swipeX = Math.round(
                      this.touchX - e.nativeEvent.pageX
                    );
                    if (swipeX < -20) {
                      Toast.show({
                        title: "Dog added to PupPocket",
                        bg: "cyan.700",
                        w: 200,
                        h: 50,
                        p: 16,
                      });

                      handleUpdate(dogList[thisDog], true);
                    } // adds dog to puppocket

                    if (swipeX > 20) getNextDog(); // goes to next dog without adding to puppocket
                  }}
                >
                  <Image
                    // size={340}
                    w={360}
                    h={300}
                    borderRadius={15}
                    borderColor="blueGray.400"
                    borderWidth={1}
                    source={{
                      uri: dogList[thisDog].picture,
                    }}
                    alt="Dog profile pictures"

                    // add animation to swipe
                    // add wag/jiggle to image
                  />
                </Animated.View>

                <Box>
                  <Box flexDirection="row" justifyContent="center" mt={5}>
                    <Text
                      fontSize={35}
                      color="cyan.700"
                      fontWeight="900"
                      italic
                    >
                      {" "}
                      {dogList[thisDog]?.name}{" "}
                    </Text>
                  </Box>

                  <Box
                    flexDirection="row"
                    justifyContent="space-around"
                    w="100%"
                    pt={1}
                    pb={1}
                  >
                    <Text color="cyan.700" fontSize={15} bold>
                      {" "}
                      {dogList[thisDog]?.age}{" "}
                    </Text>
                    <Text color="cyan.700" fontSize={15} bold>
                      {" "}
                      {dogList[thisDog]?.sex}{" "}
                    </Text>
                    <Text color="cyan.700" fontSize={15} bold>
                      {" "}
                      {dogList[thisDog]?.breed}{" "}
                    </Text>
                  </Box>

                  <ScrollView
                    w="90%"
                    h={200}
                    ml={5}
                    mt={2}
                    bgColor="whitesmoke"
                    borderColor="blueGray.400"
                    // borderWidth={1}
                    borderRadius={15}
                  >
                    <Text
                      justifyContent="center"
                      w="100%"
                      p={5}
                      alignContent="space-around"
                      textAlign="center"
                      color="cyan.700"
                      fontSize={17}
                    >
                      {dogList[thisDog]?.about}
                    </Text>
                  </ScrollView>
                </Box>
              </Box>
            </Box>

            <Box justifyContent="flex-end">
              <Box flexDir="row" w="95%" justifyContent="space-between">
                <TouchableOpacity
                  onPress={() => handleUpdate(dogList[thisDog], false)}
                >
                  <Image
                    source={rejecticon}
                    size={12}
                    justifyContent="flex-start"
                    ml={5}
                    alt="X button"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleUpdate(dogList[thisDog], true)}
                >
                  <Image
                    source={pawprintheart}
                    size={9}
                    justifyContent="flex-end"
                    mt={1}
                    alt="heart button"
                  />
                </TouchableOpacity>
              </Box>
              {/* <Text>Matches: {matchList.length}</Text> */}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
