import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../src/store/index';
import {
    addTask,
    updateTask,
    removeTask,
    loadTasksFromStorage,
} from '../../src/store/TaskSlice';
import TaskModel from '../../src/models/TaskModel';
import TaskCard from '../components/TaskCard';
import ProgressTabs from '../components/ProgressTabs';
import EditTaskModal from '../components/EditTaskDialog';

const HomeScreen: React.FC = () => {
    const userName = 'Valery Sandler';
    const dispatch: AppDispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.items);
    const [selectedTask, setSelectedTask] = useState<TaskModel | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<'todo' | 'inProgress' | 'done'>('todo');
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        dispatch(loadTasksFromStorage());
    }, [dispatch]);

    const handleOpenAddModal = () => {
        setSelectedTask({
            id: '',
            title: '',
            completed: false,
            createdAt: new Date(),
            status: 'todo', // 👈 обязательно
        });
        setModalVisible(true);
    };


    const handleEditTask = (task: TaskModel) => {
        setSelectedTask(task);
        setModalVisible(true);
    };

    const handleRemoveTask = (id: string) => {
        dispatch(removeTask(id));
    };

    const handleSaveTask = (task: TaskModel) => {
        if (task.id && tasks.find((t) => t.id === task.id)) {
            dispatch(updateTask(task));
        } else {
            dispatch(addTask(task));
        }
        setModalVisible(false);
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesTab =
            (activeTab === 'todo' && !task.completed && task.status === 'todo') ||
            (activeTab === 'inProgress' && task.status === 'inProgress') ||
            (activeTab === 'done' && (task.completed || task.status === 'done'));

        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });


    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <FlatList
                style={styles.container}
                contentContainerStyle={styles.content}
                data={filteredTasks} // ничего не рендерим здесь
                renderItem={() => null} // добавлено для корректной типизации
                ListHeaderComponent={
                    <>
                        <View style={styles.headerRow}>
                            <Text style={styles.greeting}>Good Morning, {userName}!</Text>
                            <Text style={styles.taskCount}>
                                You have <Text style={styles.highlight}>{tasks.length} tasks</Text> this month 👍
                            </Text>
                        </View>

                        {/* <TextInput
                            mode="outlined"
                            placeholder="Search a task..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            style={styles.searchInput}
                            left={<TextInput.Icon icon="magnify" />}
                        /> */}



                        <ProgressTabs
                            onEditTask={handleEditTask}
                            onRemoveTask={handleRemoveTask}
                        />
                    </>
                }
            />


            <IconButton
                icon="plus-circle"
                size={40}
                onPress={handleOpenAddModal}
                style={styles.addTaskButtonIcon}
                iconColor="#fff"
            />

            <EditTaskModal
                visible={isModalVisible}
                task={selectedTask}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveTask}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    content: {
        paddingBottom: 100,
    },
    headerRow: {
        flexDirection: 'column',
        gap: 8,
        marginBottom: 12,
    },
    greeting: {
        fontSize: 18,
        color: '#888',
    },
    taskCount: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 4,
    },
    highlight: {
        color: '#3b82f6',
    },
    searchInput: {
        marginVertical: 20,
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
    },
    empty: {
        textAlign: 'center',
        marginTop: 32,
        color: '#888',
    },
    addTaskButtonIcon: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#3b82f6',
        borderRadius: 30,
        elevation: 5,
        padding: 10,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
