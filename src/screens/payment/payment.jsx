import React, { useMemo, useState } from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Image } from "@rneui/themed";
import * as zod from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextInput, tw } from "../../components";
import { Screen } from "react-native-screens";
import { validationMessage } from "../../constants";
import { updateProfileApi } from "../../api/auth";
import { showMessage } from "react-native-flash-message";
import { useAuth } from "../../contexts";

export const Payment = ({ route }) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const validationSchema = useMemo(
    () =>
      zod.object({
        cardNumber: zod
          .string({ required_error: validationMessage.required })
          .nonempty(validationMessage.required),
        firstName: zod
          .string({ required_error: validationMessage.required })
          .nonempty(validationMessage.required),
        lastName: zod
          .string({ required_error: validationMessage.required })
          .nonempty(validationMessage.required),
      }),
    [],
  );

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });
  const onSubmit = (values) => {
    updateProfileApi(route?.params?.user?.id, { isMember: true })
      .then((res) => {
        login(res.data);
      })
      .catch((err) => {
        showMessage({
          description: err?.message,
          message: "Thanh toán thất bại vui lòng thử lại",
          type: "danger",
        });
      });
  };

  return (
    <Screen style={tw`flex-1 bg-white`}>
      <KeyboardAwareScrollView contentContainerStyle={tw`grow py-28px px-16px`}>
        <Text style={tw`text-18px font-bold text-center mb-16px`}>
          Thiết lập thẻ tín dụng hoặc thẻ ghi nợ
        </Text>

        <View style={tw`flex-row items-center mb-24px`}>
          <Image
            source={require("../../../src/asset/visa.png")}
            style={{
              width: 38,
              height: 22,
            }}
          />
          <Image
            source={require("../../../src/asset/master.png")}
            style={{
              width: 38,
              height: 22,
            }}
          />
          <Image
            source={require("../../../src/asset/amex.png")}
            style={{
              width: 38,
              height: 22,
            }}
          />
        </View>
        <Controller
          name='cardNumber'
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              inputContainerStyle={{
                height: 42,
                borderRadius: 10,
                backgroundColor: "#fff",
                borderColor: "#c4c4c4",
                borderWidth: 1,
                paddingLeft: 8,
              }}
              required
              label='Số thẻ'
              placeholder='Nhập số thẻ'
              value={value}
              onBlur={onBlur}
              clearButtonMode='while-editing'
              onChangeText={onChange}
              errorMessage={errors.cardNumber?.message}
            />
          )}
        />
        <View style={tw`flex-row items-center `}>
          <View style={tw`w-1/2`}>
            <Controller
              name='firstName'
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  inputContainerStyle={{
                    height: 42,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    borderColor: "#c4c4c4",
                    borderWidth: 1,
                    paddingLeft: 8,
                  }}
                  required
                  label='Họ'
                  placeholder='Nhập Họ'
                  value={value}
                  clearButtonMode='while-editing'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.firstName?.message}
                />
              )}
            />
          </View>
          <View style={tw`w-1/2`}>
            <Controller
              name='lastName'
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  inputContainerStyle={{
                    height: 42,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    borderColor: "#c4c4c4",
                    borderWidth: 1,
                    paddingLeft: 8,
                  }}
                  required
                  label='Tên'
                  placeholder='Nhập tên'
                  value={value}
                  clearButtonMode='while-editing'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.lastName?.message}
                />
              )}
            />
          </View>
        </View>
        <View
          style={tw`flex-row justify-between items-center w-full h-62px bg-[#fff] rounded-xl  px-16px`}
        >
          <Text style={tw``}>Gói hội viên</Text>
          <Text style={tw`font-bold`}>78,000 đ</Text>
        </View>
        <View>
          <Text style={tw`p-8px pt-16px`}>
            Các khoản thanh toán của bạn sẽ được xử lý ở nước ngoài. Bạn có thể
            phải trả thêm phí ngân hàng.
          </Text>
        </View>
        <View style={tw`flex-1 justify-end`}>
          <Button
            title='Thanh toán'
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
            loading={loading}
          />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};
