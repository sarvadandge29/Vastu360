import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function CustomerDrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerTitle: 'Menu',
        headerStyle: {
          backgroundColor: '#112D4E',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        drawerStyle: {
          backgroundColor: '#112D4E',
        },
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#B0C4DE',
        headerLeft: (props) => (
          <DrawerToggleButton {...props} tintColor="#fff" />
        ),
      }}
    >
      <Drawer.Screen
        name="(customerTabs)"
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen
        name='(settings)'
        options={{ drawerLabel: 'Settings' }}
      />
    </Drawer>
  );
}
