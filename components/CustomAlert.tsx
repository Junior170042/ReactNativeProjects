
import { Alert } from "react-native"

type AlertProp = {
    onPress?: () => void,
    title?: string,
    body?: string,
    backTheRouter?: () => void
    titleNoAction?: string,
    bodyNoAction?: string,
}

export const showAlertNoAction = (props: AlertProp) => {
    Alert.alert(props.titleNoAction!!, props.bodyNoAction, [
        {
            text: "Ok", onPress: props.backTheRouter
        }
    ])
}

export const showAlertAction = (props: AlertProp) => {
    Alert.alert(props.title!!, props.body, [
        { text: "No", onPress: () => null },
        {
            text: "Si", onPress: () => {
                if (props.onPress) {

                    props.onPress()
                }
                showAlertNoAction(props)
            }
        },
    ])
}