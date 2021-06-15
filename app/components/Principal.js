import React from 'react';
import { View } from 'react-native';

import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation'

import { Icon } from 'react-native-elements'
import MenuScreen from './Menu'
import ProfileScreen from './Profile'
import SettingsScreen from './Configuraciones'
import Notifications from './Notifications'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.route.params.user, // obtiene el usuario desde props
            activeTab: 'menu_tab',
            navigation: this.props.route.params.navigation
        }
    }

    tabs = [
        {
            key: 'menu_tab',
            icon: 'shopping-basket',
            icon_type: 'font-awesome',
            label: 'Productos',
            barColor: 'black',
            screen: <MenuScreen object={{ "user": this.props.route.params.user, navigation: this.props.route.params.navigation }} />,
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'profile_tab',
            icon: 'face',
            icon_type: 'material-icons',
            label: 'Perfil',
            barColor: 'black',
            screen: <ProfileScreen object={{ "user": this.props.route.params.user }} />,
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'notifications_tab',
            icon: 'notifications',
            icon_type: 'material-icon',
            label: 'Notifications',
            screen: <Notifications object={{ "user": this.props.route.params.user }} />,
            barColor: 'black',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'setting_tab',
            icon: 'player-settings',
            icon_type: 'fontisto',
            label: 'Cuenta',
            screen: <SettingsScreen object={{ "user": this.props.route.params.user, navigation: this.props.route.params.navigation }} />,
            barColor: 'black',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
    ]

    renderIcon = (icon, icon_type) => ({ isActive }) => (
        <Icon size={20} color="lightgray" name={icon} type={icon_type} />
    )

    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon, tab.icon_type)}
        />
    )

    renderScreen = () => {
        return this.state.activeTab == 'menu_tab' && this.tabs[0].screen ||
            this.state.activeTab == 'profile_tab' && this.tabs[1].screen ||
            this.state.activeTab == 'notifications_tab' && this.tabs[2].screen ||
            this.tabs[3].screen
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {this.renderScreen()}
                </View>
                <BottomNavigation
                    activeTab={this.state.activeTab}
                    onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                    renderTab={this.renderTab}
                    tabs={this.tabs}
                />
            </View>
        )
    }
}