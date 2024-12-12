// SwipeableTabs.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

// Create a reusable SwipeableTabs component
const SwipeableTabs = ({ routes, scenes }) => {
  const [index, setIndex] = React.useState(0);

  const initialLayout = { width: Dimensions.get('window').width };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap(scenes)}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={() => (
          <View style={styles.tabBar}>
            {routes.map((route, idx) => (
              <TouchableOpacity
                key={route.key}
                style={[
                  styles.tabButton,
                  idx === index && styles.activeTabButton,
                ]}
                onPress={() => setIndex(idx)}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    idx === index && styles.activeTabButtonText,
                  ]}
                >
                  {route.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tabButton: {
    padding: 10,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#F7931E', // Active color (orange for example)
  },
  tabButtonText: {
    color: '#000',
    fontSize: 16,
  },
  activeTabButtonText: {
    fontWeight: 'bold',
    color: '#F7931E', // Active tab text color
  },
});

export default SwipeableTabs;
