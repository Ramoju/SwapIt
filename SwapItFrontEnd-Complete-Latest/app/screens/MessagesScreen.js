import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import authStorage from "../auth/authStorage";
import DEFS from "../config/defaults";
import { Searchbar } from 'react-native-paper';
import { InputAutoSuggest } from 'react-native-autocomplete-search';

const MessagesScreen = (props) => {

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    setSearchQuery(query)
    if (query.length > 1) {
      let filteredData = messages.filter(x => (String(x.feedTitle.toString().toLowerCase()).includes(query.toString().toLowerCase()) || String((localUser.uid == x.ownerID ? x.senderName : x.ownerName).toString().toLowerCase()).includes(query.toString().toLowerCase())));
      setFilterData(filteredData)
    } else {
      setFilterData(messages)
    }
  };

  const [messages, setMessages] = useState([]);
  const [filterData, setFilterData] = useState([])
  const [refresh, setRefresh] = useState(false);
  const [localUser, setLocalUser] = useState({
    uid: '',
    name: '',
    email: ''
  });
  const [isUserLoaded, setIsUserLoaded] = useState(false);



  const loadUser = async () => {
    const local = await authStorage.getLocalId();
    setLocalUser(JSON.parse(local))

    setIsUserLoaded(true)

    loadMessage(localUser.uid)

  }

  const loadMessage = (roomId) => {
    console.log('roomId', roomId)
    setRefresh(true)

    fetch(DEFS.baseUrl + '/chatlist/' + roomId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((response) => {
        console.log("Feed Rsponse", response.success)
        setRefresh(false)
        if (response.success === true) {
          setMessages(response.data);
          setFilterData(response.data)
        } else {
        }
      }).catch((error) => {
        setRefresh(false)
        //Alert.alert(error.message);
        console.error(error)
      })
  }

  let noPadding = false;
  if (Platform.OS === "android") {
    noPadding = true;
  }

  { !isUserLoaded && loadUser() }

  return (
    <Screen noPadding={noPadding}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <FlatList
        data={filterData}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            image={{ uri: 'https://ui-avatars.com/api/?background=fc5c65&color=fff&rounded=true&name=' + (item ? item.title : '') }}
            title={item.ownerID == localUser.uid ? item.senderName : item.ownerName}
            subTitle={item.feedTitle}
            click={() => {
              var params = {
                isNew: false,
                chat: item
              }
              props.navigation.navigate('Chat', params)
            }}
          />
        )}
        ItemSeparatorComponent={ListItemSeperator}
        refreshing={refresh}
        onRefresh={() => {
          loadMessage(localUser.uid)
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default MessagesScreen;
