import { Button } from '@mui/material';
import { Send } from '@mui/icons-material';

export default function MuiButtonDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Кнопки MUI:</h2>

      {/* 1. Базовая кнопка */}
      <Button variant="contained">Contained</Button>

      {/* 2. Кнопка с outline */}
      <Button variant="outlined" sx={{ marginLeft: '10px' }}>
        Outlined
      </Button>

      {/* 3. Кнопка с иконкой */}
      <Button
        variant="contained"
        startIcon={<Send />}
        sx={{ marginLeft: '10px' }}
      >
        Отправить
      </Button>

      {/* 4. Отключенная кнопка */}
      <Button variant="contained" disabled sx={{ marginLeft: '10px' }}>
        Неактивна
      </Button>
    </div>
  );
}
