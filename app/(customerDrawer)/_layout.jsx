import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function Layout() {
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
      name='resetPassword'
      options={{ drawerLabel: 'Reset Password' }}
      />
      <Drawer.Screen
      name='changePassword'
      options={{ drawerLabel: 'Change Password' }}
      />
    </Drawer>
  );
}
