import { createContext, memo, useCallback, useContext, useState } from 'react'
import Modal from 'react-native-modal'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { Text } from '@rneui/themed'

import { tw } from '../components/tw'

export const FullScreenLoadingContext = createContext({
  showFullscreenLoading() {
    throw new Error('not yet ready')
  },
  setHelpText() {
    throw new Error()
  },
})

export const FullScreenLoadingProvider = memo(({ children }) => {
  const [helpText, setHelpText] = useState()
  const { top } = useSafeAreaInsets()

  const [visible, setVisible] = useState(false)

  const showFullscreenLoading = useCallback((val, options) => {
    if (val != null) {
      setTimeout(() => {
        setVisible(val)
      }, options?.timeout ?? 1)
    }
  }, [])

  return (
    <FullScreenLoadingContext.Provider value={{ showFullscreenLoading, setHelpText }}>
      {children}
      <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut">
        <SafeAreaView style={tw`flex-1 justify-center items-center relative`}>
          {helpText != null && helpText.length !== 0 && <Text style={tw`text-white mb-1 text-center`}>{helpText}</Text>}
          <TouchableOpacity style={[tw`absolute right-20px`, { top }]} onPress={() => setVisible(false)}>
            X
          </TouchableOpacity>
          {/* <ActivityIndicator /> */}
        </SafeAreaView>
      </Modal>
    </FullScreenLoadingContext.Provider>
  )
})

export const useFullScreenLoading = () => useContext(FullScreenLoadingContext)
