import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";

type CalendarItem = {
  date: Date;
  tasks: string[];
};

const generateCalendarData = (days: number = 30): CalendarItem[] => {
  const today = new Date();
  const data: CalendarItem[] = [];

  for (let i = -5; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    data.push({
      date,
      tasks: i % 3 === 0 ? ["Task 1", "Task 2"] : [],
    });
  }

  return data;
};

const Calendar: React.FC = () => {
  const data = generateCalendarData();
  const today = new Date().toDateString();

  const renderItem = ({ item }: { item: CalendarItem }) => {
    const isToday = item.date.toDateString() === today;
    return (
      <View style={[styles.row, isToday && styles.todayRow]}>
        <Text style={[styles.day, isToday && styles.todayText]}>
          {item.date.toDateString()}
        </Text>
        <View style={styles.tasks}>
          {item.tasks.length > 0 ? (
            item.tasks.map((task, index) => (
              <Text key={index} style={styles.taskText}>
                • {task}
              </Text>
            ))
          ) : (
            <Text style={styles.noTaskText}>No tasks</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Day</Text>
        <Text style={styles.headerText}>Tasks</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.date.toISOString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    alignItems: "flex-start",
  },
  todayRow: {
    backgroundColor: "#fffae6",
  },
  day: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  todayText: {
    color: "#d35400",
    fontWeight: "bold",
  },
  tasks: {
    flex: 1,
  },
  taskText: {
    fontSize: 13,
    color: "#555",
  },
  noTaskText: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#aaa",
  },
});

export default Calendar;
