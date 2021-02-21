import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from './Colors';
import { useCampEvent } from '../hooks/useCampEvent';

enum PickerToUse {
  MadeCampAt = 1,
  AteDinnerAt = 2,
  WentToSleepAt = 3,
  SetAlarmFor = 4,
  GotUpAt = 5,
  LeftCampAt = 6,
}

export const RecordCampEvent = () => {
  const {
    getLastCampEvent,
    addCampEvent,
    updateCampEvent,
    defaultCampEvent,
  } = useCampEvent();

  const [dateForPicker, setDateForPicker] = useState(new Date());

  const [campAtDate, setCampAtDate] = useState(new Date());
  const [updateCampAt, setUpdateCampAt] = useState<boolean>(false);
  const [ateDinnerDate, setAteDinnerDate] = useState(new Date());
  const [updateAteDinner, setUpdateAteDinner] = useState<boolean>(false);
  const [wentToSleepDate, setWentToSleepDate] = useState(new Date());
  const [updateWentToSleep, setUpdateWentToSleep] = useState<boolean>(false);
  const [alarmForDate, setAlarmForDate] = useState(new Date());
  const [updateAlarmFor, setUpdateAlarmFor] = useState<boolean>(false);
  const [gotUpDate, setGotUpDate] = useState(new Date());
  const [updateGotUp, setUpdateGotUp] = useState<boolean>(false);
  const [leftCampDate, setLeftCampDate] = useState(new Date());
  const [updateLeftCamp, setUpdateLeftCamp] = useState<boolean>(false);
  const [mode, setMode] = useState<'date' | 'time' | undefined>('date');
  const [show, setShow] = useState(false);
  const [pickerToUse, setPickerToUse] = useState<PickerToUse>(
    PickerToUse.MadeCampAt,
  );

  const [updateLastEvent, setUpdateLastEvent] = useState<boolean>(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateForPicker;
    setShow(false);
    setDateForPicker(currentDate);
    switch (pickerToUse) {
      case PickerToUse.MadeCampAt:
        setCampAtDate(currentDate);
        setUpdateCampAt(true);
        break;
      case PickerToUse.AteDinnerAt:
        setAteDinnerDate(currentDate);
        setUpdateAteDinner(true);
        break;
      case PickerToUse.WentToSleepAt:
        setWentToSleepDate(currentDate);
        setUpdateWentToSleep(true);
        break;
      case PickerToUse.SetAlarmFor:
        setAlarmForDate(currentDate);
        setUpdateAlarmFor(true);
        break;
      case PickerToUse.GotUpAt:
        setGotUpDate(currentDate);
        setUpdateGotUp(true);
        break;
      case PickerToUse.LeftCampAt:
        setLeftCampDate(currentDate);
        setUpdateLeftCamp(true);
        break;
    }
    setDateForPicker(currentDate);
  };

  const showDatetimePicker = (
    modeForPicker: 'date' | 'time' | undefined,
    dateForPickerValue: Date,
    pickerType: PickerToUse,
  ) => {
    setDateForPicker(dateForPickerValue);
    setPickerToUse(pickerType);
    setShow(true);
    setMode(modeForPicker);
  };

  const recordCampEvent = async () => {
    const lastCampEvent = await getLastCampEvent();
    console.log(JSON.stringify(lastCampEvent));
    let {
      madeCampAt,
      ateDinnerAt,
      wentToSleepAt,
      setAlarmFor,
      gotUpAt,
      leftCampAt,
      description,
    } = updateLastEvent ? lastCampEvent : defaultCampEvent;
    console.log(madeCampAt);
    madeCampAt = updateCampAt ? campAtDate.getTime() : madeCampAt;
    ateDinnerAt = updateAteDinner ? ateDinnerDate.getTime() : ateDinnerAt;
    wentToSleepAt = updateWentToSleep
      ? wentToSleepDate.getTime()
      : wentToSleepAt;
    setAlarmFor = updateAlarmFor ? alarmForDate.getTime() : setAlarmFor;
    gotUpAt = updateGotUp ? gotUpDate.getTime() : gotUpAt;
    leftCampAt = updateLeftCamp ? leftCampDate.getTime() : leftCampAt;
    description = '';
    if (!updateLastEvent) {
      addCampEvent(
        madeCampAt,
        ateDinnerAt,
        wentToSleepAt,
        setAlarmFor,
        gotUpAt,
        leftCampAt,
        description,
      );
    } else {
      updateCampEvent(
        lastCampEvent.campEvent_id,
        madeCampAt,
        ateDinnerAt,
        wentToSleepAt,
        setAlarmFor,
        gotUpAt,
        leftCampAt,
        description,
      );
    }
  };

  return (
    <View style={styles.homeScreen}>
      <View style={styles.switchUIContainer}>
        <Text style={styles.labelText}>Use Last Camp</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={updateLastEvent ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={setUpdateLastEvent}
          value={updateLastEvent}
          style={{ transform: [{ scaleX: 1.75 }, { scaleY: 1.5 }] }}
        />
      </View>
      <View
        style={
          updateCampAt
            ? styles.selectedDateUIContainer
            : styles.unselectedDateUIContainer
        }>
        <Pressable
          onPress={() => {
            setUpdateCampAt(!updateCampAt);
          }}>
          <Text style={styles.labelText}>Made Camp At</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker('date', campAtDate, PickerToUse.MadeCampAt);
          }}>
          <Text style={styles.labelText}>{`${
            campAtDate.getMonth() + 1
          }/${campAtDate.getDate()}`}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker('time', campAtDate, PickerToUse.MadeCampAt);
          }}>
          <Text
            style={
              styles.labelText
            }>{`${campAtDate.getHours()}:${campAtDate.getMinutes()}`}</Text>
        </Pressable>
      </View>
      <View
        style={
          updateAteDinner
            ? styles.selectedDateUIContainer
            : styles.unselectedDateUIContainer
        }>
        <Pressable
          onPress={() => {
            setUpdateAteDinner(!updateAteDinner);
          }}>
          <Text style={styles.labelText}>Ate Dinner At</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker('date', ateDinnerDate, PickerToUse.AteDinnerAt);
          }}>
          <Text style={styles.labelText}>{`${
            ateDinnerDate.getMonth() + 1
          }/${ateDinnerDate.getDate()}`}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker('time', ateDinnerDate, PickerToUse.AteDinnerAt);
          }}>
          <Text
            style={
              styles.labelText
            }>{`${ateDinnerDate.getHours()}:${ateDinnerDate.getMinutes()}`}</Text>
        </Pressable>
      </View>
      <View
        style={
          updateWentToSleep
            ? styles.selectedDateUIContainer
            : styles.unselectedDateUIContainer
        }>
        <Pressable
          onPress={() => {
            setUpdateWentToSleep(!updateWentToSleep);
          }}>
          <Text style={styles.labelText}>Went To Bed At</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker(
              'date',
              wentToSleepDate,
              PickerToUse.WentToSleepAt,
            );
          }}>
          <Text style={styles.labelText}>{`${
            wentToSleepDate.getMonth() + 1
          }/${wentToSleepDate.getDate()}`}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker(
              'time',
              wentToSleepDate,
              PickerToUse.WentToSleepAt,
            );
          }}>
          <Text
            style={
              styles.labelText
            }>{`${wentToSleepDate.getHours()}:${wentToSleepDate.getMinutes()}`}</Text>
        </Pressable>
      </View>
      <View
        style={
          updateAlarmFor
            ? styles.selectedDateUIContainer
            : styles.unselectedDateUIContainer
        }>
        <Pressable
          onPress={() => {
            setUpdateAlarmFor(!updateAlarmFor);
          }}>
          <Text style={styles.labelText}>Set Alarm For</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker('date', alarmForDate, PickerToUse.SetAlarmFor);
          }}>
          <Text style={styles.labelText}>{`${
            alarmForDate.getMonth() + 1
          }/${alarmForDate.getDate()}`}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker('time', alarmForDate, PickerToUse.SetAlarmFor);
          }}>
          <Text
            style={
              styles.labelText
            }>{`${alarmForDate.getHours()}:${alarmForDate.getMinutes()}`}</Text>
        </Pressable>
      </View>
      <View
        style={
          updateGotUp
            ? styles.selectedDateUIContainer
            : styles.unselectedDateUIContainer
        }>
        <Pressable
          onPress={() => {
            setUpdateGotUp(!updateGotUp);
          }}>
          <Text style={styles.labelText}>Got Up At</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker('date', gotUpDate, PickerToUse.GotUpAt);
          }}>
          <Text style={styles.labelText}>{`${
            gotUpDate.getMonth() + 1
          }/${gotUpDate.getDate()}`}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker('time', gotUpDate, PickerToUse.GotUpAt);
          }}>
          <Text
            style={
              styles.labelText
            }>{`${gotUpDate.getHours()}:${gotUpDate.getMinutes()}`}</Text>
        </Pressable>
      </View>
      <View
        style={
          updateLeftCamp
            ? styles.selectedDateUIContainer
            : styles.unselectedDateUIContainer
        }>
        <Pressable
          onPress={() => {
            setUpdateLeftCamp(!updateLeftCamp);
          }}>
          <Text style={styles.labelText}>Left Camp At</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker('date', leftCampDate, PickerToUse.LeftCampAt);
          }}>
          <Text style={styles.labelText}>{`${
            leftCampDate.getMonth() + 1
          }/${leftCampDate.getDate()}`}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showDatetimePicker('time', leftCampDate, PickerToUse.LeftCampAt);
          }}>
          <Text
            style={
              styles.labelText
            }>{`${leftCampDate.getHours()}:${leftCampDate.getMinutes()}`}</Text>
        </Pressable>
      </View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : Colors.blue,
          },
          styles.saveSettingsButton,
        ]}
        onPress={recordCampEvent}>
        <Text style={styles.recordButtonText}>
          {updateLastEvent ? 'Update Camp' : 'Record Camp'}
        </Text>
      </Pressable>
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
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
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
});
