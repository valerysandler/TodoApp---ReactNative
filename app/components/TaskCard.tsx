import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, IconButton, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TaskModel from '../../src/models/TaskModel';

interface TaskCardProps {
  task: TaskModel;
  onRemove: (id: string) => void;
  onEdit: (task: TaskModel) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onRemove, onEdit }) => {
  const getColor = () => {
    switch (task.status) {
      case 'todo': return '#ef4444';       // red
      case 'inProgress': return '#3b82f6'; // blue
      case 'done': return '#10b981';       // green
      default: return '#d1d5db';
    }
  };

  const getIcon = () => {
    switch (task.status) {
      case 'todo': return 'checkbox-blank-circle-outline';
      case 'inProgress': return 'progress-clock';
      case 'done': return 'check-circle-outline';
      default: return 'help-circle-outline';
    }
  };

  return (
    <Card style={[styles.card, { borderLeftColor: getColor() }]}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <MaterialCommunityIcons name={getIcon()} size={20} color={getColor()} style={{ marginRight: 8 }} />
          <Text style={styles.title}>{task.title}</Text>
        </View>

        {task.description ? (
          <Text style={styles.description}>{task.description}</Text>
        ) : null}

        <View style={styles.footer}>
          <Chip mode="outlined" compact style={[styles.statusChip, { borderColor: getColor() }]}>
            <Text style={[styles.statusText, { color: getColor() }]}>
              {task.status === 'inProgress' ? 'In Progress' : task.status}
            </Text>
          </Chip>

          <Text style={styles.time}>
            {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </Card.Content>

      <View style={styles.actions}>
        <IconButton icon="pencil-outline" size={20} onPress={() => onEdit(task)} />
        <IconButton icon="delete-outline" size={20} iconColor="#ef4444" onPress={() => onRemove(task.id)} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderLeftWidth: 5,
    elevation: 1,
  },
  content: {
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flexShrink: 1,
    flex: 1,
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusChip: {
    borderWidth: 1,
    backgroundColor: '#f9fafb',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  time: {
    fontSize: 12,
    color: '#9ca3af',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 8,
    paddingBottom: 8,
  },
});

export default TaskCard;
