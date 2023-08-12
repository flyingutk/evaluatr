
import React from "react";
import { View, TextInput, StyleSheet, Text, Button } from "react-native";
import { useForm, Controller  } from "react-hook-form";
import { useTranslation } from 'react-i18next';

const Mobile = ({onOTPSent}) => {
  const { t, i18n } = useTranslation('Mobile');
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      mobile: ''
    }
  });

  const onSubmit = (data) => {
    onOTPSent(true)
  }

  return (
    <View
      style={{
        flexDirection: "row",
        height: 200
      }}
    >
           
      <View style={styles.inputWrapper}>
         
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            placeholder={t(`enterMobileNum`)}
            maxLength={6}  //setting limit of input
          />
        )}
        name="mobile"
      />
      {errors.mobile && <Text style={{color: "red"}}>{t(`mobileNumErrorMsg`)}</Text>}
      
        {/* <TextInput style={styles.input} 
          placeholder="Mobile Number" /> */}


        <View style={{ flex: 1, marginTop: 15 }}>
          
          
          <Button
            style={styles.button}
            title={t(`sendOTP`)}
            color="#841584"
            accessibilityLabel={t(`accessibilityLabel`)}
            onPress={handleSubmit(onSubmit)}
          />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  button: {
  },
});

export default Mobile;