import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AccountTab from './tabs/AccountTab';
import CartTab from './tabs/CartTab';
import HomeTab from './tabs/HomeTab';
import NotificationsTab from './tabs/NotificationsTab';
import SuggestionsTab from './tabs/SuggestionsTab';

export type TabType = 'home' | 'account' | 'suggestions' | 'notifications' | 'cart';

interface BotTabsProps {
  activeTab?: TabType;
  onTabPress?: (tab: TabType) => void;
}

const BotTabs: React.FC<BotTabsProps> = ({ 
  activeTab = 'home', 
  onTabPress 
}) => {
  const insets = useSafeAreaInsets();
  const [currentTab, setCurrentTab] = useState<TabType>(activeTab);

  const handleTabPress = (tab: TabType) => {
    setCurrentTab(tab);
    onTabPress?.(tab);
  };

  return (
    <SafeAreaView 
      style={[
        styles.container, 
        { paddingBottom: insets.bottom || 0 }
      ]}
    >
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress('home')}
          activeOpacity={0.7}
        >
          <HomeTab isActive={currentTab === 'home'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress('account')}
          activeOpacity={0.7}
        >
          <AccountTab isActive={currentTab === 'account'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress('suggestions')}
          activeOpacity={0.7}
        >
          <SuggestionsTab isActive={currentTab === 'suggestions'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress('notifications')}
          activeOpacity={0.7}
        >
          <NotificationsTab isActive={currentTab === 'notifications'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress('cart')}
          activeOpacity={0.7}
        >
          <CartTab isActive={currentTab === 'cart'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 8,
    paddingVertical: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BotTabs;
