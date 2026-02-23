import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SelectOption {
  value: string;
  label: string;
  desc?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string; // Container class
  buttonClassName?: string; // Button class for custom padding/text size
  dropdownClassName?: string;
  placement?: 'bottom' | 'top';
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = '...',
  className = '',
  buttonClassName = 'px-3 py-2 text-sm',
  dropdownClassName = '',
  placement = 'bottom'
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, bottom: 0 });

  const updatePosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        bottom: window.innerHeight - rect.top - window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // Also check if the click was inside the portal
        const portalEl = document.getElementById('custom-select-portal');
        if (portalEl && portalEl.contains(event.target as Node)) {
          return;
        }
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value);

  // We add an id so we can check if clicks were inside the portal
  const portalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="custom-select-portal"
          initial={{ opacity: 0, y: placement === 'top' ? 5 : -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: placement === 'top' ? 5 : -5 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className={`absolute z-[99999] overflow-auto rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-1 shadow-lg focus:outline-none ${dropdownClassName}`}
          style={{ 
            maxHeight: '15rem', 
            minWidth: 'min-content',
            width: position.width,
            left: position.left,
            ...(placement === 'bottom' ? { top: position.top + 4 } : { bottom: position.bottom + 4 })
          }}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`relative flex w-full cursor-default select-none items-center py-2 pl-3 pr-9 text-sm text-left outline-none transition-colors ${
                  isSelected ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700/50'
                }`}
              >
                <span className={`block truncate w-full ${isSelected ? 'font-medium' : 'font-normal'}`}>
                  {option.label}
                  {option.desc && <span className={`ml-1 ${isSelected ? 'text-indigo-500' : 'text-zinc-500'}`}>— {option.desc}</span>}
                </span>
                
                {isSelected && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600 dark:text-indigo-400">
                    <Check className="h-4 w-4" />
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div ref={containerRef} className={`relative ${isOpen ? 'z-50' : 'z-10'} ${className}`}>
      <button
        type="button"
        onClick={() => options.length > 0 && setIsOpen(!isOpen)}
        disabled={options.length === 0}
        className={`flex w-full items-center justify-between rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-left text-zinc-900 dark:text-zinc-100 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${buttonClassName} ${isOpen ? 'border-indigo-500 ring-1 ring-indigo-500' : ''} ${options.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className="truncate">
          {selectedOption ? (
            <>{selectedOption.label}{selectedOption.desc ? <span className="text-zinc-500 dark:text-zinc-400"> — {selectedOption.desc}</span> : ''}</>
          ) : (
            <span className="text-zinc-500 dark:text-zinc-400">{placeholder}</span>
          )}
        </span>
        <ChevronDown className={`ml-2 h-4 w-4 shrink-0 text-zinc-400 transition-transform ${isOpen ? (placement === 'top' ? 'rotate-0' : 'rotate-180') : (placement === 'top' ? 'rotate-180' : 'rotate-0')}`} />
      </button>

      {typeof document !== 'undefined' && createPortal(portalContent, document.body)}
    </div>
  );
}
