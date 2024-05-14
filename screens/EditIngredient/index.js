import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    View,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Button,
    Keyboard,
} from 'react-native';
import { editIngredients } from '../../service/ingredientsService';

function EditIngredient({ navigation, route }) {
    const { name, ingredient } = route.params
    const [nameIngredient, setNameIngredient] = useState(ingredient?.name);
    const [calories, setCalories] = useState(ingredient?.caloriesPerUnit);
    const [quantitative, setQuantitative] = useState(ingredient?.amount);
    const [protein, setProtein] = useState(ingredient?.proteinPerUnit);
    const [carbonhydrate, setCarbonhydrate] = useState(ingredient?.carbonhydratePerUnit);
    const [fiber, setFiber] = useState(ingredient?.fiberPerUnit);
    const [fat, setFat] = useState(ingredient?.fatPerUnit);
    const [error, setError] = useState();
    const [disable, setDisable] = useState(false)
    const handleSubmit = async () => {
        if (!nameIngredient || !calories || !quantitative) {
            setError('Vui lòng điền đầy đủ thông tin');
        } else {
            setDisable(true)
            let user
            try {
                const jsonValue = await AsyncStorage.getItem('userData');
                user = JSON.parse(jsonValue)
            } catch (error) {
                console.log(error)
            }
            const res = await editIngredients(ingredient._id, {
                name: nameIngredient,
                unit: "gram",
                thumbnail: "https://i.pinimg.com/736x/b6/f5/36/b6f53678f81da805bba3f6027c860ade.jpg",
                amount: quantitative,
                caloriesPerUnit: calories,
                proteinPerUnit: protein,
                fatPerUnit: fat,
                carbonhydratePerUnit: carbonhydrate,
                fiberPerUnit: fiber,
                createdBy: user._id
            })
            if (res.code === 200) {
                navigation.navigate('SelectIngredients', {
                    name: name,
                    message: "edit-success"
                });
            }
        }
    }
    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <Text style={styles.header}>Nhập thông tin nguyên liệu</Text>
                        {(error && !nameIngredient) ? (
                            <TextInput
                                placeholder="Tên nguyên liệu"
                                style={styles.textInputError}
                                value={nameIngredient}
                                defaultValue={nameIngredient && nameIngredient.toString()}
                                onChangeText={setNameIngredient}
                            />
                        ) : (
                            <TextInput
                                placeholder="Tên nguyên liệu"
                                style={styles.textInput}
                                value={nameIngredient}
                                defaultValue={nameIngredient && nameIngredient.toString()}
                                onChangeText={setNameIngredient}
                            />
                        )}
                        {(error && !quantitative) ? (
                            <TextInput
                                placeholder="Định lượng (gram)"
                                keyboardType="numeric"
                                style={styles.textInputError}
                                value={quantitative}
                                defaultValue={quantitative && quantitative.toString()}
                                onChangeText={setQuantitative}
                            />
                        ) : (
                            <TextInput
                                placeholder="Định lượng (gram)"
                                keyboardType="numeric"
                                style={styles.textInput}
                                value={quantitative}
                                defaultValue={quantitative && quantitative.toString()}
                                onChangeText={setQuantitative}
                            />
                        )}

                        {(error && !calories) ? (
                            <TextInput
                                placeholder="Số calo"
                                keyboardType="numeric"
                                style={styles.textInputError}
                                value={calories}
                                defaultValue={calories && calories.toString()}
                                onChangeText={setCalories}
                            />
                        ) : (
                            <TextInput
                                placeholder="Số calo"
                                keyboardType="numeric"
                                style={styles.textInput}
                                value={calories}
                                defaultValue={calories && calories.toString()}
                                onChangeText={setCalories}
                            />
                        )}


                        <TextInput
                            placeholder="Protein"
                            keyboardType="numeric"
                            style={styles.textInput}
                            value={protein}
                            defaultValue={protein && protein.toString()}
                            onChangeText={setProtein}
                        />

                        <TextInput
                            placeholder="Carbonhydrate"
                            keyboardType="numeric"
                            style={styles.textInput}
                            value={carbonhydrate}
                            defaultValue={carbonhydrate && carbonhydrate.toString()}
                            onChangeText={setCarbonhydrate}
                        />

                        <TextInput
                            placeholder="Chất xơ"
                            keyboardType="numeric"
                            style={styles.textInput}
                            value={fiber}
                            defaultValue={fiber && fiber.toString()}
                            onChangeText={setFiber}
                        />

                        <TextInput
                            placeholder="Chất béo"
                            keyboardType="numeric"
                            style={styles.textInput}
                            value={fat}
                            onChangeText={setFat}
                        />


                        {error ? (
                            <View>
                                <Text style={{ color: 'red' }}>{error}</Text>
                            </View>
                        ) : null}

                        <View style={styles.btnContainer}>
                            <Button
                                title="Sửa"
                                onPress={handleSubmit}
                                disabled={disable}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'space-around',
    },
    header: {
        fontSize: 28,
        marginTop: 10
    },
    textInput: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    textInputError: {
        height: 40,
        borderColor: 'red',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    btnContainer: {
        backgroundColor: 'white',
        marginTop: 12,
    },
});

export default EditIngredient;
