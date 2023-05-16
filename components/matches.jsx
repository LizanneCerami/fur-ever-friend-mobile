import { Box, Text, Image } from "native-base"
import { useContext, useState, useEffect } from "react"
import { MatchListContext } from "../App";

export default function Matches() {

  useEffect(() => {
    fetch("https://fur-ever-friend-api.web.app/dogList")
      .then((resp) => resp.json())
      .then(setDogList)
      .catch(alert);
  }, []);

  const [thisDog, setThisDog] = useState(0);
  const [dogList, setDogList] = useState(0);

  const { matchList } = useContext(MatchListContext);

  return (
    <Box>
      {matchList ?
        matchList.map(dog => (
          
          <Box>
            <Image
              size={20}
              source={{
              uri: dogList[thisDog].picture
                }}
              alt="Dog profile pictures"
            />
          <Text>
            {dog.name}

          </Text>

          </Box> 
        ))
        : <Text>No Matches</Text>
      }

    </Box>
  )
}
