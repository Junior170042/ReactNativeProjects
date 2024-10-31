import React, { useCallback, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { AntDesign } from '@expo/vector-icons';
import { ExtraRegister } from '@/hooks/useSqlite';

interface SwipeableListProps {
    data: ExtraRegister[];
    renderItem: (item: ExtraRegister) => React.ReactElement;
    onDelete?: (id: string | number) => void;
    swipable?: boolean,
    keyExtractor: (item: ExtraRegister) => string;
}

export function SwipeableList({
    data,
    renderItem,
    onDelete,
    swipable,
    keyExtractor,
}: SwipeableListProps) {
    const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

    const renderRightActions = useCallback((_: any, dragX: Animated.AnimatedInterpolation<number>, item: ExtraRegister) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return <>
            {swipable && <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: "center" }}
                onPress={() => {
                    if (onDelete) onDelete(item.id)
                }}
            >
                <View style={styles.deleteBox}>
                    <Animated.View style={{ transform: [{ scale }] }}>
                        <AntDesign name="delete" size={24} color="white"

                        />
                    </Animated.View>
                </View>
            </TouchableOpacity>}
        </>
    }, [onDelete]);

    const renderListItem = useCallback(({ item }: { item: ExtraRegister }) => {
        return (
            <Swipeable
                ref={(ref) => {
                    if (ref) {
                        swipeableRefs.current[item.id] = ref;
                    }
                }}
                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
                onSwipeableOpen={() => {
                    Object.keys(swipeableRefs.current).forEach((key) => {
                        if (key !== item.id.toString()) {
                            swipeableRefs.current[key]?.close();
                        }
                    });
                }}
            >
                {renderItem(item)}
            </Swipeable>
        )
    }, [renderItem, renderRightActions]);

    return (
        <FlatList
            data={data}
            renderItem={renderListItem}
            keyExtractor={keyExtractor}
        />
    );
}

const styles = StyleSheet.create({
    deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 50
    },
});