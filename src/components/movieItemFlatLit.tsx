import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";
import { MovieItem } from "../types/movieType";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/movieType";

type MovieItemNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MovieUI"
>;

const MovieItemFlatList: React.FC<{ item: MovieItem }> = ({ item }) => {
  const navigation = useNavigation<MovieItemNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MovieDetail", { movieId: item.imdbID })
        }
        style={styles.touchable}
      >
        <Text>{item.Year}</Text>
        <Image source={{ uri: item.Poster }} style={styles.img} />
        <Text>{item.Title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieItemFlatList;

const styles = StyleSheet.create({
  container: {
    width: 150,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 25,
  },
  touchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 150,
    height: 250,
  },
});
