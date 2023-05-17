import { Box, Text, Image, ScrollView } from "native-base"
import { useContext } from "react"
import { MatchListContext } from "../App";

export default function Matches() {

  const { matchList } = useContext(MatchListContext);

  return (
    <ScrollView>
    <Box>
      {matchList ?
        matchList.map(dog => (
         
        
          <Box mt={20}>
            <Box flexDirection="row" justifyContent="left" mt={5} mb={5}>
              <Image
                h={150}
                w={150}
                source={{
                uri: dog.picture
                  }}
                alt="Dog profile pictures"
              />
            <Text ml={5} fontSize={20}>
              {dog.name}

            </Text>
          </Box>

          </Box> 
        ))
        : <Text>No Matches</Text>
      }

    </Box>
    </ScrollView>
  )
}
