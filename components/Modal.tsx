
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import { colorApp } from '@/constants/Colors';

type ModalType = {
    handleShowModal: () => void,
    modalVisible: boolean,
    onBtnSavePress?: () => void,
    onMontoPress?: (monto: string) => void,
    onComentPress?: (text: string) => void,
    isLoading?: boolean,
    date?: Date,
    setDate?: React.Dispatch<React.SetStateAction<Date>>,
    children?: React.JSX.Element
}
const MyModal = ({
    handleShowModal,
    modalVisible,
    onBtnSavePress,
    onComentPress,
    onMontoPress,
    isLoading,
    date = new Date(),
    setDate,
    children }: ModalType) => {

    const [show, setShow] = useState(false);
    const showDatepicker = () => setShow(!show)

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        if (setDate) {
            setDate(currentDate);
        }
        setShow(!show)
    };

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    {children ? children : <>
                        <Text style={{
                            fontSize: 22,
                            marginTop: 20,
                            fontWeight: "bold",
                        }}>Nuevo registro de extra</Text>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            backgroundColor: "#f9f7f7",
                            padding: 16,
                            borderRadius: 14,
                            width: "100%",
                            marginTop: 20
                        }}>
                            <Text style={{
                                fontWeight: "semibold",
                                fontSize: 18
                            }}>{date?.toLocaleString().split(" ")[0]}</Text>

                            <FontAwesome name="calendar" color={colorApp.principal} size={30} onPress={showDatepicker} />
                        </View>

                        <TextInput
                            placeholder="Ingrese monto"
                            autoCapitalize="none"
                            style={styles.text_input_monto}
                            onChangeText={onMontoPress}
                            keyboardType="numeric"
                        />
                        <TextInput
                            placeholder="Ingrese un comentario (Opcional)"
                            autoCapitalize="none"
                            style={styles.text_input_coment}
                            onChangeText={onComentPress}
                        />

                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 20,
                            marginTop: 20
                        }}>

                            <TouchableOpacity onPress={handleShowModal} style={{ padding: 6 }}>
                                <Text
                                    style={styles.text_btn_solicitar}
                                >
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onBtnSavePress}
                                style={{ padding: 6 }}>
                                <Text style={styles.text_btn_solicitar}>{isLoading ? "Espere..." : "Guardar"}</Text></TouchableOpacity>
                        </View>

                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={"date"}
                                onChange={onChange}
                            />
                        )}
                    </>}
                </View>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top: 0,
        width: "100%",
        bottom: 0,
        backgroundColor: "rgba(000, 000, 00, 0.6)",
        zIndex: 2,
        paddingHorizontal: 20
    },
    modalView: {
        backgroundColor: "#edf0f2",
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    text_input_monto: {
        padding: 10,
        minWidth: "100%",
        borderWidth: 1,
        borderColor: "#4a067a",
        borderRadius: 14,
        fontSize: 18,
        marginVertical: 20,
        backgroundColor: "#fff"
    },
    text_input_coment: {
        padding: 8,
        minWidth: "100%",
        borderWidth: 1,
        borderColor: "#4a067a",
        borderRadius: 16,
        fontSize: 18,
        marginBottom: 10,
        minHeight: 80,
        backgroundColor: "#fff"
    },

    text_btn_solicitar: {
        fontWeight: "bold",
        fontSize: 16,
        color: colorApp.principal
    }


});

export default MyModal;