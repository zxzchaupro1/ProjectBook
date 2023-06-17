import { Input, InputProps, Text } from "@rneui/themed";
import { forwardRef, useCallback, useState } from "react";
import { Pressable } from "react-native";

import { tw } from "../tw";

export const TextInput = forwardRef(
  (
    {
      onFocus,
      onBlur,
      inputContainerStyle,
      errorMessage,
      isLoading,
      rightIcon,
      secureTextEntry,
      toggleSecureTextIcon,
      borderVisibleIfValue = true,
      type = "input",
      label,
      required,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isSecureTextVisible, setIsSecureTextVisible] = useState(false);

    const handleFocus = useCallback(
      (e) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    return (
      <>
        {label != null && (
          <Text style={tw`text-14px font-medium mb-8px`}>
            {required && <Text style={tw`text-error`}>* </Text>}
            {label}
          </Text>
        )}
        <Input
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          errorMessage={errorMessage}
          editable={type !== "select"}
          placeholderTextColor={tw.color("text-grayscale-gray")}
          secureTextEntry={secureTextEntry && !isSecureTextVisible}
          inputContainerStyle={[
            {
              borderColor:
                errorMessage != null
                  ? tw.color("error")
                  : isFocused || (borderVisibleIfValue && props.value != null)
                  ? tw.color("text")
                  : tw.color("grayscale-border"),
            },
            inputContainerStyle,
          ]}
          {...props}
          rightIcon={
            toggleSecureTextIcon ? (
              <Pressable
                onPress={() => setIsSecureTextVisible(!isSecureTextVisible)}
              >
                <Text style={tw`text-14px font-normal text-grayscale-gray`}>
                  {isSecureTextVisible ? "Ẩn" : "Hiện"}
                </Text>
              </Pressable>
            ) : null
          }
        />
      </>
    );
  },
);
