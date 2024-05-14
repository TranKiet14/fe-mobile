import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Diary from './screens/Diary';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './screens/Profile';
import Charts from './screens/Charts';
import { AntDesign, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import AddFood from './screens/AddFood';
import FoodDetail from './screens/FoodDetail';
import Login from './screens/Login';
import Register from './screens/Register';
import Cooking from './screens/Cooking'
import AddCooking from './screens/AddCooking';
import SelectIngredients from './screens/SelectIngredients';
import AddIngredients from './screens/AddIngredients';
import IngredientsDetail from './screens/IngredientsDetail';
import CookingDetail from './screens/CookingDetail';
import CookingManager from './screens/CookingManager';
import AddMeal from './screens/AddMeal';
import Meal from './screens/Meal';
import CreateIngredients from "./screens/CreateIngredients"
import EditCooking from './screens/EditCooking';
import EditIngredientsInCooking from './screens/EditIngredientsInCooking';
import EditIngredient from './screens/EditIngredient';

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  function MyTabs() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}  >
        <Tab.Screen name="Diary" options={{
          title: "Sổ nhật ký",
          tabBarIcon: () => <AntDesign name="filetext1" size={28} color="black" />
        }} component={Diary} />
        <Tab.Screen name="Cooking" options={{
          title: "Công thức nấu ăn",
          tabBarIcon: () => <Ionicons name="fast-food-outline" size={28} color="black" />,
        }} component={Cooking} />
        <Tab.Screen name="Add" options={{
          title: "",
          tabBarIcon: () => <Image style={{ width: 60, height: 60 }}
            source={{ uri: "https://cdn-icons-png.freepik.com/512/738/738882.png" }}
          />,
          tabBarIconStyle: {
            position: "relative",
            top: -40
          },
          tabBarItemStyle: {
            width: 100,
            height: 100
          },
          tabBarLabelStyle: {
            display: 'none'
          }
        }} component={AddMeal} />
        <Tab.Screen name="Charts" options={{
          title: "Báo cáo",
          tabBarIcon: () => <AntDesign name="barschart" size={28} color="black" />
        }} component={Charts} />
        <Tab.Screen name="Profile" options={{
          title: "Hồ sơ",
          tabBarIcon: () => <AntDesign name="user" size={28} color="black" />
        }} component={Profile} />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Mytabs" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Mytabs" component={MyTabs} />
        <Stack.Screen name="Diary" component={Diary} />
        <Stack.Screen name="AddMeal" component={AddMeal} />
        <Stack.Screen name="Meal" component={Meal} />
        <Stack.Screen name="AddFood" component={AddFood} />
        <Stack.Screen name="FoodDetail" component={FoodDetail} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="AddCooking" component={AddCooking} />
        <Stack.Screen name="SelectIngredients" component={SelectIngredients} />
        <Stack.Screen name="AddIngredients" component={AddIngredients} />
        <Stack.Screen name="IngredientsDetail" component={IngredientsDetail} />
        <Stack.Screen name="CookingDetail" component={CookingDetail} />
        <Stack.Screen name="CookingManager" component={CookingManager} />
        <Stack.Screen name="CreateIngredients" component={CreateIngredients} />
        <Stack.Screen name="EditCooking" component={EditCooking} />
        <Stack.Screen name="EditIngredientsInCooking" component={EditIngredientsInCooking} />
        <Stack.Screen name="EditIngredient" component={EditIngredient} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
