
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '../common/Input';
import Button from '../common/Button';

const noteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  content: z.string().min(1, 'Content is required'),
  tags: z.string().optional(),
  isCompleted: z.boolean().optional(),
});

const NoteFormModal = ({ isOpen, onClose, noteToEdit, onSubmit, loading, error }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(noteSchema),
  });

  const isEditMode = !!noteToEdit;

  // Set form values when noteToEdit changes
  useEffect(() => {
    if (noteToEdit) {
      setValue('title', noteToEdit.title);
      setValue('content', noteToEdit.content);
      setValue('tags', (noteToEdit.tags || []).join(', '));
      setValue('isCompleted', noteToEdit.isCompleted);
    } else {
      reset({ title: '', content: '', tags: '', isCompleted: false });
    }
  }, [noteToEdit, setValue, reset]);

  if (!isOpen) return null;

  const handleFormSubmit = (data) => {
    // Convert comma-separated string of tags into an array of trimmed strings
    const formattedTags = data.tags 
      ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];
      
    const payload = {
        ...data,
        tags: formattedTags,
        isCompleted: !!data.isCompleted,
    };
    
    onSubmit(payload, isEditMode ? noteToEdit._id : null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-bg-card p-6 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-4">
          {isEditMode ? 'Edit Note' : 'Create New Note'}
        </h2>
        
        {error && (
            <div className="p-3 text-sm text-danger bg-red-900/30 rounded-lg border border-danger mb-4">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <Input
            label="Title"
            id="title"
            placeholder="A short title for your note"
            {...register('title')}
            error={errors.title?.message}
            disabled={loading}
          />

          <div className="flex flex-col space-y-1">
            <label htmlFor="content" className="text-sm font-medium text-gray-300">Content</label>
            <textarea
              id="content"
              rows="4"
              placeholder="Your detailed note content"
              {...register('content')}
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.content ? 'border-danger focus:border-danger' : 'border-gray-600 focus:border-primary'
              } rounded-lg text-white placeholder-gray-400 focus:ring-primary focus:ring-1 transition duration-150 ease-in-out`}
              disabled={loading}
            ></textarea>
            {errors.content && <p className="text-sm text-danger mt-1">{errors.content.message}</p>}
          </div>

          <Input
            label="Tags (comma-separated)"
            id="tags"
            placeholder="e.g., react, tailwind, bug"
            {...register('tags')}
            error={errors.tags?.message}
            disabled={loading}
          />
          
          <div className="flex items-center space-x-2">
            <input
                id="isCompleted"
                type="checkbox"
                {...register('isCompleted')}
                className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
                disabled={loading}
            />
            <label htmlFor="isCompleted" className="text-sm font-medium text-gray-300">Mark as Completed</label>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              {isEditMode ? 'Save Changes' : 'Create Note'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteFormModal;