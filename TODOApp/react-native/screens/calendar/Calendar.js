import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Colors} from '../../constants/Colors';
const ModalCalendar = (props) => {
  return (
      <Calendar
        onDayPress={(day) => {
          console.log(day);
          props.dayPressed && props.dayPressed(day);
        }}
        theme={{
          textSectionTitleColor: Colors.accent,
          arrowColor: Colors.accent,
          indicatorColor: Colors.accent,
          selectedDayTextColor: Colors.accent,
        }}
      />
  );
};

export default ModalCalendar;
