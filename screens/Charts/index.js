import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, Text, View, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import ProgressChart from "../Progress";
import { useEffect, useState } from "react";
import { getStat, getStatToday } from "../../service/statService";
import { formatDate } from "../../helpers/formatDate";
import { getTarget } from "../../service/targetService";
import { useNavigationState } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Charts({ navigation }) {
    const index = useNavigationState((state) => state.index);
    const screenWidth = Dimensions.get("window").width;
    const [stat, setStat] = useState();
    const [target, setTarget] = useState();
    const [statToday, setStatToday] = useState();
    useEffect(() => {
        const fetchApi = async () => {
            let user
            try {
                const jsonValue = await AsyncStorage.getItem('userData');
                user = JSON.parse(jsonValue)
            } catch (error) {
                console.log(error)
            }
            const res = await getTarget(user._id);
            if (res) {
                setTarget(res);
            }
        }
        fetchApi()
    }, [index])
    useEffect(() => {
        const fetchApi = async () => {
            let user
            try {
                const jsonValue = await AsyncStorage.getItem('userData');
                user = JSON.parse(jsonValue)
            } catch (error) {
                console.log(error)
            }
            const res = await getStatToday(user._id);
            if (res) {
                setStatToday(res);
            }
        }
        fetchApi()
    }, [index])
    useEffect(() => {
        const fetchApi = async () => {
            let user
            try {
                const jsonValue = await AsyncStorage.getItem('userData');
                user = JSON.parse(jsonValue)
            } catch (error) {
                console.log(error)
            }
            const res = await getStat(user._id);
            if (res) {
                res.reverse()
                setStat(res);
            }
        }
        fetchApi()
    }, [index])
    const dataCalo = {
        labels: stat && stat.map(item => formatDate(item.createdAt)),
        datasets: [
            {
                data: stat && stat.map(item => item.calories),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Calo"] // optional
    };
    const dataCarbohydrate = {
        labels: stat && stat.map(item => formatDate(item.createdAt)),
        datasets: [
            {
                data: stat && stat.map(item => item.carbohydrate),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Carbohydrate"] // optional
    };
    const dataFat = {
        labels: stat && stat.map(item => formatDate(item.createdAt)),
        datasets: [
            {
                data: stat && stat.map(item => item.fat),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Chất béo"] // optional
    };
    const dataProtein = {
        labels: stat && stat.map(item => formatDate(item.createdAt)),
        datasets: [
            {
                data: stat && stat.map(item => item.protein),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Protein"] // optional
    };
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: true // optional
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.section_three}>
                    <View style={{ width: "88%", height: "100%" }}>
                        <Text style={{ fontSize: 36 }}>Tiến độ</Text>
                    </View>
                </View>
                {(target && statToday) && (
                    <>
                        <View style={styles.section_five}>
                            <ProgressChart value={(statToday.calories / target.caloriesEachDay).toFixed(2)} />
                        </View>
                        <View style={styles.section_four}>
                            <Text style={{ fontSize: 20, fontWeight: 600 }}>Mục tiêu hằng ngày</Text>
                            <Text style={{ fontSize: 18, fontWeight: 500 }}>{target.caloriesEachDay} kcal</Text>
                        </View>

                        <View style={styles.section_four}>
                            <Text style={{ fontSize: 20, fontWeight: 600 }}>Đã nạp</Text>
                            <Text style={{ fontSize: 18, fontWeight: 500 }}>{statToday.calories} kcal</Text>
                        </View>
                        {statToday.calories <= target.caloriesEachDay ? (
                            <View style={styles.section_four}>
                                <Text style={{ fontSize: 20, fontWeight: 600 }}>Còn thiếu</Text>
                                <Text style={{ fontSize: 18, fontWeight: 500 }}>{target.caloriesEachDay - statToday.calories} kcal</Text>
                            </View>
                        ) : (
                            <View style={styles.section_four}>
                                <Text style={{ fontSize: 20, fontWeight: 600 }}>Bạn đã ăn thừa</Text>
                                <Text style={{ fontSize: 18, fontWeight: 500 }}>{Math.abs(target.caloriesEachDay - statToday.calories)} kcal</Text>
                            </View>
                        )}

                    </>
                )}
                <View style={styles.section_two}>
                    <View style={{ width: "88%", height: "100%" }}>
                        <Text style={{ fontSize: 36 }}>Biểu đồ theo dõi</Text>
                    </View>
                </View>
                {stat && (
                    <>
                        <View>
                            <LineChart
                                data={dataCalo}
                                width={screenWidth}
                                height={220}
                                chartConfig={chartConfig}
                                bezier
                            />
                        </View>
                        <View>
                            <LineChart
                                data={dataProtein}
                                width={screenWidth}
                                height={220}
                                chartConfig={chartConfig}
                                bezier
                            />
                        </View>
                        <View>
                            <LineChart
                                data={dataCarbohydrate}
                                width={screenWidth}
                                height={220}
                                chartConfig={chartConfig}
                                bezier
                            />
                        </View>
                        <View >
                            <LineChart
                                data={dataFat}
                                width={screenWidth}
                                height={220}
                                chartConfig={chartConfig}
                                bezier
                            />
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        minHeight: "100%"
    },
    section_one: {
        flexDirection: "row",
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "space-between"
    },
    icon_back: {
        width: "12%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    section_two: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40
    },
    section_three: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    section_four: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 30,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#ddd"
    },
    section_five: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30,
        paddingVertical: 10,
        marginBottom: 10
    }

})
export default Charts
