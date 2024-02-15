import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "./AppPicker";
import ErrorMessage from "./ErrorMessage";

function AppFormPicker(props) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <React.Fragment>
      <AppPicker
        items={props.items}
        onSelectItem={(item) => setFieldValue(props.name, item)}
        placeholder={props.placeholder}
        selectedItem={values[props.name]}
        numberOfColumns={props.numberOfColumns}
        PickerItemComponent={props.PickerItemComponent}
      />
      <ErrorMessage error={errors[props.name]} visible={touched[props.name]} />
    </React.Fragment>
  );
}

export default AppFormPicker;
