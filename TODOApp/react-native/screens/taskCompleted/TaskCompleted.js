import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, textColors} from '../../constants/Colors';
import {MarginConstants} from '../../constants/styles/margin.constants';
import {PaddingConstants} from '../../constants/styles/padding.constants';
import employeeList from '../assignEmployee/employeeList';
import Icon from 'react-native-vector-icons/MaterialIcons';
const TaskCompleted = (props) => {
  let assignEmployeeList = employeeList.filter(
    (item) => item.isSelected === true,
  );
  let completedTaskObject = {
    title: props.route.params.title,
    description: props.route.params.description,
    date: props.route.params.date,
    docName: props.route.params.docName,
  };

  let renderCreateTaskButton = () => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.createTaskContainer}>
          <Text style={styles.createTaskText}>Close Task</Text>
        </View>
      </TouchableOpacity>
    );
  };

  let renderSelectedEmployyee = () => {
    let contents = assignEmployeeList.map(function (item) {
      return (
        <View
          style={{
            borderRadius: 12,
            marginVertical: MarginConstants.halfTab,
            marginHorizontal: MarginConstants.halfTab * 0.5,
          }}>
          <Icon name={item.image} size={24} color={Colors.secondary} />
        </View>
      );
    });
    return (
      <View style={{marginBottom: MarginConstants.tab2}}>
        <Text style={styles.smallText}>Assignees</Text>
        <View style={{flexDirection: 'row'}}>{contents}</View>
      </View>
    );
  };

  let renderCalendarAndDueDate = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: MarginConstants.tab2}}>
        <Icon name={'date-range'} size={25} color={Colors.primary} />
        <Text style={styles.dateText}>{completedTaskObject.date}</Text>
      </View>
    );
  };

  let renderDescription = () => {
    return (
      <View style={{marginBottom: MarginConstants.tab2}}>
        <Text style={styles.smallText}>Description</Text>
        <Text style={styles.dateText}>{completedTaskObject.description}</Text>
      </View>
    );
  };

  let renderDocName = () => {
    return (
      <View style={styles.docContainer}>
        <Icon name={'attach-file'} size={25} color={Colors.black} />
        <Text style={styles.docText}>{completedTaskObject.docName}</Text>
      </View>
    );
  };

  let renderAttachment = () => {
    return (
      <View>
        <Text style={styles.smallText}>Attachment</Text>
        {renderDocName()}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>{completedTaskObject.title}</Text>
        {renderSelectedEmployyee()}
        {renderCalendarAndDueDate()}
        {renderDescription()}
        {renderAttachment()}
      </View>
      <View style={styles.taskButtonContainer}>{renderCreateTaskButton()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, margin: MarginConstants.tab2},
  scrollContainer: {flexGrow: 1},
  innerContainer: {flex: 0.9},
  taskButtonContainer: {flex: 0.1, marginBottom: MarginConstants.tab4},
  dateText: {
    marginLeft: MarginConstants.halfTab,
    color: Colors.primary,
    fontSize: 14,
  },
  docText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  docContainer: {
    borderColor: Colors.darkGrey,
    borderWidth: 1.0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: PaddingConstants.tab1,
  },
  smallText: {
    color: textColors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: MarginConstants.tab2,
  },
  text: {
    color: textColors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: MarginConstants.tab2,
  },
  createTaskText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  createTaskContainer: {
    marginTop: MarginConstants.tab4,
    height: MarginConstants.tab4 * 1.5,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptiontext: {
    position: 'absolute',
    top: MarginConstants.tab2,
    right: MarginConstants.halfTab,
  },
  assignText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  assignContainer: {
    flexDirection: 'row',
    paddingVertical: PaddingConstants.tab2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default TaskCompleted;
