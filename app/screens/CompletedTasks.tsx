import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TaskCard from '../components/TaskCard';
import { TaskModel } from '../models/TaskModel';

export default function CompletedTasks() {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const completedTasks = tasks.filter((task: TaskModel) => task.completed);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Completed Tasks</Text>
      <FlatList
        data={completedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onRemove={() => console.log('Remove', item.id)}
            onEdit={() => console.log('Edit', item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No completed tasks yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#888',
  },
});
