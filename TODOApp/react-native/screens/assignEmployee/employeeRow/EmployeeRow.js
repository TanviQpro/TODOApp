import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, textColors} from '../../../constants/Colors';
import {MarginConstants} from '../../../constants/styles/margin.constants';

const EmployeeRow = (props) => {
  let renderSelectedIcon = () => {
    return (
      <Icon
        style={{
          position: 'absolute',
          top: MarginConstants.tab1 * 1.5,
          right: 0,
        }}
        name={'check-circle'}
        size={20}
        color={Colors.accent}
        onPress={() => {}}
      />
    );
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: MarginConstants.tab4 * 2,
      }}>
      <View style={{marginRight: MarginConstants.halfTab}}>
        <Icon name={props.image} size={25} color={Colors.secondary} />
        {props.isSelected && renderSelectedIcon()}
      </View>
      <View style={{}}>
        <Text
          style={{
            color: textColors.secondary,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {props.name}
        </Text>
        {props.position !== '' && (
          <Text
            style={{
              color: textColors.secondary,
              fontSize: 14,
            }}>
            {props.position}
          </Text>
        )}
      </View>
    </View>
  );
};
export default EmployeeRow;
