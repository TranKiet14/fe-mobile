import { useEffect, useState } from 'react';
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
function AddCooking({ navigation, route }) {
    const [name, setName] = useState();
    const [error, setError] = useState();
    
    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <Text style={styles.header}>Nhập tên công thức</Text>

                        {error ? (
                            <View>
                                <TextInput placeholder="Ví dụ: Phở" style={styles.textInputError} value={name} onChangeText={setName} />
                                <Text style={{ color: "red" }}>Xin hãy nhập 1 giá trị</Text>
                            </View>
                        ) : (
                            <TextInput placeholder="Ví dụ: Phở" style={styles.textInput} value={name} onChangeText={setName} />
                        )}
                        <View style={styles.btnContainer}>
                            <Button title="Tiếp theo" onPress={() => {
                                if (!name) {
                                    setError("Xin hãy nhập 1 giá trị")
                                } else {
                                    navigation.navigate("SelectIngredients", {
                                        name: name
                                    })
                                }
                            }} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    )
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
        fontSize: 36,
        marginBottom: 48,
    },
    textInput: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
    },
    textInputError: {
        height: 40,
        borderColor: 'red',
        borderBottomWidth: 1,
    },
    btnContainer: {
        backgroundColor: 'white',
        marginTop: 12,
    },
});
export default AddCooking