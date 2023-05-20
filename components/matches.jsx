import { Box, Text, Image, HStack } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { ImageBackground, Pressable } from "react-native";
import { useContext, useState, useEffect } from "react";
import { MatchListContext } from "../App";
import dogbackground from "../assets/dogbackground.jpg";
import dogtag from "../assets/dogtag.png";

export default function Matches() {
  const { matchList, setMatchList } = useContext(MatchListContext);

  const [ matches, setMatches ] = useState();

  useEffect(() => {
    if(matchList) {
      const _matches = matchList.map(dog => ({
        ...dog, key: dog.id
      }))
      setMatches(_matches)
    }
  }, [matchList])

  const renderItem = (dog, index) => (
    <Box mt={8} key={index}>
      <Box flexDirection="row" justifyContent="left" ml={4}>
        <Image
          h={150}
          w={150}
          borderRadius="100"
          borderColor="yellow.500"
          bg="darkBlue.600"
          borderWidth={5}
          source={{
            uri: dog.item.picture,
          }}
          alt="Dog profile pictures"
        />
        <ImageBackground
          source={dogtag}
          style={{ flex: 1, justifyContent: "center", width: 244, height: 144 }}
        >
          <Text
            textAlign="center"
            fontSize={30}
            italic
            color="darkBlue.600"
            bold
          >
            {dog.item.name}
          </Text>
          <Text textAlign="center" fontSize={20} color="darkBlue.600">
            {dog.item.contact}
          </Text>
        </ImageBackground>
      </Box>
    </Box>
  );

  const renderHiddenItem = () => (
    <HStack flex="1" pl="2">
    </HStack>
  );

  const handleDelete = async (dogId) => {
    const dogObj = {
      match: false,
    };
    console.log("SWIPE DETECTED")
    const response = await fetch(
     // `http://192.168.1.68:5002/dogList/${dogId}`,
      `https://fur-ever-friend-api.web.app/dogList/${dogId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dogObj),
      }
    );
    const data = await response.json();
    const _matches = data.filter((dog) => dog.match);
    setMatchList(_matches);
    console.log("SWIPE FINISHED")
  };

  return (
    <ImageBackground
      source={dogbackground}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "flex-start" }}
    >
      <Box>
        {matches && (

/*
          // testing if click was faster
          matches.map(dog => {
          return (  
          <Pressable  onPress={(e) => handleDelete(dg)}>
          <Image
         
          h={150}
          w={150}
          borderRadius="100"
          borderColor="yellow.500"
          bg="darkBlue.600"
          borderWidth={5}
          source={{
            uri: dog.picture,
          }}
          alt="Dog profile pictures"
        />
        </Pressable>
          )
          })
*/           
          
        
          <SwipeListView
          onClick={handleDelete}
            data={matches}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-20}
            onRowDidOpen={handleDelete}
          />
        )}
      </Box>
    </ImageBackground>
  );
}
