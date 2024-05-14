import { SafeAreaView, Text, View, StyleSheet, Dimensions } from "react-native";
import * as Progress from 'react-native-progress';
function ProgressChart(props) {
    const { value } = props
    return (
        <View>
            {value > 1 ? (
                <Progress.Bar progress={parseFloat(value)} width={300} color="red" />
            ): (
                <Progress.Bar progress={parseFloat(value)} width={300} color="#5EBD2F" />
            ) }

        </View>
    )
}
export default ProgressChart