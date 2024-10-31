
import MyModal from '@/components/Modal';
import RenderItem from '@/components/RenderItem';
import { SwipeableList } from '@/components/SwipAbleList';
import { ThemedText } from '@/components/ThemedText';
import { colorApp } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import useBackHandler from '@/hooks/useBackHandler';
import { useExtraContext } from '@/hooks/useDatabase';
import useExtraRegister, { ExtraRegister } from '@/hooks/useSqlite';
import { formatDate, getCurrentIntervalDate, showAlert, sumarValorExtras } from '@/utilities/function_helper';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, useColorScheme } from 'react-native';

export default function HomeScreen() {

  const { extras,
    getExtras,
    currentMonthExtras,
    currentIntervalExtras,
    getCurrentIntervalExtras,
    getCurrentMonthExtras } = useExtraContext()

  const {
    isLoading,
    addExtraRegister,
  } = useExtraRegister()

  const [modalVisible, setModalVisible] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [monto, setMonto] = useState("");
  const [coment, setComent] = useState("");
  const [date, setDate] = useState(new Date())

  useBackHandler()

  const handleReload = () => setIsReload(!isReload)

  useEffect(() => {
    getExtras()
    getCurrentMonthExtras()
    getCurrentIntervalExtras()
  }, [isReload])

  useFocusEffect(
    useCallback(() => {
      getExtras()
      getCurrentMonthExtras()
      getCurrentIntervalExtras()
    }, [])
  )

  const onMontoPress = (monto: string) => setMonto(monto)
  const onComentPress = (text: string) => setComent(text)

  const handleShowModal = () => {
    setModalVisible(!modalVisible)
  }


  const onBtnSavePress = () => {
    const [year, month, _] = date.toISOString().split("-");
    const day = date.toString().split(" ")[2];
    const full_date = `${year}-${month}-${day}`

    if (!monto.trim()) return showAlert("Nuevo registro!", "Debes ingresar un monto para guardar.")
    addExtraRegister(
      { full_date, day, month, year, extra_value: monto, description: coment || "" }
    ).then((res) => {
      if (res) {
        setMonto("")
        handleShowModal()
        showAlert("Nuevo registro", "Registro guardado correctamente!")
      } else {
        showAlert("Nuevo registro", "Huvo un error al guardar el registro!")
      }
      handleReload()
    })




  }


  const renderExtrasList = (item: ExtraRegister) => {
    return <RenderItem>
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
  }

  const theme = useColorScheme()


  return (
    <View style={[styles.container, { backgroundColor: theme == "dark" ? "#020b17" : "#f7f8fa" }]}>
      <ThemedText type="title">Registro extras</ThemedText>
      <View style={[styles.saldo_card, { backgroundColor: theme == "light" ? "#fff" : colorApp.bg_dark, }]}>
        <ThemedText type="subtitle">{getCurrentIntervalDate()}</ThemedText>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
          <Text style={styles.title_saldo}>Extra acumulada</Text>
          <ThemedText>$ {currentIntervalExtras?.length > 0 ? sumarValorExtras(currentIntervalExtras) : "0"}</ThemedText>
        </View>
      </View>

      <View style={[styles.saldo_card, { backgroundColor: theme == "light" ? "#fff" : colorApp.bg_dark, }]}>
        <ThemedText type="subtitle">Total extra del presente mes</ThemedText>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
          <Text style={styles.title_saldo}>Extra acumulada</Text>
          <ThemedText>$ {currentMonthExtras?.length > 0 ? sumarValorExtras(currentMonthExtras) : "0"}</ThemedText>
        </View>
      </View>

      <Text style={{
        marginTop: 20,
        fontSize: 18,
        fontWeight: "bold",
        color: theme == "light" ? colorApp.iconTabActive : "#f7f8fa"
      }}>Ultimos 10 registros agregados</Text>

      {extras?.length > 0 ? <SwipeableList
        data={extras}
        renderItem={renderExtrasList}
        keyExtractor={(item) => (item.id).toString()}
      >

      </SwipeableList> : <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 20 }}>No extras accumuladas</Text>
      </View>}

      <MyModal
        handleShowModal={handleShowModal}
        modalVisible={modalVisible}
        onMontoPress={onMontoPress}
        onComentPress={onComentPress}
        isLoading={isLoading}
        date={date}
        setDate={setDate}
        onBtnSavePress={onBtnSavePress}
      />
      <Pressable onPress={handleShowModal} style={[styles.btn_add, { backgroundColor: theme == "light" ? colorApp.principal : "#093166" }]}>
        <Text style={styles.text_btn}>+</Text>
      </Pressable>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    padding: 12,
    position: "relative",
    gap: 20,

  },
  saldo_card: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
    elevation: 20,
    borderRadius: 8,
    height: 150,
    borderLeftWidth: 4,
    borderLeftColor: colorApp.principal
  },

  title_saldo: {
    fontWeight: "semibold",
    fontSize: 20,
    color: "#3e3f40"
  },
  saldo_text: {
    fontFamily: "serif",
    fontWeight: "bold",
    fontSize: 20
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
  btn_add: {
    position: "absolute",
    bottom: 20,
    right: 30,
    width: 60,
    height: 60,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50
  }
  ,
  text_btn: {
    color: "#fff",
    fontSize: 24
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
