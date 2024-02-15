import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
import ListItem from "../components/ListItem";
// import { Image } from "react-native-expo-image-cache";
import { arrayBufferToBase64 } from "./ListingsScreen";
import DEFS from '../config/defaults'
import Icon from "../components/Icon";
import authStorage from "../auth/authStorage";
//import Gallery from 'react-native-image-gallery';
import Slideshow from 'react-native-image-slider-show';


const ListingDetailsScreen = (props) => {
  const listing = props.route.params;
  const [isWishListed, setIsWishListed] = useState(false)
  const [isSold, setIsSold] = useState(false)
  const [localUser, setLocalUser] = useState();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [items, setItems] = useState([]);


  const loadUser = async () => {
    const local = await authStorage.getLocalId();
    setLocalUser(JSON.parse(local))
    console.log("localUser", localUser.uid, listing.createdBy.uId)


    if (localUser.uid == listing.createdBy.uId) {
      setIsOwner(true)
    } else {
      setIsOwner(false)
    }

    setIsUserLoaded(true)

    console.log("whishlist", listing.wishlist)
    listing.wishlist.forEach((element, index) => {
      console.log("whishlist" + index, element)
      if (element._id == localUser.uid) {
        setIsWishListed(true)
      }
    });
    var i = [];
    listing.images.forEach(element => {
      i.push({
        url: arrayBufferToBase64(element.data),
      })
    });

    setItems(i)

    setIsSold(listing.isSold)
  }

  useEffect(() => {
    // loadUser()
  }, [isUserLoaded])


  const handleWishListe = () => {

    var dataPayLoad = {

    }

    // if (!isWishListed)
    fetch(DEFS.baseUrl + '/wishlist/' + listing.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        createdBy: localUser.uid,
        isWishList: !isWishListed
      })
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("wishList Rsponse", res.success)
        if (res.success === true) {
          console.log('Wishlist registered successfully!')

          setIsWishListed(!isWishListed)

          setIsPending(false);
        } else {

          setIsPending(false);
          Alert.alert(res.message);
        }
      })
      .catch((error) => {
        setIsPending(false)
        Alert.alert(error.message);
        console.error(error)
      })

  }

  const handleDelete = () => {
    Alert.alert("Delete Listing", "Are you sure!", [
      {
        text: "Yes", onPress: () => {
          fetch(DEFS.baseUrl + '/feeds/' + listing.id, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              isSold: true
            })
          })
            .then((response) => response.json())
            .then((res) => {
              console.log("wishList Rsponse", res.success)
              if (res.success === true) {
                console.log('Wishlist deleted successfully!')
                props.navigation.goBack();

                setIsPending(false);
              } else {

                setIsPending(false);
                Alert.alert(res.message);
              }
            })
            .catch((error) => {
              setIsPending(false)
              Alert.alert(error.message);
              console.error(error)
            })
        }
      },
      { text: "No" },
    ]);
  }

  const handleMessage = () => {

    var params = {
      user: localUser,
      feed: listing,
      isNew: true
    }
    params.feed.images = {};
    // props.navigation.navigate('AccountStack', {screen: 'Chat', params})
    props.navigation.navigate('NewChat', params)

  }

  const handleMarkSold = () => {
    fetch(DEFS.baseUrl + '/feeds/' + listing.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isSold: true
      })
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("wishList Rsponse", res.success)
        if (res.success === true) {
          console.log('Wishlist registered successfully!')

          setIsSold(true)

          setIsWishListed(!isWishListed)

          setIsPending(false);
        } else {

          setIsPending(false);
          Alert.alert(res.message);
        }
      })
      .catch((error) => {
        setIsPending(false)
        Alert.alert(error.message);
        console.error(error)
      })
  }
  { !isUserLoaded && loadUser() }

  return (
    <View>
      <View>
        {/* <Image
          style={styles.image}
          source={{ uri: arrayBufferToBase64(listing.images[0].data) }}
        />  */}
        <Slideshow
          height={350}
          dataSource={items} />
        {isSold && (<AppText style={styles.soldText} numberOfLines={1} ellipsizeMode='tail'>Sold</AppText>)}

        <View style={styles.wishListContainer}>

          {!isOwner && (<TouchableOpacity onPress={handleWishListe}>
            <Icon
              backgroundColor={colors.white}
              name={!isWishListed ? 'heart-outline' : 'heart'}
              size={50}
              iconColor={!isWishListed ? "black" : "red"}
            />
          </TouchableOpacity>)}
          {!isOwner && !isSold && (<TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={handleMessage}>
            <Icon
              backgroundColor={colors.white}
              name='message-reply-text-outline'
              size={50}
              iconColor="#fc5c65"
            />
          </TouchableOpacity>)}
          {isOwner && !isSold && (<TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={handleMarkSold}>
            <Icon
              backgroundColor={colors.white}
              name='check'
              size={50}
              iconColor="green"
            />
          </TouchableOpacity>)}
          {isOwner && (<TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={handleDelete}>
            <Icon
              backgroundColor={colors.white}
              name='trash-can'
              size={50}
              iconColor="red"
            />
          </TouchableOpacity>)}

        </View>

      </View>
      <View style={styles.container}>
        <AppText style={styles.price}>{listing.title}</AppText>
        <View style={styles.userContainer}
        >
          <ListItem
            setPaddingZero={true}
            title={listing.createdBy.name}
            click={() => { props.navigation.navigate('UserListing', listing.createdBy.uId) }}
            subTitle={listing.createdBy.email}
            image={{ uri: 'https://ui-avatars.com/api/?background=fc5c65&color=fff&rounded=true&name=' + (listing ? listing.createdBy.name : '') }}
          />
        </View>
        <AppText style={styles.titleHeader}>Item Description:</AppText>
        <AppText style={styles.title}>{listing.description}</AppText>
        <AppText style={styles.titleHeader}></AppText>
        <AppText style={styles.titleHeader}>In Exchange For:</AppText>
        <AppText style={styles.title}>{listing.exchangeFor}</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 14,
  },

  titleHeader: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 20,
    color: colors.secondary,
    marginVertical: 10,
    fontWeight: "bold",
  },
  userContainer: {
    marginVertical: 5,
  },
  wishListContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignSelf: 'flex-end'
  }, soldText: {
    color: colors.white,
    fontSize: 14,
    width: '20%',
    margin: 15,
    textTransform: "uppercase",
    borderRadius: 5,
    alignContent: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    position: 'absolute',
    backgroundColor: 'red'
  }
});

export default ListingDetailsScreen;
