import { Fontisto, Ionicons, AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Button, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { getMeal } from '../../service/mealService';

function Diary({ navigation }) {
    const id = "66416ea1f8e255ef409558cc"
    const [meal, setMeal] = useState();
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getMeal(id);
            if (res) {
                setMeal(res);
            }
        }
        fetchApi()
    }, [])
    return (
        <SafeAreaView>
            <ScrollView >
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                        <View style={styles.diarySection}>
                            <TouchableOpacity style={styles.diaryButton}>
                                <Text style={styles.dateText}>Hôm nay, 14 tháng 5</Text>
                            </TouchableOpacity>
                            <Fontisto name="date" size={32} color="black" />
                        </View>
                        <View style={styles.mealSection}>
                            <Text style={styles.mealTitle}>Bữa ăn</Text>
                            {/* Bữa sáng */}
                            <TouchableOpacity style={styles.mealItem} onPress={() => {
                                navigation.navigate('Meal', {
                                    meal: meal
                                })
                            }}>
                                {meal ? (
                                    <>
                                        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.mealItemText}>{meal.name}</Text>
                                            <Text style={{ fontSize: 18, fontWeight: 400, color: "#979798" }}><AntDesign name="clockcircleo" size={20} color="#979798" /> 8:00 AM</Text>
                                        </View>
                                        {meal.foods.map((item, index) => (
                                            <View key={index} style={{ width: "100%", marginBottom: 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                <Text style={{ fontSize: 18 }}> {item.food.name}</Text>
                                                <Text style={{ fontSize: 18 }}>{item.food.caloriesPerUnit * item.quantity} kcal</Text>
                                            </View>
                                        ))}
                                        <View style={{ width: "100%", paddingTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderTopWidth: 2, borderTopColor: "#ddd" }}>
                                            <Text style={{ fontSize: 18 }}></Text>
                                            <Text style={{ fontSize: 18 }}>Tổng cộng: {meal.calories} kcal</Text>
                                        </View>
                                    </>
                                ) : (
                                    <TouchableOpacity style={styles.addButton} onPress={() => {
                                        navigation.navigate('AddMeal')
                                    }} >
                                        <Text style={styles.addButtonText}>+   Bữa sáng</Text>
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                            {/* Bữa trưa */}
                            <View style={styles.mealItem}>
                                <View style={{ width: "100%" }}>
                                    <Text style={styles.mealItemText}>Bữa trưa</Text>
                                </View>
                                <TouchableOpacity style={styles.addButton}>
                                    <Text style={styles.addButtonText}>+   Bữa trưa</Text>
                                </TouchableOpacity>
                            </View>
                            {/* Bữa tối */}
                            <View style={styles.mealItem}>
                                <View style={{ width: "100%" }}>
                                    <Text style={styles.mealItemText}>Bữa tối</Text>
                                </View>
                                <TouchableOpacity style={styles.addButton}>
                                    <Text style={styles.addButtonText}>+   Bữa tối</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.mealSection}>
                            <Text style={styles.mealTitle}>Ăn nhẹ</Text>
                            <View style={styles.mealItem}>
                                <View style={{ width: "100%" }}>
                                    <Text style={styles.mealItemText}>Bữa ăn nhẹ</Text>
                                </View>
                                <TouchableOpacity style={styles.addButton}>
                                    <Text style={styles.addButtonText}>+   Bữa ăn nhẹ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    contentContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 100, // Adjust according to your needs
        backgroundColor: '#F3F3F3',
    },
    diarySection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 20,
        paddingHorizontal: 5
    },
    diaryButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    dateText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    mealSection: {
        marginBottom: 10,
        paddingHorizontal: 25
    },
    mealTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    mealItem: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: "#fff",
        paddingTop: 25,
        paddingBottom: 15,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    mealItemText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    addButton: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#5EBD2F',
        borderRadius: 5,
        width: "100%",
        alignItems: "center"
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    }
});

export default Diary;
