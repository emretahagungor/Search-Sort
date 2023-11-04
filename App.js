import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import musicData from "./data/musicData.json";

export default function App() {
  
  const [list, setList] = useState(musicData)
  const [isSorted, setIsSorted] = useState(false)
 

  const handleSearch = text => {
    const filteredList = musicData.filter(song => {
      const searchedText = text.toLowerCase();
      const currentList = (song.album.toLowerCase())

      return currentList.indexOf(searchedText) > -1
    })
    setList(filteredList)
  }

  const sortListStr = () => {
    let sortedList = [...list];
    sortedList.sort((a, b) => {
      if (a.album < b.album) {
        return isSorted ? 1 : -1;
      }
      if (a.album > b.album) {
        return isSorted ? -1 : 1;
      }
      return 0;
    });
    setList(sortedList);
    setIsSorted(!isSorted);
  };

  const sortListNum = ()=> {
    let sortedList = [...list];
    sortedList.sort((a, b) => {
      if (isSorted) {
        return a.year - b.year;
      } else {
        return b.year - a.year;
      }
    });
    setList(sortedList);
    setIsSorted(!isSorted);
  }
  
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: item.imageUrl }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.albumText}>{item.album}</Text>
          <View style={styles.infoContainer}>
            <Text>{item.title} {item.artist}</Text>
            <Text style={styles.yearText}>{item.year}</Text>
          </View>
        </View>
        <View style={styles.soldOutContainer}>
          {item.isSoldOut ? (
            <Text style={styles.soldOutText}>Tükendi</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View >
        <TextInput
          style={styles.input}
          onChangeText={handleSearch}
          placeholder="Search to MusicApp!"
        />
        <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:5}}>
        <TouchableOpacity onPress={sortListStr} style={{ }}>
          
          <Text style={{fontWeight:'bold'}} >SIRALA A-Z</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sortListNum} style={{ }}>
          
          <Text style={{fontWeight:'bold'}} >SIRALA YIL</Text>
        </TouchableOpacity>
        </View>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 3,
    padding: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
  },
  albumText: {
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  yearText: {
    marginLeft: 8,
    color: "gray",
  },
  soldOutContainer: {
    alignItems: "flex-end",
  },
  soldOutText: {
    color: "red",
    borderRadius: 12,
    fontWeight: "bold",
    padding: 5,
    borderWidth: 1,
  },
});
