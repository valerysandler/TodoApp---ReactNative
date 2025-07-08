import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
    Dialog,
    Portal,
    TextInput,
    Button,
    RadioButton,
    Text
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TaskModel from '../../src/models/TaskModel';

interface EditTaskModalProps {
    visible: boolean;
    task: TaskModel | null;
    onClose: () => void;
    onSave: (task: TaskModel) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ visible, task, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState<Date>(new Date());
    const [status, setStatus] = useState<'todo' | 'inProgress' | 'done'>('todo');
    const [showPicker, setShowPicker] = useState(false);
    const [titleError, setTitleError] = useState('');


    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setTime(task.createdAt ? new Date(task.createdAt) : new Date());
            setStatus(task.status || 'todo');
        } else {
            setTitle('');
            setDescription('');
            setTime(new Date());
            setStatus('todo');
        }
    }, [task]);

    const handleSave = () => {
        if (!title.trim()) {
            setTitleError('Title is required');
            return;
        }

        setTitleError(''); // очистим ошибку если всё ок

        const newOrUpdatedTask: TaskModel = {
            id: task?.id || Date.now().toString(),
            title: title.trim(),
            description: description.trim(),
            createdAt: time,
            updatedAt: new Date(),
            status,
            completed: status === 'done',
        };

        onSave(newOrUpdatedTask);
        onClose();
    };

    const onTimeChange = (event: any, selectedTime?: Date) => {
        setShowPicker(false);
        if (selectedTime) {
            setTime(selectedTime);
        }
    };


    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onClose} style={styles.dialog}>
                <Dialog.Title style={styles.title}>{task ? 'Edit Task' : 'New Task'}</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        label="Title"
                        value={title}
                        onChangeText={(text) => {
                            setTitle(text);
                            if (titleError) setTitleError('');
                        }}
                        style={styles.input}
                        mode="outlined"
                        outlineColor="#e5e7eb"
                        activeOutlineColor="#2563eb"
                        error={!!titleError}
                    />
                    {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
                        
                    <TextInput
                        label="Description"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                        mode="outlined"
                        outlineColor="#e5e7eb"
                        activeOutlineColor="#2563eb"
                        multiline
                    />
                    <TouchableOpacity onPress={() => setShowPicker(true)}>
                        <TextInput
                            label="Time"
                            value={time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            style={styles.input}
                            mode="outlined"
                            editable={false}
                            outlineColor="#e5e7eb"
                            activeOutlineColor="#2563eb"
                            pointerEvents="none" // важно!
                        />
                    </TouchableOpacity>


                    {showPicker && (
                        <DateTimePicker
                            value={time}
                            mode="time"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onTimeChange}
                        />
                    )}

                    <RadioButton.Group onValueChange={(value) => setStatus(value as 'todo' | 'inProgress' | 'done')} value={status}>
                        <View style={styles.radioRow}>
                            <RadioButton.Item label="To Do" value="todo" />
                            <RadioButton.Item label="In Progress" value="inProgress" />
                            <RadioButton.Item label="Done" value="done" />
                        </View>
                    </RadioButton.Group>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onClose} textColor="#6b7280">Cancel</Button>
                    <Button onPress={handleSave} style={styles.saveButton} textColor="#fff">Save</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    dialog: {
        borderRadius: 16,
        backgroundColor: '#ffffff',
    },
    title: {
        color: '#111827',
    },
    input: {
        marginBottom: 12,
        backgroundColor: '#f9fafb',
    },
    radioRow: {
        flexDirection: 'column',
    },
    saveButton: {
        backgroundColor: '#2563eb',
        marginLeft: 8,
    },
    errorText: {
        color: '#ef4444',
        marginTop: 4,
        fontSize: 12,
    },
});

export default EditTaskModal;
