import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {OutlinedTextField} from 'react-native-material-textfield';
import {Colors, textColors} from '../../constants/Colors';
import {MarginConstants} from '../../constants/styles/margin.constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {PaddingConstants} from '../../constants/styles/padding.constants';
import employeeList from './employeeList';
import EmployeeRow from './employeeRow/EmployeeRow';
const AssignEmployee = (props) => {
  let renderSearchIcon = () => {
    return (
      <Icon
        style={{
          position: 'absolute',
          top: MarginConstants.tab2,
          right: MarginConstants.halfTab,
        }}
        name={'search'}
        size={30}
        color={Colors.darkGrey}
        onPress={() => {}}
      />
    );
  };
  let renderSearchBar = () => {
    return (
      <View>
        <OutlinedTextField
          underlineColorAndroid="transparent"
          autoCapitalize={'none'}
          label="Search members"
          inputContainerStyle={{paddingRight: PaddingConstants.tab3 * 1.5}}
          tintColor={Colors.accent}
          onSubmitEditing={() => {}}
        />
        {renderSearchIcon()}
      </View>
    );
  };

  let renderRow = (row) => {
    return (
      <EmployeeRow
        isSelected={row.item.isSelected}
        name={row.item.name}
        image={row.item.image}
        position={row.item.position}
      />
    );
  };
  let renderFlatList = () => {
    return (
      <FlatList
        data={employeeList}
        keyExtractor={(item) => item.id}
        renderItem={renderRow}
        onEndReachedThreshold={0.01}
      />
    );
  };

  let renderAssignButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          let assignedEmp = employeeList.filter(
            (item) => item.isSelected === true,
          );
          props.navigation.navigate('createTask', {
            assignedEmployee: assignedEmp,
          });
        }}>
        <View
          style={{
            backgroundColor: Colors.accent,
            height: MarginConstants.tab4 * 1.5,
            alignItems: 'center',
            justifyContent: 'center',
            margin: MarginConstants.tab1,
          }}>
          <Text style={{color: Colors.white, fontSize: 14, fontWeight: 'bold'}}>
            Assign
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderSearchBar()}
      {renderFlatList()}
      {renderAssignButton()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, margin: MarginConstants.tab2},
  text: {
    color: textColors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: MarginConstants.tab2,
  },
});
export default AssignEmployee;
