import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskModel } from '../models/TaskModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '.';

interface TasksState {
  items: TaskModel[];
}

const initialState: TasksState = {
  items: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadTasks(state, action: PayloadAction<TaskModel[]>) {
      state.items = action.payload;
    },
    addTask(state, action: PayloadAction<TaskModel>) {
      state.items.push(action.payload);
      saveToStorage(state.items);
    },
    updateTask(state, action: PayloadAction<TaskModel>) {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        saveToStorage(state.items);
      }
    },
    removeTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter(t => t.id !== action.payload);
      saveToStorage(state.items);
    },
  },
});

export const { addTask, updateTask, removeTask, loadTasks } = taskSlice.actions;
export default taskSlice.reducer;

// Async thunk-style action (вручную):
export const loadTasksFromStorage = () => async (dispatch: AppDispatch) => {
  try {
    const data = await AsyncStorage.getItem('tasks');
    if (data) {
      const parsed: TaskModel[] = JSON.parse(data);
      dispatch(loadTasks(parsed));
    }
  } catch (err) {
    console.error('Failed to load tasks from AsyncStorage', err);
  }
};

const saveToStorage = async (tasks: TaskModel[]) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to save tasks to AsyncStorage', err);
  }
};
