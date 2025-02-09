import React, { useRef, useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { faker } from '@faker-js/faker';
import Card from './Card';
import PropTypes from 'prop-types';

const HomeScreen = () => {
  const [isFrozen, setIsFrozen] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    if (isFrozen) {
      animationRef.current?.play();
    } else {
      animationRef.current?.reset();
    }
  }, [isFrozen]);

  const cardDetails = {
    name: faker.name.fullName(),
    number: faker.finance.creditCardNumber(),
  };

  const handlePress = () => {
    setIsFrozen(!isFrozen);
  };

  return (
    <View style={styles.container}>
      <Card details={cardDetails} isFrozen={isFrozen} />
      <LottieView
        ref={animationRef}
        source={require('./freeze.json')}
        autoPlay={false}
        loop={false}
        style={{ width: 200, height: 200 }}
      />
      <FreezeButton isFrozen={isFrozen} onPress={handlePress} />
    </View>
  );
};

const FreezeButton = ({ isFrozen, onPress }) => (
  <Button
    title={isFrozen ? 'Unfreeze' : 'Freeze'}
    onPress={onPress}
  />
);

FreezeButton.propTypes = {
  isFrozen: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;