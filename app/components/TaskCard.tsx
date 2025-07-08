import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, ProgressBar, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TaskModel } from '../models/TaskModel';

interface TaskCardProps {
    task: TaskModel;
    onRemove: (id: string) => void;
    onEdit: (task: TaskModel) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onRemove, onEdit }) => {
    const getColor = () => {
        switch (task.status) {
            case 'todo': return '#ef4444';
            case 'inProgress': return '#3b82f6';
            case 'done': return '#10b981';
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
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.header}>
                    <MaterialCommunityIcons name={getIcon()} size={20} color={getColor()} style={{ marginRight: 8 }} />
                    <Text style={styles.title}>{task.title}</Text>
                </View>
                <Text style={styles.description}>{task.description}</Text>
                <View style={styles.footer}>
                    <Text style={[styles.status, { color: getColor() }]}>
                        {task.status === 'inProgress' ? 'In Progress' : task.status}
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
        alignSelf: 'center',
        marginBottom: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        flexShrink: 1,
        color: '#374151',
        marginRight: 8,
        textTransform: 'capitalize',
        flex: 1,
    },
    description: {
        fontSize: 13,
        color: '#6b7280',
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    time: {
        fontSize: 12,
        color: '#9ca3af',
    },
    status: {
        fontSize: 12,
        fontWeight: '500',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 8,
        paddingBottom: 8,
    },
    progress: {
        height: 4,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
});

export default TaskCard;