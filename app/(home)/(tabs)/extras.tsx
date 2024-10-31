
import { colorApp, } from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { ExtraRegister } from '@/hooks/useSqlite';
import RenderItem from '@/components/RenderItem';
import { formatDate } from '@/utilities/function_helper';
import { SwipeableList } from '@/components/SwipAbleList';
import { useExtraContext } from '@/hooks/useDatabase';
import { useFocusEffect } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

export default function AddTabScreen() {
    const { searchExtras,
        deleteExtra,
        getExtrasBySearchWord,
    } = useExtraContext()

    const theme = useColorScheme()

    const [buscador, setBuscador] = useState<string>("");

    const handleDeleteExtraRegister = (id: string | number) => {
        if (id) deleteExtra(id)
    }

    const handleSearchExtras = (buscador: string) => {

        getExtrasBySearchWord(buscador)
    }

    useEffect(() => {
        getExtrasBySearchWord("")
    }, [])

    useFocusEffect(
        useCallback(() => { getExtrasBySearchWord("") }, [])
    )


    const renderExtrasList = (item: ExtraRegister) => {
        return <>
            <RenderItem>
                <View style={{
                    backgroundColor: theme == "light" ? "#edf0f2" : "#020b17",
                    padding: 14
                }}>
                    <View style={[styles.card_extra_list, { backgroundColor: theme == "light" ? "#fff" : colorApp.bg_dark }]}>
                        <Text style={{
                            textAlign: 'center',
                            fontWeight: "bold",
                            marginTop: 10,
                            fontSize: 20,
                            color: `${theme == "dark" && "#ccc"}`
                        }}>{formatDate(item.full_date)}</Text>
                        <Text style={{
                            textAlign: 'center',
                            fontWeight: 700,
                            fontSize: 20,
                            color: `${theme == "dark" && "#ccc"}`
                        }}>$ {item.extra_value}</Text>
                        <Text style={{
                            marginBottom: 10,
                            fontSize: 12,
                            color: "#b3b1b1"
                        }}>{item.description || "Sin descripcion"}</Text>
                    </View>
                </View>
            </RenderItem>
        </>
    }


    return <View style={[styles.container, { backgroundColor: theme == "light" ? "#edf0f2" : "#020b17", }]}>
        <ThemedText type="title">Extras registradas</ThemedText>
        <View style={{
            flexDirection:
                "row",
            justifyContent: "space-between",
            gap: 20,
            backgroundColor: theme == "light" ? "#fff" : colorApp.bg_dark,
            padding: 12,
            borderRadius: 16,
            alignItems: "center",
            marginVertical: 24
        }}>
            <TextInput
                placeholder="Buscar por dia o mes"
                autoCapitalize="none"
                style={{
                    padding: 4,
                    width: "75%",
                    backgroundColor: theme == "light" ? "#fff" : colorApp.bg_dark,
                    fontSize: 20,
                    fontWeight: "bold"
                }}
                keyboardType="numeric"
                onChangeText={setBuscador}
            />
            <FontAwesome name="search" size={34} onPress={() => handleSearchExtras(buscador)} color={theme == "light" ? colorApp.principal : "#020b17"} />
        </View>

        {searchExtras.length > 0 ?
            <SwipeableList
                data={searchExtras}
                renderItem={renderExtrasList}
                onDelete={handleDeleteExtraRegister}
                swipable={true}
                keyExtractor={(item) => item.id.toString()}
            /> :
            <View style={{ marginTop: 20 }}>
                <Text>No hay registro para mostrar!</Text>
            </View>
        }

    </View>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        padding: 10,
        flex: 1,
        alignItems: "center",
        position: "relative",
        marginTop: 12

    },
    textTitle: {
        fontWeight: "bold",
        color: colorApp.principal,
        fontSize: 26,
        marginTop: 2
    },
    filter_btn: {
        position: "absolute",
        right: 20,
        bottom: 20,
        backgroundColor: colorApp.principal,
        borderRadius: 30,
        padding: 10,
        zIndex: 2
    },
    filter_input_box: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 18,
        gap: 20
    },
    card_extra_list: {
        minWidth: "100%",
        flexDirection: "column",
        gap: 20,
        elevation: 8,
        borderRadius: 16,
        paddingLeft: 20,
    }
});
