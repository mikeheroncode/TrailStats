import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Switch,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from './Colors';
import { useEvent } from '../hooks/useEvent';

export const RecordEvent = () => {
  const { startEvent, endEvent, updateEvent, newEvent } = useEvent();

  const [dateForPicker, setDateForPicker] = useState(new Date());

  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [eventStarted, setEventStarted] = useState<boolean>(false);
  const [eventEnded, setEventEnded] = useState<boolean>(false);
  const [isStartTime, setIsStartTime] = useState<boolean>(false);
  const [eventName, setEventName] = useState<string>('');
  const [mode, setMode] = useState<'date' | 'time' | undefined>('date');
  const [show, setShow] = useState(false);

  const [updateLastEvent, setUpdateLastEvent] = useState<boolean>(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateForPicker;
    setShow(false);

    if (isStartTime) {
      setEventStartDate(currentDate);
    } else {
      setEventEndDate(currentDate);
    }

    setDateForPicker(currentDate);
  };

  const showDatetimePicker = (
    modeForPicker: 'date' | 'time' | undefined,
    dateForPickerValue: Date,
    forStartTime: boolean,
  ) => {
    setDateForPicker(dateForPickerValue);
    setIsStartTime(forStartTime);
    setShow(true);
    setMode(modeForPicker);
  };

  const onPressStartEvent = () => {
    setEventStarted(true);
    setEventStartDate(new Date());
    startEvent(eventName, eventStartDate.getTime());
  };

  const onPressEndEvent = () => {
    setEventEnded(true);
    setEventEndDate(new Date());
    endEvent(eventName, eventStartDate.getTime(), eventEndDate.getTime());
  };

  const onPressNewEvent = () => {
    setEventStarted(false);
    setEventEnded(false);
    setEventName('');
    newEvent();
  };

  return (
    <View style={styles.homeScreen}>
      <View style={styles.switchUIContainer}>
        <View style={styles.currentWeightTextContainer}>
          <Text style={styles.labelText}>Event Name</Text>
          <TextInput
            style={styles.smallTextInput}
            value={eventName}
            onChangeText={(newValue) => {
              setEventName(newValue);
            }}
            selectTextOnFocus={true}
          />
        </View>
      </View>
      <Pressable
        onPress={() => {
          onPressStartEvent();
        }}
        style={eventStarted ? { display: 'none' } : styles.saveSettingsButton}>
        <Text style={styles.recordButtonText}> Start Event </Text>
      </Pressable>
      <View
        style={
          eventStarted ? styles.unselectedDateUIContainer : { display: 'none' }
        }>
        <Pressable onPress={() => {}}>
          <Text style={styles.labelText}>Event Start</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker('date', eventStartDate, true);
          }}>
          <Text style={styles.labelText}>{`${
            eventStartDate.getMonth() + 1
          }/${eventStartDate.getDate()}`}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker('time', eventStartDate, true);
          }}>
          <Text
            style={
              styles.labelText
            }>{`${eventStartDate.getHours()}:${eventStartDate.getMinutes()}`}</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => {
          onPressEndEvent();
        }}
        style={
          eventStarted && !eventEnded
            ? styles.saveSettingsButton
            : { display: 'none' }
        }>
        <Text style={styles.recordButtonText}> End Event </Text>
      </Pressable>
      <View
        style={
          eventEnded ? styles.unselectedDateUIContainer : { display: 'none' }
        }>
        <Pressable onPress={() => {}}>
          <Text style={styles.labelText}>Event End</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker('date', eventEndDate, false);
          }}>
          <Text style={styles.labelText}>{`${
            eventEndDate.getMonth() + 1
          }/${eventEndDate.getDate()}`}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker('time', eventEndDate, false);
          }}>
          <Text
            style={
              styles.labelText
            }>{`${eventEndDate.getHours()}:${eventEndDate.getMinutes()}`}</Text>
        </Pressable>
      </View>
      <View
        style={
          eventStarted && eventEnded
            ? styles.unselectedDateUIContainer
            : { display: 'none' }
        }>
        <Pressable
          style={styles.saveSettingsButton}
          onPress={() => onPressNewEvent()}>
          <Text style={styles.labelText}>New Event</Text>
        </Pressable>
        <Pressable
          style={styles.saveSettingsButton}
          onPress={() => {
            updateEvent(
              eventName,
              eventStartDate.getTime(),
              eventEndDate.getTime(),
            );
          }}>
          <Text style={styles.labelText}>Update Event</Text>
        </Pressable>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateForPicker}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: Colors.green,
    flex: 1,
    paddingTop: 25,
    alignItems: 'center',
  },
  homeButtonText: {
    color: Colors.white,
    fontSize: 20,
  },
  unselectedDateUIContainer: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedDateUIContainer: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blue,
  },
  switchUIContainer: {
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderUIContainer: {
    marginVertical: 30,
  },
  currentWeightTextContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  labelText: {
    color: Colors.white,
    fontSize: 25,
    marginRight: 25,
  },
  selectedLabelText: {
    color: Colors.blue,
    fontSize: 25,
    marginRight: 25,
  },
  recordButtonText: {
    color: Colors.white,
    fontSize: 25,
  },
  saveSettingsButton: {
    width: '40%',
    backgroundColor: Colors.blue,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    marginHorizontal: 15,
  },
  editItemForm: {
    backgroundColor: Colors.purple,
    width: '85%',
    padding: 10,
    margin: 10,
  },
  editItemLabels: {
    color: Colors.white,
    fontSize: 20,
  },
  currentWeightTextInput: {
    backgroundColor: Colors.purpleLight,
    height: 40,
    width: 60,
    borderColor: 'gray',
    borderWidth: 1,
    color: Colors.white,
    marginTop: 5,
  },
  smallTextInput: {
    backgroundColor: Colors.purpleLight,
    height: 40,
    width: 170,
    borderColor: 'gray',
    borderWidth: 1,
    color: Colors.white,
    marginTop: 5,
  },
});
