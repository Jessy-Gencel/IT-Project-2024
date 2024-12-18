import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const CustomSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: '#767577', true: '#FBB03B' }}
        thumbColor={isEnabled ? '#F7931E' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
      <Text style={styles.text}>{isEnabled ? 'Public' : 'Private'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], // Make the switch larger
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5F63E2',
  },
});

export default CustomSwitch;
