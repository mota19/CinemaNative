import { useGetMovieQuery } from "../services/movie";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import MovieItemFlatList from "./movieItemFlatLit";
import { useState, useEffect } from "react";

const MovieUI: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [debouncedTitle, setDebouncedTitle] = useState<string>(title);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(title);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [title]);

  const { data, error, isLoading } = useGetMovieQuery({
    title: debouncedTitle,
    page,
  });

  useEffect(() => {
    if (data?.Search === undefined || data?.Search?.length < 10) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [data]);

  const handleChange = (title: string) => {
    setTitle(title);
    setPage(1);
    setHasMore(true);
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToNextPage = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  return (
    <View style={styles.Container}>
      <TextInput
        style={styles.TextInput}
        placeholder="Name of movie"
        onChangeText={(text) => handleChange(text)}
      />

      {isLoading && <Text style={styles.StatusText}>Loading...</Text>}
      {error && <Text style={styles.StatusText}>Error loading data</Text>}

      <FlatList
        data={data?.Search}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => <MovieItemFlatList item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.FlatListContainer}
      />
      <View style={styles.ButtonContainer}>
        <Button
          title="Previous Page"
          onPress={goToPreviousPage}
          disabled={page === 1}
        />
        <Text style={styles.PageNumber}>{page}</Text>
        <Button title="Next Page" onPress={goToNextPage} disabled={!hasMore} />
      </View>
    </View>
  );
};

export default MovieUI;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  TextInput: {
    width: "80%",
    height: 30,
    borderColor: "gray",
    borderWidth: 2,
    borderStyle: "solid",
    paddingHorizontal: 10,
    marginTop: 15,
  },
  FlatListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 15,
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 25,
    alignItems: "center",
  },
  PageNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  StatusText: {
    fontSize: 16,
    color: "red",
  },
});
