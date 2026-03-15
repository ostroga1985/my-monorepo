
'use client';

import { useQuery } from '@apollo/client/react'; // ← /react
import { gql } from '@apollo/client';

// 1. Определяем GraphQL запрос
const GET_LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 5) {
      id
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
      launch_success
    }
  }
`;

// 2. Типы для TypeScript (опционально, но рекомендуется)
interface Launch {
  id: string;
  mission_name: string;
  launch_date_local: string;
  rocket: {
    rocket_name: string;
  };
  launch_success: boolean | null;
}

interface LaunchesData {
  launches: Launch[];
}

export default function SpaceXMissions() {
  // 3. Используем хук useQuery для выполнения запроса
  const { loading, error, data } = useQuery<LaunchesData>(GET_LAUNCHES);

  if (loading) return <p>Загрузка миссий SpaceX...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <div>
      <h3>Последние 5 миссий SpaceX</h3>
      <ul>
        {data?.launches.map((launch) => (
          <li key={launch.id}>
            <strong>{launch.mission_name}</strong>
            <br />
            Ракета: {launch.rocket.rocket_name}
            <br />
            Дата: {new Date(launch.launch_date_local).toLocaleDateString()}
            <br />
            Статус:{' '}
            {launch.launch_success === true
              ? '✅ Успех'
              : launch.launch_success === false
                ? '❌ Провал'
                : '⏳ Ожидание'}
          </li>
        ))}
      </ul>
    </div>
  );
}
