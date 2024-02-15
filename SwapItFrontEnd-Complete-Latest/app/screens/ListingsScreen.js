import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import AuthContext from "../auth/context";
import DEFS from "../config/defaults"
import { categories } from "./ListingEditScreen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Icon from "../components/Icon";
import AppText from "../components/AppText";

import { Searchbar } from 'react-native-paper';
const initialMessages = [
  {
    id: 1,
  },
];

const ListingsScreen = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [feeds, setFeeds] = useState([])
  const [isPending, setIsPending] = useState(false);
  const [errMsg, setErrMsg] = useState('No feeds')
  const { token, local, setName } = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState(categories)
  const [allData, setAllData] = useState([])


  useEffect(() => {
    const focusHandler = props.navigation.addListener('focus', () => {
      fetchFeeds()
    });
    return focusHandler;
  }, [props.navigation]);

  const fetchAllFeeds = () => {
    fetch(DEFS.baseUrl + '/feeds', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((response) => {
        console.log("Feed Rsponse", response.success)
        if (response.success === true && response.data.length > 0) {
          console.log(response.message)
          setErrMsg("");
          setIsPending(false);
          setFeeds(response.data)
          setAllData(response.data)
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

  const onChangeSearch = query => {
    setSearchQuery(query)
    if (query.length > 1) {
      let filteredData = allData.filter(x => (String(x.title.toString().toLowerCase()).includes(query.toString().toLowerCase())));
      setFeeds(filteredData)
    } else {
      setFeeds(allData)
    }
  };

  const clearData = {
    backgroundColor: "#fc5c65",
    icon: "view-list",
    label: "All",
    value: 10,
  }

  const fetchFeeds = () => {
    console.log("props.route.params", props.route.params)
    setIsPending(true)
    if (!props.route.params) {
      fetchAllFeeds()
    } else {
      fetchFeedsById(props.route.params)
    }

    var catData = [];
    catData.push(clearData);

    categories.forEach(element => {
      catData.push(element);
    });

    setCategoryData(catData);

  }
  const fetchFeedsById = (id) => {
    console.log(DEFS.baseUrl)
    setIsPending(true)
    fetch(DEFS.baseUrl + '/feeds/' + id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((response) => {
        console.log("Feed Rsponse", response.success)
        if (response.success === true && response.data.length > 0) {
          console.log(response.message)
          setErrMsg("");
          setIsPending(false);
          setFeeds(response.data)
          setAllData(response.data)
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


  const handleFilter = (value) => {

    if (value == 10) {
      fetchFeeds()
    } else {
      setIsPending(true)
      var filterData = [];
      allData.forEach(element => {
        if (element.category.value == value) {
          filterData.push(element)
        }
      });
      setFeeds(filterData);
      setIsPending(false)
    }
  }

  useEffect(() => {
  }, []);

  useEffect(() => {

  }, [token]);

  return (
    <React.Fragment>
      <ActivityIndicator visible={isPending} />
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        elevation='3'
      />
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
        {!errMsg && (
          <View>
            <AppText style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Categories:</AppText>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={categoryData}
              horizontal={true}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item, index }) => {
                console.log(item.title)
                const lastItem = index === feeds.length - 1;
                return (
                  <View style={styles.container}>
                    <TouchableOpacity onPress={() => {
                      handleFilter(item.value)
                    }}>
                      <Icon
                        backgroundColor={item.backgroundColor}
                        name={item.icon}
                        size={55}
                        iconColor="white"
                      />
                      <AppText style={styles.text}>{item.label}</AppText>
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
            <AppText style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Products:</AppText>

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
                        item.images.length > 0 ? arrayBufferToBase64(item.images[0].data): null
                      }
                      thumbnail={DEFS.defaultImgUri}
                      title={item.title}
                      subTitle={item.description}
                      category={item.category}
                      isSold={item.isSold}
                      cardPressed={() =>
                        props.navigation.navigate("ListingDetails", item)
                      }
                    />
                  </View>
                )
              }}
            /></View>)}
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
    width: '100%',
    marginBottom: 5,
  },
  error: {
    fontSize: 18,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  container: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: "center",
  },
  text: {
    marginTop: 5,
    maxWidth: 60,
    textAlign: "center",
  },
});

export const arrayBufferToBase64 = (buffer) => {
/*   var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  const Buffer = require("buffer").Buffer */
  var base64Flag = 'data:image/jpeg;base64,';
  // var imageStr = new Buffer(buffer).toString("base64");

  return base64Flag + buffer;
};

export default ListingsScreen;
