import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {Colors, textColors} from '../../constants/Colors';
import {MarginConstants} from '../../constants/styles/margin.constants';
import {OutlinedTextField} from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {PaddingConstants} from '../../constants/styles/padding.constants';
import ModalCalendar from '../calendar/Calendar';
import DocumentPicker from 'react-native-document-picker';
const CreateTask = (props) => {
  const fieldRef = React.createRef();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(moment(new Date()).format('DD.MM.yy'));
  const [openCalendar, setOpenCalendar] = useState(false);
  const [desText, setDescriptiontext] = useState('');
  const [docName, setDocName] = useState(undefined);
  let employeeList = props.route.params
    ? props.route.params.assignedEmployee
    : undefined;
  // OnPress Methods
  let showDocumentPicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setDocName(res.name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  // RENDER METHODS
  let renderTitleTextField = () => {
    return (
      <OutlinedTextField
        underlineColorAndroid="transparent"
        autoCapitalize={'none'}
        label="Title"
        tintColor={Colors.accent}
        ref={fieldRef}
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
    );
  };

  let renderCalendar = () => {
    return (
      <View>
        <OutlinedTextField
          underlineColorAndroid="transparent"
          autoCapitalize={'none'}
          label="Due date"
          defaultValue={dueDate}
          tintColor={Colors.accent}
          editable={false}
        />
        {renderCalendarIcon()}
      </View>
    );
  };

  let renderCalendarIcon = () => {
    return (
      <Icon
        style={styles.calendarIcon}
        name={'date-range'}
        size={25}
        color={Colors.darkGrey}
        onPress={() => {
          setOpenCalendar(!openCalendar);
        }}
      />
    );
  };

  let renderAssignButton = () => {
    return (
      <View style={styles.assignContainer}>
        <Text style={styles.text}>Employee</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('assignEmployee');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon color={Colors.accent} size={25} name={'add'} />
            <Text style={styles.assignText}>Assign</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  let renderCalendarSelector = () => {
    return (
      <ModalCalendar
        showCalendar={false}
        dayPressed={(day) => {
          setDueDate(day.dateString);
          setOpenCalendar(false);
        }}
      />
    );
  };

  let renderDescription = () => {
    let text = desText.length + '' + '/' + '500';
    return (
      <View>
        <Text style={styles.text}>Description</Text>
        <OutlinedTextField
          inputContainerStyle={{height: MarginConstants.tab4 * 4}}
          multiline={true}
          underlineColorAndroid="transparent"
          autoCapitalize={'none'}
          label="Text"
          tintColor={Colors.accent}
          maxLength={500}
          onChangeText={(text) => {
            setDescriptiontext(text);
          }}
        />
        <Text style={styles.descriptiontext}>{text}</Text>
      </View>
    );
  };

  let renderAttachment = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.text}>Attachment</Text>
        <TouchableOpacity
          onPress={() => {
            showDocumentPicker().then(() => {});
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name={'attach-file'} size={25} color={Colors.accent} />
            <Text
              style={[
                styles.text,
                {color: Colors.accent, marginLeft: MarginConstants.halfTab},
              ]}>
              Add
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  let renderCreateTaskButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (checkValidations()) {
            props.navigation.navigate('TaskCompleted', {
              title: title,
              description: desText,
              date: dueDate,
              docName: docName,
            });
          }
        }}>
        <View style={styles.createTaskContainer}>
          <Text style={styles.createTaskText}>Create Task</Text>
        </View>
      </TouchableOpacity>
    );
  };

  let renderDocName = () => {
    return (
      <View style={styles.docContainer}>
        <Icon name={'attach-file'} size={25} color={Colors.accent} />
        <Text style={styles.docText}>{docName}</Text>
        <Icon
          name={'delete'}
          size={25}
          color={Colors.red}
          onPress={() => {
            setDocName(undefined);
          }}
        />
      </View>
    );
  };

  let renderSelectedEmployyee = () => {
    let contents = employeeList.map(function (item) {
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
      <View>
        <Text style={styles.text}>Employee</Text>
        <View style={{flexDirection: 'row'}}>
          {contents}
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('assignEmployee');
            }}
            style={{
              marginVertical: MarginConstants.halfTab,
              marginHorizontal: MarginConstants.halfTab * 0.5,
            }}>
            <Icon name={'add-circle'} size={24} color={Colors.accent} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const showErrorMessage = (validation) => {
    showMessage({
      message: validation,
      type: 'danger',
      icon: 'auto',
      backgroundColor: Colors.red,
      color: Colors.white, // text color
    });
  };
  let checkValidations = () => {
    if (title.length === 0) {
      showErrorMessage('Please enter Title.');
      return false;
    }
    if (desText.length === 0) {
      showErrorMessage('Please enter Description.');
      return false;
    }
    if (docName === undefined) {
      showErrorMessage('Please attach Document');
      return false;
    }
    return true;
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardDismissMode={'on-drag'}
      keyboardShouldPersistTaps={'never'}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>Summary</Text>
          {renderTitleTextField()}
          {renderCalendar()}
          {openCalendar && renderCalendarSelector()}
          {employeeList ? renderSelectedEmployyee() : renderAssignButton()}
          {renderDescription()}
          {renderAttachment()}
          {docName && renderDocName()}
        </View>
        <View style={styles.taskButtonContainer}>
          {renderCreateTaskButton()}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, margin: MarginConstants.tab2},
  scrollContainer: {flexGrow: 1},
  innerContainer: {flex: 0.9},
  taskButtonContainer: {flex: 0.1},
  docText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  docContainer: {
    borderColor: Colors.darkGrey,
    borderWidth: 1.0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: PaddingConstants.tab1,
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
  calendarIcon: {
    position: 'absolute',
    top: MarginConstants.tab2,
    right: MarginConstants.halfTab,
  },
});
export default CreateTask;
