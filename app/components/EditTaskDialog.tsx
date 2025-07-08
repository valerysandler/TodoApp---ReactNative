import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Dialog,
    Portal,
    TextInput,
    Button,
    RadioButton,
} from 'react-native-paper';
import { TaskModel } from '../models/TaskModel';

interface Task {
    id: number;
    title: string;
    description: string;
    time: string;
    status: 'todo' | 'inProgress' | 'done';
    progress: number;
}

interface EditTaskModalProps {
    visible: boolean;
    task: TaskModel | null;
    onClose: () => void;
    onSave: (task: TaskModel) => void;
}


const EditTaskModal: React.FC<EditTaskModalProps> = ({ visible, task, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [status, setStatus] = useState<'todo' | 'inProgress' | 'done'>('todo');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setTime(task.createdAt ? new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '');
            setStatus(task.status || 'todo');
        } else {
            setTitle('');
            setDescription('');
            setTime('');
            setStatus('todo');
        }
    }, [task]);

    const handleSave = () => {
        if (!title.trim()) return;

        const newOrUpdatedTask: TaskModel = {
            id: task?.id || Date.now().toString(), // ✅ если task есть — редактируем, иначе — создаём новый ID
            title: title.trim(),
            description: description.trim(),
            createdAt: new Date(),
            updatedAt: new Date(),
            status: status,
            completed: status === 'done',
        };

        onSave(newOrUpdatedTask);
        onClose();
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onClose} style={styles.dialog}>
                <Dialog.Title>{task ? 'Edit Task' : 'New Task'}</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        label="Title"
                        value={title}
                        onChangeText={setTitle}
                        style={styles.input}
                    />
                    <TextInput
                        label="Description"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                        multiline
                    />
                    <TextInput
                        label="Time"
                        value={time}
                        onChangeText={setTime}
                        style={styles.input}
                    />
                    <RadioButton.Group onValueChange={value => setStatus(value as Task['status'])} value={status}>
                        <View style={styles.radioRow}>
                            <RadioButton.Item label="To Do" value="todo" />
                            <RadioButton.Item label="In Progress" value="inProgress" />
                            <RadioButton.Item label="Done" value="done" />
                        </View>
                    </RadioButton.Group>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onClose}>Cancel</Button>
                    <Button onPress={handleSave}>Save</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    dialog: {
        borderRadius: 16,
    },
    input: {
        marginBottom: 12,
    },
    radioRow: {
        flexDirection: 'column',
    },
});

export default EditTaskModal;
