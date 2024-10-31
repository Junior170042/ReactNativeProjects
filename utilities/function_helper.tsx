import { ExtraRegister } from "@/hooks/useSqlite";
import { Alert } from "react-native";

type NumberStringDate = {
    currentYear: number
    currentMonth: number
    currentDay: number
}

export const showAlert = (title: string, message: string) => {

    Alert.alert(title, message, [
        // {
        //     text: "Cancelar",
        //     onPress: () => null,
        //     style: "cancel",
        // },
        { text: "Ok", onPress: () => null },
    ]);

}

function isOneDigitNumber(numero: number): boolean {
    return numero <= 9;
}

export function numberToStringDate(numberValues: NumberStringDate): string {

    const { currentYear, currentMonth, currentDay } = numberValues

    const finalMonth = isOneDigitNumber(currentMonth) ? `0${currentMonth}` : `${currentMonth}`;
    const finalDay = isOneDigitNumber(currentDay) ? `0${currentDay}` : `${currentDay}`;


    return `${currentYear}-${finalMonth}-${finalDay}`
}

export function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');

    // Asegurar que el mes y el día tengan 2 dígitos si es necesario
    const formattedDay = parseInt(day, 10);
    const formattedMonth = parseInt(month, 10);

    // Retornar la fecha en el formato deseado: 24/09/2024 o 24/9/2024
    return `${formattedDay}/${formattedMonth.toString().padStart(2, '0')}/${year}`;
}


export function sumarValorExtras(array: ExtraRegister[]): number {
    return array.reduce((acumulador, item) => acumulador + Number(item.extra_value), 0);
}

export const getCurrentIntervalDate = (): string => {
    const date = new Date();
    const currentDay = date.getDate();

    if (currentDay < 15) {
        return "Entre 26 y 10";
    }

    return "Entre 11 y 25";
};



