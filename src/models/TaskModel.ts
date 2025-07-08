 interface TaskModel {
id: string;
    title: string; // Title of the task
    description?: string; // Optional description of the task
    completed: boolean; // Indicates if the task is completed
    createdAt: Date; // Timestamp when the task was created
    updatedAt?: Date; // Optional timestamp when the task was last updated
    dueDate?: Date; // Optional due date for the task
    priority?: 'low' | 'medium' | 'high'; // Optional priority level for the task
    tags?: string[]; // Optional tags associated with the task
    progress?: number; // Optional progress percentage (0-100)
    status?: 'todo' | 'inProgress' | 'done'; // Optional status of
}

export default TaskModel;