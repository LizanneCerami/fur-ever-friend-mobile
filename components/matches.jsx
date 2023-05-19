import { Box, Text, Image, HStack } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { ImageBackground } from "react-native";
import { useContext, useState, useEffect } from "react";
import { MatchListContext } from "../App";
import dogbackground from "../assets/dogbackground.jpg";
import dogtag from "../assets/dogtag.png";

export default function Matches() {
  const { matchList, setMatchList } = useContext(MatchListContext);

  const [ matches, setMatches ] = useState();

  useEffect(() => {
    if(matchList && matchList.length > 0) {
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
            "{dog.item.name}""
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
    const response = await fetch(
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
  };

  return (
    <ImageBackground
      source={dogbackground}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "flex-start" }}
    >
      <Box>
        {matches && (
          <SwipeListView
            data={matches}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-60}
            onRowDidOpen={handleDelete}
          />
        )}
      </Box>
    </ImageBackground>
  );
}
