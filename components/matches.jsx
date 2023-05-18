import { Box, Text, Image, ScrollView } from "native-base";
import { ImageBackground } from "react-native";
import { useContext } from "react";
import { MatchListContext } from "../App";
import dogbackground from "../assets/dogbackground.jpg";
import dogtag from '../assets/dogtag.png'

export default function Matches() {
  const { matchList } = useContext(MatchListContext);

  return (
    <ImageBackground
      source={dogbackground}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <ScrollView>
        <Box>
          {matchList ? (
            matchList.map((dog) => (
              <Box mt={8}>
                <Box flexDirection="row" justifyContent="left" ml={4}>
                  <Image
                    h={150}
                    w={150}
                    borderRadius="100"
                    borderColor="yellow.500"
                    borderWidth={5}
                    source={{
                      uri: dog.picture,
                    }}
                    alt="Dog profile pictures"
                  />
                  <ImageBackground
                    source={dogtag}
                    style={{ flex:1, justifyContent:"center", width: 244, height: 144 }} >
                    <Text 
                      textAlign="center" 
                      fontSize={30}
                      italic
                      color="darkBlue.600"
                      bold
                    >
                      {dog.name}
                    </Text>
                    <Text 
                      textAlign="center"
                      fontSize={20} 
                      color="darkBlue.600"
                    >
                      {dog.contact}
                    </Text>
                  </ImageBackground>
                </Box>
              </Box>
            ))
          ) : (
            <Text>No Matches</Text>
          )}
        </Box>
      </ScrollView>
    </ImageBackground>
  );
}
