import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";
import PickerItem from "./PickerItem";
import ListItemSeperator from "./ListItemSeperator";

const AppPicker = ({
  icon,
  selectedItem,
  placeholder,
  items,
  onSelectItem,
  numberOfColumns = 1,
  PickerItemComponent = PickerItem,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View style={styles.container}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              style={styles.icon}
              size={25}
              color={colors.medium}
            />
          )}

          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={25}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={visible} animationType="slide">
        <View style={styles.modalClose}>
          <MaterialCommunityIcons
            name="close"
            size={50}
            color={colors.dark}
            onPress={() => setVisible(false)}
          />
        </View>
        <FlatList
          data={items}
          numColumns={numberOfColumns}
          keyExtractor={(item) => item.value.toString()}
          ItemSeparatorComponent={ListItemSeperator}
          renderItem={({ item }) => (
            <PickerItemComponent
              item={item}
              text={item.label}
              handleClick={() => {
                setVisible(false);
                onSelectItem(item);
              }}
            />
          )}
        />
      </Modal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
  modalClose: {
    flexDirection: "row-reverse",
    margin: 10,
  },
  placeholder: {
    flex: 1,
    color: colors.medium,
  },
});

export default AppPicker;
