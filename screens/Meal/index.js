import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
function Meal({ navigation, route }) {
    const { meal } = route.params
    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.section_one}>
                <TouchableOpacity style={styles.icon_back} onPress={() => {
                    navigation.goBack()
                }} >
                    <Ionicons name="chevron-back-sharp" size={32} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon_back}>
                    <AntDesign name="delete" size={32} color="red" />
                </TouchableOpacity>
            </View>
            { }
            <View style={styles.section_two}>
                <View style={{ width: "88%", height: "100%" }}>
                    <Text style={{ fontSize: 36 }}>{meal.name}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 400, color: "#d3d3d3" }}><Fontisto name="date" size={20} color="#d3d3d3" /> Thứ 3, 14/05/2024 <AntDesign name="clockcircleo" size={20} color="#d3d3d3" /> 8:00 AM</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.section_three}>
                    {meal && meal.foods.map((item, index) => (
                        <TouchableOpacity key={index} style={{ flexDirection: "row", width: "88%", height: 100, backgroundColor: "#fff", borderRadius: 15, marginBottom: 10 }}
                            onPress={() => {
                                navigation.navigate('FoodDetail', {
                                    food: item.food
                                })
                            }} >
                            <View style={{ width: "33.3%", height: "100%", borderTopLeftRadius: 15, marginBottom: 10 }}>
                                <Image style={{ height: "100%", width: "100%", borderRadius: 15 }}
                                    source={{ uri: item.food.thumbnail }}
                                />
                            </View>
                            <View style={{ width: "66.7%", height: "100%", justifyContent: "center" }}>
                                <View style={{}}>
                                    <Text style={{ fontSize: 28 }}>{item.food.name}</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 200 }}>{item.food.caloriesPerUnit * item.quantity} kcal</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.section_four}>
                    <Text style={{ fontSize: 32 }}>Thông tin dinh dưỡng</Text>
                </View>
                {meal && (
                    <View style={styles.section_five}>
                        <View style={{ alignItems: "center", width: "88%", backgroundColor: "#fff", borderRadius: 15, paddingBottom: 20 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", width: "80%" }}>
                                <Text style={{ fontSize: 28, fontWeight: 500 }}>Calo</Text>
                                <Text>
                                    <Text style={{ fontSize: 28, fontWeight: 500 }}>{meal.calories} </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 200 }}>kcal</Text>
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", width: "80%" }}>
                                <Text style={{ fontSize: 28, fontWeight: 500 }}>Protein</Text>
                                <Text>
                                    <Text style={{ fontSize: 28, fontWeight: 500 }}>{meal.protein.toFixed(1)} </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 200 }}>g</Text>
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", width: "80%" }}>
                                <Text style={{ fontSize: 28, fontWeight: 500 }}>Carbohydrate</Text>
                                <Text>
                                    <Text style={{ fontSize: 28, fontWeight: 500 }}>{meal.carbonhydrate.toFixed(1)} </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 200 }}>g</Text>
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", width: "80%" }}>
                                <Text style={{ fontSize: 28, fontWeight: 500 }}>Chất béo</Text>
                                <Text>
                                    <Text style={{ fontSize: 28, fontWeight: 500 }}>{meal.fat.toFixed(1)} </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 200 }}>g</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F3F3',
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
        height: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    section_three: {
        width: "100%",
        alignItems: "center"
    },
    section_four: {
        width: "100%",
        height: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    section_five: {
        width: "100%",
        alignItems: "center"
    },
});
export default Meal