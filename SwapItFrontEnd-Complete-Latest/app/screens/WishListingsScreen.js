import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";

import useApi from "../hooks/useApi";
import AuthContext from "../auth/context";
import DEFS from "../config/defaults"
import { arrayBufferToBase64 } from "./ListingsScreen";

const initialMessages = [
  {
    id: 1,
  },
];

const WishListingsScreen = (props) => {

  const [refresh, setRefresh] = useState(false);
  const [feeds, setFeeds] = useState([])
  const [isPending, setIsPending] = useState(false);
  const [errMsg, setErrMsg] = useState('No feeds')
  const { token, local, setName } = useContext(AuthContext);



  const fetchWishList = (id) => {
    setIsPending(true)
    fetch(DEFS.baseUrl + '/wishlist/' + id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((response) => {
        console.log("wishList Rsponse", response.message)
        if (response.success === true && response.data.length > 0) {
          console.log(response.message)
          setErrMsg("");
          setIsPending(false);
          setFeeds(response.data)
        } else {
          setIsPending(false);
          setErrMsg(response.message);
        }
      }).catch((error) => {
        console.error(error)
        setIsPending(false);
        setErrMsg(error.message);
      })
  }

  const fetchFeeds = () => {
    fetchWishList(props.route.params);
  }

  useEffect(() => {
    fetchFeeds();
  }, []);

  useEffect(() => {

  }, [token]);

  return (
    <React.Fragment>
      <ActivityIndicator visible={isPending} />
      <Screen style={styles.screen}>
        {errMsg && (
          <>
            <FlatList
              data={initialMessages}
              keyExtractor={(data) => data.id.toString()}
              renderItem={() => {
                return (
                  <>
                    <Text style={styles.error}>
                      We Couldn't Retrive the Listing
                    </Text>
                    <Text style={styles.error}>Please Pull to refresh</Text>
                  </>
                );
              }}
              refreshing={refresh}
              onRefresh={() => {
                fetchFeeds()
              }}
              style={{ height: "100%" }}
            />
          </>
        )}
        <FlatList
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          data={feeds}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refresh}
          onRefresh={() => {
            fetchFeeds()
          }}
          renderItem={({ item, index }) => {
            console.log(item.title)
            const lastItem = index === feeds.length - 1;
            return (
              <View style={{ flex: 1, maxWidth: lastItem ? '50%' : '100%', margin: 5 }}>
                <Card
                  image={
                    arrayBufferToBase64(item.images[0].data)
                  }
                  thumbnail={DEFS.defaultImgUri}
                  title={item.title}
                  subTitle={item.description}
                  category={item.category}
                  isSold = {item.isSold}
                  cardPressed={() =>
                    props.navigation.navigate("ListingDetails", item)
                  }
                />
              </View>
            )
          }}
        />
      </Screen>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.light,
  },
  flatList: {
    paddingTop: 10,
    width: '100%'
  },
  error: {
    fontSize: 18,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});

export default WishListingsScreen;
