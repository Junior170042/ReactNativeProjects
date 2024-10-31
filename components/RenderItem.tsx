import { View } from 'react-native'
import React from 'react'

export default function RenderItem({ children }: { children: React.ReactNode }) {

    return (
        <View style={{ width: "100%", backgroundColor: "#edf0f2" }}>
            {children}
        </View>
    );
}
