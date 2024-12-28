import { useEffect, useState } from "react"
import { Keyboard } from "react-native"

export default function useKeyboardOffsetHeight(){

    const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0)

    useEffect(() => {
        const keyboardWillAndroidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            setKeyboardOffsetHeight(event.endCoordinates.height)
        })
        const keyboardWillAndroidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOffsetHeight(0)
        })
        const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardOffsetHeight(0)
        })
        const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (event) => {
            setKeyboardOffsetHeight(event.endCoordinates.height)
        })

        return () => {
            keyboardWillAndroidShowListener.remove(),
            keyboardWillAndroidHideListener.remove(),
            keyboardWillHideListener.remove(),
            keyboardWillShowListener.remove();
        }
    }, [])
    return keyboardOffsetHeight
}