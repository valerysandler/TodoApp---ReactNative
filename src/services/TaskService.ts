import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskModel } from '../models/TaskModel';

export const LoadTasks = async () => {
    try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
            return JSON.parse(storedTasks);
        }
        return []; // Return an empty array if no tasks are found

    } catch (error) {
        console.error("Error loading tasks:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}

export const AddTask = async (task: TaskModel) => {
    try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const tasks = storedTasks ? JSON.parse(storedTasks) : [];
        tasks.push(task);
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error("Error adding task:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}