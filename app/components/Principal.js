import React from 'react';
import { View } from 'react-native';

import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation'

import { Icon } from 'react-native-elements'
import MenuScreen from './Menu'
import ProfileScreen from './Perfil'
import SettingsScreen from './Configuraciones'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'menu_tab'
        }
    }

    tabs = [
        {
            key: 'menu_tab',
            icon: 'menu',
            label: 'Menu',
            barColor: '#388E3C',
            screen: <MenuScreen navigation={this.props.navigation} />,
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'profile_tab',
            icon: 'menu',
            label: 'Perfil',
            barColor: '#B71C1C',
            screen: <ProfileScreen navigation={this.props.navigation} />,
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'setting_tab',
            icon: 'settings',
            label: 'Opciones',
            screen: <SettingsScreen navigation={this.props.navigation} />,
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
    ]

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )

    renderScreen = () => {
        return this.state.activeTab == 'menu_tab' && this.tabs[0].screen ||
            this.state.activeTab == 'profile_tab' && this.tabs[1].screen ||
            this.tabs[2].screen
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