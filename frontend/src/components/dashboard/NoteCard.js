
import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const NoteCard = ({ note, onEdit, onDelete, onToggleComplete, deletingId }) => {
  const isDeleting = deletingId === note._id;

  return (
    <Card className="flex flex-col justify-between h-full hover:shadow-2xl transition duration-300">
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className={`text-xl font-semibold ${note.isCompleted ? 'line-through text-gray-400' : 'text-primary'}`}>
            {note.title}
          </h3>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            note.isCompleted ? 'bg-secondary text-white' : 'bg-gray-700 text-gray-300'
          }`}>
            {note.isCompleted ? 'Completed' : 'Pending'}
          </span>
        </div>
        <p className={`text-gray-300 mb-4 text-sm ${note.isCompleted ? 'line-through' : ''}`}>
          {note.content.substring(0, 150)}{note.content.length > 150 ? '...' : ''}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags && note.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-600 text-gray-200 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700">
        <Button 
          variant={note.isCompleted ? 'outline' : 'secondary'} 
          size="sm"
          onClick={() => onToggleComplete(note)}
        >
          {note.isCompleted ? 'Reopen' : 'Complete'}
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(note)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(note._id)} loading={isDeleting}>
            {isDeleting ? 'Deleting' : 'Delete'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NoteCard;