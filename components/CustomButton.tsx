import React from 'react';
import { Button } from 'react-native';

// 🔹 Type des props
type Props = {
  onPress: () => void;
};

const CustomButton: React.FC<Props> = (props) => {
  return (
    <Button
      title="ADD PRODUCT"
      onPress={props.onPress}
    />
  );
};

export default CustomButton;