import { View, Text, StyleSheet, Animated, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

const LoadingDots = () => {

    const [animationValue] = useState(
        Array.from({length: 3}, () => new Animated.Value(1))
    );

    const startAnimation = () => {
        Animated.loop(
            Animated.stagger(
                100, 
                animationValue.map((value) => {
                    return Animated.sequence([
                        Animated.timing(value, {
                            toValue: 0.5,
                            duration: 500,
                            easing: Easing.linear,
                            useNativeDriver: true
                        }),
                        Animated.timing(value, {
                            toValue: 1,
                            duration: 500,
                            easing: Easing.linear,
                            useNativeDriver: true
                        })
                    ])
                })
            )
        ).start();
    }

    const resetAnimation = () => {
        animationValue.forEach(value => value.setValue(1));
    }

    useEffect(() => {
        startAnimation();
        return () => resetAnimation();
    }, [])

  return (
    <View style={styles.container}>
        {animationValue.map((value, index) => {
            return (
                <Animated.View 
                    key={index}
                    style={[
                        styles.dot,
                        {
                            transform: [{scale: value}],
                            marginRight: 4
                        }
                    ]}
                />
            )
        })}
    </View>
  )
}

export default LoadingDots

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
        alignSelf: 'center',
        marginLeft: 20,
        height: 14,
    },
    dot: {
        width: RFValue(5),
        height: RFValue(5),
        borderRadius: 55,
        backgroundColor: 'grey'
    }
})