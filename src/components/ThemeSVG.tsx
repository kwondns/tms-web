import { MoonStar, Sun } from 'lucide-react';

export default {
  light: <Sun className="size-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />,
  dark: <MoonStar className="absolute size-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />,
};
