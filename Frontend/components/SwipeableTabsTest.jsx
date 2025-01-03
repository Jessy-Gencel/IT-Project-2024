// SwipeableTabs.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

//deze code is eigenlijk dezelfde logica als de StepCounter maar dan met tabs
const SwipeableTabsTest = ({currentSection, setCurrentSection}) => {
    //i.p.v hier zo een array van steps is het hier gwn een array van de vss tabs
    //heb daar een id aan meegegeven zodat ge later kunt checken of ge op die tab zit gwn
    //door daar te checken of ge op 1 of 2 of 3 zit (gelijk bij zo currentStep == 1)
    const sectionsArray = [
        { id: 1, title: "Profile" },
        { id: 2, title: "Interests" },
        { id: 3, title: "Gateways" },
      ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        {sectionsArray.map((section) => {
            const isActive = section.id <= currentSection; // Determine if section is active

            return (
                <View 
                style= {styles.tabBar} 
                key={section.id}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            isActive && styles.activeTabButton,
                        ]}
                        onPress={() => setCurrentSection(section.id)}
                    >
                        <Text
                            style={[
                                styles.tabButtonText,
                                isActive && styles.activeTabButtonText,
                            ]}
                        >
                            {/* dit is dan om effectief Profile, Gateway en Interest te laten zien
                            aangezien ik da nu in mijn array bijhoud als een titel */}
                            {section.title} 
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        )}
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

export default SwipeableTabsTest;
