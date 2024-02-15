import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";
import colors from "../config/colors";

import Screen from "../components/Screen";
import SubmitButton from "../components/SubmitButton";
import AppForm from "../components/AppForm";
import AppFormField from "../components/AppFormField";
import AppFormPicker from "../components/AppFormPicker";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/FormImagePicker";
import useLocation from "../hooks/useLocation";
import UploadScreen from "../screens/UploadScreen";
import * as FileSystem from 'expo-file-system'
import AuthContext from "../auth/context";
import authStorage from "../auth/authStorage";
import defs from "../config/defaults";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  exchange: Yup.string().required().min(1).label("Exchange"),
  description: Yup.string().required().min(1).label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please Select atleast one Image"),
});

export const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

const xyz = [1, 2, 3];

function ListingEditScreen() {

  //const { user, setUser, name, setName, local } = useContext(AuthContext);
  const [localUser, setLocalUser] = useState();


  const loadUser = async () => {
    const local = await authStorage.getLocalId();
    setLocalUser(JSON.parse(local))
    console.log(localUser)
  }

  useEffect(() => {
    loadUser()
  }, [noOfImage])


  useEffect(() => {

    if (
      noOfImage === imageUrl.length &&
      noOfImage !== 0 &&
      imageUrl.length !== 0
    ) {
      setImageUrl([]);
      setNoOfImage(0);
    }


  });

  const [noOfImage, setNoOfImage] = useState(0);
  const [imageUrl, setImageUrl] = useState([]);
  const [listings, setListings] = useState({});
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();


  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    setListings((state) => listing);
    setNoOfImage((state) => state + listing.images.length);
    console.log(listing.images.length)

    fetch(defs.baseUrl + '/feeds', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: listing.title,
        description: listing.description,
        exchange: listing.exchange,
        images: listing.images,
        backgroundColor: listing.category.backgroundColor,
        icon: listing.category.icon,
        label: listing.category.label,
        value: listing.category.value,
        createdBy: localUser.uid,
        name: localUser.name,
        email: localUser.userEmail
      })
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Login Rsponse", res.success)
        if (res.success === true) {
          console.log('Add Feed successfully!')
          setUploadVisible(false);
          resetForm();
        } else {
          console.log(res.message)
          setUploadVisible(false);
        }
      })
      .catch((error) => {
        console.log(jData.message)
        setUploadVisible(false);
      })
    /*  try {
       const uploadResult = await FileSystem.uploadAsync('http://10.0.2.2:3000/api/feeds', listing.images[0], {
         httpMethod: 'POST',
         uploadType: FileSystem.FileSystemUploadType.MULTIPART,
         fieldName: 'demo_image',
         parameters: {
           title: listing.title,
           description: listing.description,
           exchange: listing.exchange,
           backgroundColor: listing.category.backgroundColor,
           icon: listing.category.icon,
           label: listing.category.label,
           value: listing.category.value,
           createdBy: localUser.uid,
           name: localUser.name,
           email: localUser.userEmail
         }
       });
       console.log(uploadResult)
       var jData = JSON.parse(uploadResult.body)
       if (jData.success === true) {
         console.log('Add Feed successfully!')
         setUploadVisible(false);
         resetForm();
       } else {
         console.log(jData.message)
         setUploadVisible(false);
       }
     } catch (err) {
       setUploadVisible(false)
       console.error(err)
     } */
  };

  return (
    <ScrollView>
      <Screen style={styles.container}>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <AppForm
          initialValues={{
            title: "",
            description: "",
            exchange: "",
            category: null,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="images" min={1} max={3} />
          <AppFormField maxLength={255} name="title" placeholder="Title" />
          <AppFormPicker
            items={categories}
            name="category"
            numberOfColumns={3}
            placeholder="Category"
            PickerItemComponent={CategoryPickerItem}
          />
          <AppFormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />

          <AppFormField
            multiline
            maxLength={255}
            name="exchange"
            numberOfLines={3}
            placeholder="Exchange"
          />

          <SubmitButton color={colors.primary} title="Post" />
        </AppForm>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
