import React, { useContext, useState } from "react";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import { StyleSheet } from "react-native";

function CalendarView() {
  const posts = [
    {
      id: 1,
      title: "AI-X 해커톤",
      contents: "공모전",
      date: "2022-05-26",
    },
    {
      id: 2,
      title: "아이디어 공모전",
      contents: "공모전",
      date: "2022-05-27",
    },
  ];
  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), "yyyy-MM-dd");
    acc[formattedDate] = { marked: true };
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };

  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedSelectedDates}
      theme={{
        selectedDayBackgroundColor: "#009688",
        arrowColor: "#009688",
        dotColor: "#009688",
        todayTextColor: "#009688",
      }}
      onDayPress={(day) => {
        setSelectedDate(day.dateString);
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    //borderBottomWidth: 1,
    //borderBottomColor: "#e0e0e0",
  },
});

export default CalendarView;
