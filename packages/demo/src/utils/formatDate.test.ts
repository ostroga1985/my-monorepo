import { formatDate, formatRelativeTime } from './formatDate';

describe('formatDate', () => {
  it('форматирует ISO строку в русскую дату', () => {
    const result = formatDate('2026-02-18');
    expect(result).toBe('18 февраля 2026 г.');
  });

  it('форматирует с английской локалью', () => {
    const result = formatDate('2026-02-18', 'en');
    expect(result).toBe('February 18, 2026');
  });

  it('работает с объектом Date', () => {
    const date = new Date('2026-02-18');
    const result = formatDate(date);
    expect(result).toBe('18 февраля 2026 г.');
  });
});

describe('formatRelativeTime', () => {
  beforeEach(() => {
    // Фиксируем "сейчас" для тестов
    vi.setSystemTime(new Date('2026-02-18T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('показывает "сегодня" для текущей даты', () => {
    const date = new Date('2026-02-18T10:00:00');
    const result = formatRelativeTime(date);
    expect(result).toBe('2 часа назад'); // зависит от времени
  });

  it('показывает "вчера"', () => {
    const date = new Date('2026-02-17');
    const result = formatRelativeTime(date);
    expect(result).toBe('1 день назад');
  });

  it('показывает "месяц назад"', () => {
    const date = new Date('2026-01-18');
    const result = formatRelativeTime(date);
    expect(result).toBe('1 месяц назад');
  });
});
