import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

// Мокаем хуки next-intl и next/navigation
vi.mock('next-intl', () => ({
  useLocale: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

describe('LanguageSwitcher', () => {
  const mockRouter = { push: vi.fn() };
  const mockPathname = '/ru/some-page';

  beforeEach(() => {
    // Сбрасываем моки перед каждым тестом
    vi.clearAllMocks();

    // Настраиваем стандартные возвращаемые значения
    (useRouter as any).mockReturnValue(mockRouter);
    (usePathname as any).mockReturnValue(mockPathname);
  });

  it('рендерит кнопку с текущей локалью (русский)', () => {
    (useLocale as any).mockReturnValue('ru');

    render(<LanguageSwitcher />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('🇷🇺 Русский');
  });

  it('рендерит кнопку с текущей локалью (английский)', () => {
    (useLocale as any).mockReturnValue('en');

    render(<LanguageSwitcher />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('🇬🇧 English');
  });

  it('открывает меню при клике на кнопку', async () => {
    const user = userEvent.setup();
    (useLocale as any).mockReturnValue('ru');

    render(<LanguageSwitcher />);

    const button = screen.getByRole('button');
    await user.click(button);

    // ✅ Используем getAllByText + фильтрацию
    const russianElements = screen.getAllByText('🇷🇺 Русский');
    const englishElements = screen.getAllByText('🇬🇧 English');

    // Проверяем что есть и кнопка и пункт меню
    expect(russianElements).toHaveLength(2); // кнопка + пункт меню
    expect(englishElements).toHaveLength(1); // только пункт меню

    // ИЛИ ищем только в меню
    const menu = screen.getByRole('menu');
    expect(menu).toHaveTextContent('🇷🇺 Русский');
    expect(menu).toHaveTextContent('🇬🇧 English');
  });

  it('переключает на английский при клике', async () => {
    const user = userEvent.setup();
    (useLocale as any).mockReturnValue('ru');

    render(<LanguageSwitcher />);

    // Открываем меню
    const button = screen.getByRole('button');
    await user.click(button);

    // Кликаем на английский
    const englishOption = screen.getByText('🇬🇧 English');
    await user.click(englishOption);

    // Проверяем что router.push вызван с правильным путем
    expect(mockRouter.push).toHaveBeenCalledWith('/en/some-page');
  });

  it('переключает на русский при клике', async () => {
    const user = userEvent.setup();
    (useLocale as any).mockReturnValue('en');

    render(<LanguageSwitcher />);

    // Открываем меню
    const button = screen.getByRole('button');
    await user.click(button);

    // Кликаем на русский
    const russianOption = screen.getByText('🇷🇺 Русский');
    await user.click(russianOption);

    // Проверяем что router.push вызван с правильным путем
    expect(mockRouter.push).toHaveBeenCalledWith('/ru/some-page');
  });

  it('правильно обрабатывает корневой путь', () => {
    (useLocale as any).mockReturnValue('ru');
    (usePathname as any).mockReturnValue('/ru');

    render(<LanguageSwitcher />);

    // Проверяем логику формирования пути (неявно через render)
    // Этот тест просто проверяет что компонент не падает
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('закрывает меню после выбора языка', async () => {
    const user = userEvent.setup();
    (useLocale as any).mockReturnValue('ru');

    render(<LanguageSwitcher />);

    // Открываем меню
    const button = screen.getByRole('button');
    await user.click(button);

    // Проверяем что меню открыто
    expect(screen.getByText('🇬🇧 English')).toBeInTheDocument();

    // Выбираем язык
    const englishOption = screen.getByText('🇬🇧 English');
    await user.click(englishOption);

    // Проверяем что меню закрыто (элемента нет)
    expect(screen.queryByText('🇬🇧 English')).not.toBeInTheDocument();
  });
});
