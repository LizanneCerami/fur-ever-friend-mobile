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
            <Box flexDirection="row" justifyContent="left"  ml={3}>
              <Image
                h={150}
                w={150}
                borderRadius="100"
                source={{
                uri: dog.picture
                  }}
                alt="Dog profile pictures"
              />
            <Box>
              <Text ml={5} mt={7} fontSize={20} bold>
                {dog.name}
              </Text>
              <Text ml={5} mt={5}>
              {dog.contact}
              </Text>
            </Box>

          </Box>

          </Box> 
        ))
        : <Text>No Matches</Text>
      }

    </Box>
    </ScrollView>
  )
}
