import React from "react";
import styles from "../../styles/input-field.module.css";
import { MdError } from "react-icons/md";
import { Autocomplete } from "@lob/react-address-autocomplete";
const apiKey = process.env.NEXT_PUBLIC_LOB_PUBLISHABLE_KEY;
import addressStyle from '../../styles/address.module.css'
import { useFormikContext } from "formik";

const AddressField = ({ id, error, errorMsg }) => {
  const formikProps = useFormikContext()
  const handleSelect = ({ value }) => {
    formikProps.setFieldValue('postal_code', value.zip_code)
    formikProps.setFieldValue('city', value.city)
    formikProps.setFieldValue('province', value.state.toUpperCase())
    formikProps.setFieldValue('address_1', value.primary_line)
    formikProps.setFieldValue('country_code', 'US')
  }
  return (
    <div className={styles.container}>
      {error ? (
        <p className={styles.errortext}>{errorMsg}</p>
      ) : (
        <p className={styles.fill} aria-hidden="true">
          fill
        </p>
      )}
      <div
        className={`${styles.fieldcontainer} ${error ? styles.errorfield : ""}`}
      >
        <Autocomplete
          id={id}
          className={addressStyle.address}
          apiKey={apiKey}
          onSelection={handleSelect}
          primaryLineOnly
        />
        {error && <MdError className={styles.erroricon} />}
      </div>
    </div>
  );
};

export default AddressField;
