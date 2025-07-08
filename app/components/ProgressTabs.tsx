import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { TaskModel } from '../models/TaskModel';
import TaskCard from './TaskCard';

interface ProgressTabsProps {
    onEditTask: (task: TaskModel) => void;
    onRemoveTask: (id: string) => void;
}


const tabs = [
    { key: 'todo', label: 'To Do' },
    { key: 'inProgress', label: 'In Progress' },
    { key: 'done', label: 'Done' },
];

const ProgressTabs: React.FC<ProgressTabsProps> = ({
    onEditTask,
    onRemoveTask,
}) => {
    const [activeTab, setActiveTab] = useState<'todo' | 'inProgress' | 'done'>('todo');
    const tasks = useSelector((state: RootState) => state.tasks.items);

    const filteredTasks = tasks.filter((task) => {
        if (activeTab === 'todo') return !task.completed && task.status === 'todo';
        if (activeTab === 'inProgress') return !task.completed && task.status === 'inProgress';
        if (activeTab === 'done') return task.completed || task.status === 'done';
        return true;
    });


    return (
        <View>
            <View style={styles.tabContainer}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                        <TouchableOpacity
                            key={tab.key}
                            style={[styles.tab, isActive && styles.activeTab]}
                            onPress={() => setActiveTab(tab.key as 'todo' | 'inProgress' | 'done')}
                        >
                            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onEdit={() => onEditTask(item)}
                        onRemove={() => onRemoveTask(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No tasks in this category</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f3f4f6',
        padding: 4,
        borderRadius: 12,
        marginBottom: 16,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#3b82f6',
    },
    label: {
        color: '#374151',
        fontWeight: '500',
    },
    activeLabel: {
        color: '#fff',
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 16,
    },
});

export default ProgressTabs;
