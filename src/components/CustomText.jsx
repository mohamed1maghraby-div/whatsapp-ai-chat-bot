import React from "react";
import { Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const CustomText=({
    children,
    size=RFValue(12),
    color='white',
    opacity=1,
    fontWeight='normal',
    style,
    ...props
})=>{
    return(
        <Text style={{
            fontSize: size,
            color: color,
            opacity: opacity,
            fontWeight: fontWeight
        }} {...props}>{children}</Text>
    )
}

export default CustomText