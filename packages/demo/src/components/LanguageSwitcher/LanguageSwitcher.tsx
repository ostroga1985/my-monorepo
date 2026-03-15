'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button, Menu, MenuItem, Box } from '@mui/material';
import { useState } from 'react';
import { i18n } from '../../i18n/config';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchLocale = (newLocale: string) => {
    // Получаем путь без текущей локали
    const pathWithoutLocale = pathname.replace(/^\/[^\/]+/, '');
    // Формируем новый путь
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
    handleClose();
  };

  return (
    <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{ bgcolor: 'background.paper' }}
      >
        {locale === 'ru' ? '🇷🇺 Русский' : '🇬🇧 English'}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {i18n.locales.map((loc) => (
          <MenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            selected={locale === loc}
          >
            {loc === 'ru' ? '🇷🇺 Русский' : '🇬🇧 English'}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
