import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/movieType";
import { useGetDescriptionOfMovieQuery } from "../services/movie";

type MovieDetailScreenRouteProp = RouteProp<RootStackParamList, "MovieDetail">;

const MovieDetailScreen: React.FC = () => {
  const route = useRoute<MovieDetailScreenRouteProp>();
  const { movieId } = route.params;

  const { data, error, isLoading } = useGetDescriptionOfMovieQuery({
    movieID: movieId,
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.Text}>Title: {data?.Title}</Text>
      <Text style={styles.Text}>Imdb Rating: {data?.imdbRating}</Text>
      <Text style={styles.Text}>Actors: {data?.Actors}</Text>
      <Text style={styles.Text}>Plot: {data?.Plot}</Text>
      <Text style={styles.Text}>Country: {data?.Country}</Text>
      <Text style={styles.Text}>Language: {data?.Language}</Text>
      <Text style={styles.Text}>Genre: {data?.Genre}</Text>
      <Text style={styles.Text}>Director: {data?.Director}</Text>
      <Text style={styles.Text}>Type: {data?.Type}</Text>
      <Text style={styles.Text}>Released: {data?.Released}</Text>
    </ScrollView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  Text: {
    marginTop: 10,
  },
});
