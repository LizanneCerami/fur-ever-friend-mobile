import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import  pawprintheart  from '../assets/pawprintheart.png';
import puppocketpic from '../assets/puppocketpic.png'
// 
export default function Home({ navigation }) {
  const [thisDog, setThisDog] = useState(0);
  const [dogList, setDogList] = useState();

  useEffect(() => {
    fetch("https://fur-ever-friend-api.web.app/dogList")
      .then((resp) => resp.json())
      .then(setDogList)
      .catch(alert);
  }, []);

  const getNextDog = () => {
    if(thisDog < dogList.length - 1) setThisDog(thisDog + 1)
    else setThisDog(0)
    
  }
    return (
      <>
      <View style={styles.container}>
        {dogList && dogList[0] && (
        
      <>
      <TouchableOpacity onPress={() => navigation.navigate('Pup Pocket') }>

          <Image
            source={ puppocketpic }
            style={{ width: 18, height: 18}}
          />
      </TouchableOpacity>

        <Text style={{ fontSize: 30, fontWeight: 700, paddingTop: 30, paddingBottom: 100 }}>Fur-Ever Friend</Text>

          <TouchableOpacity onPress={getNextDog}>
            <Image source={{uri: dogList[thisDog].picture}}
              style={{ width: 350, height: 300, borderRadius: 10, borderColor: "#696969", borderWidth: 1 }} 
              />
          </TouchableOpacity>
              
            <Text style={{ textAlign: "center", paddingTop:20 }}> {dogList[thisDog].name} </Text>
              
            <View style={{ flexDirection: "row", padding: 15, alignContent: "space-between"}}>
              <Text style={{ textAlign: "left", paddingRight: 20 }}> {dogList[thisDog].age} </Text>
              <Text style={{textAlign: "center"}}> {dogList[thisDog].sex} </Text>
              <Text style={{textAlign: "right", paddingLeft: 20}}> {dogList[thisDog].breed} </Text>
            </View>

            <Text style={{textAlign:"center"}}> {dogList[thisDog].about} </Text>
      </>
        )}

          <TouchableOpacity style= {{ paddingTop:135, paddingLeft:300 }}>
            <Image 
              source={ pawprintheart }
              style={{ width: 44, height: 44}}
            />
          </TouchableOpacity>

      </View>
    </>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#afeeee",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  