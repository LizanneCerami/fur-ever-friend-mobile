import { Box, Image  } from "native-base";
import { TouchableOpacity, View } from "react-native";
import pawprintheart from '../assets/pawprintheart.png'
import rejecticon from '../assets/rejecticon.png'

export default function Footer () {

  return (

    <Footer>
    
      <Box justifyContent="flex-end">
          <Box flexDir="row" w="95%" justifyContent="space-between">
            <TouchableOpacity>
              <Image 
                source={ rejecticon }
                size={12}
                justifyContent="flex-start"
                ml={5}
                alt="X button"
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image 
                source={ pawprintheart }
                size={9}
                justifyContent="flex-end"
                mt={1}
                alt="heart button"
              />
            </TouchableOpacity>
          </Box>
        </Box>

    </Footer>
  )
}