import { Sun, Palette, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import type { Theme } from '../../contexts/ThemeContext';

const modes: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark-blue', icon: Palette, label: 'Navy' },
  { value: 'dark', icon: Moon, label: 'Dark' },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center bg-t-page-alt rounded-full p-1 gap-0.5">
      {modes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={`${label} theme`}
          className={`
            p-2 rounded-full transition-colors duration-200
            ${theme === value
              ? 'bg-gold-500 text-white'
              : 'text-t-text-muted hover:text-t-text'
            }
          `}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
}
