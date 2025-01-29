import React from 'react';
import { cn } from '@/lib/utils';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  onAdd: () => void;
  onRemove: () => void;
  itemsLength: number;
  className?: string;
  small?: boolean
  children?: React.ReactNode
}

export const EntryOperator: React.FC<Props> = ({ onAdd, onRemove, itemsLength, className, children, small = false}) => {
  return (
    <div className={cn("absolute w-max h-[40px] rounded-full flex overflow-hidden -top-[40px] left-1/2 -translate-x-1/2 bottom-0 right-0 bg-white z-30 cursor-pointer", className)}>
      <div 
        className='h-[40px] flex items-center gap-2 bg-secondary px-3 text-white'
        onClick={(e) => {
          e.stopPropagation();
          onAdd();
        }}
      >
        <Plus className='font-bold' size={21} strokeWidth={3} />
        <p className={cn('text-base', small && 'hidden')}>New Entry</p>
      </div>
      {children}
      <button 
        className={cn("h-[40px] pl-3 pr-4 flex items-center justify-center group", itemsLength === 1 && 'cursor-not-allowed')}
        disabled={itemsLength === 1}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <Trash2 className='font-bold text-base-content group-hover:text-secondary' size={21} strokeWidth={2}  />
      </button>
    </div>
  );
};