'use client';

import { DateTime } from 'luxon';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useLocale } from 'next-intl';

export default function LuxonTest() {
  const locale = useLocale();
  const now = DateTime.now().setLocale(locale);

  return (
    <Card sx={{ maxWidth: 400, m: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Luxon Demo
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <div>📍 Сейчас: {now.toLocaleString(DateTime.DATETIME_FULL)}</div>
          <div>📅 Дата: {now.toLocaleString(DateTime.DATE_FULL)}</div>
          <div>⏰ Время: {now.toLocaleString(DateTime.TIME_WITH_SECONDS)}</div>
          <div>🗓️ Формат: {now.toFormat('dd.MM.yyyy HH:mm')}</div>
          <div>📆 Месяц: {now.monthLong}</div>
          <div>📊 Неделя: {now.weekNumber}</div>
          <div>🕒 Относительно: {now.minus({ hours: 2 }).toRelative()}</div>
          <div>
            ➕ +7 дней:{' '}
            {now.plus({ days: 7 }).toLocaleString(DateTime.DATE_SHORT)}
          </div>
          <div>🌍 Локаль: {locale}</div>
        </Box>
      </CardContent>
    </Card>
  );
}
