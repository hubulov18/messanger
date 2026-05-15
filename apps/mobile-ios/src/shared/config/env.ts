import { NativeModules } from 'react-native';

// ----------------------------------------------------------------------------
// Для локальной разработки используем фиксированный адрес backend'а.
// Это убирает зависимость от hostname Metro bundler'а, который на устройстве
// может отличаться от адреса, где реально подняты API и call-service.
const DEFAULT_DEV_HOST = '10.12.242.151';

// Для продакшна — публичный IP или домен Oracle VPS.
// Когда заполнено, приложение всегда ходит на этот адрес (Metro-хост игнорируется).
// Пример: const PROD_HOST = '123.45.67.89';
const PROD_HOST = '';
// ----------------------------------------------------------------------------

function resolveApiBaseUrl(): string {
  // Продакшн: фиксированный URL на VPS
  if (PROD_HOST) {
    return `http://${PROD_HOST}:3000/v1`;
  }

  return `http://${DEFAULT_DEV_HOST}:3000/v1`;
}

function resolveCallSignalingUrl(): string {
  // Продакшн: фиксированный URL на VPS
  if (PROD_HOST) {
    return `http://${PROD_HOST}:3007/calls`;
  }

  return `http://${DEFAULT_DEV_HOST}:3007/calls`;
}

export const env = {
  apiBaseUrl: resolveApiBaseUrl(),
  callSignalingUrl: resolveCallSignalingUrl(),
  features: {
    callsV1: true,
    voipPushIncoming: true,
    useRealUiBubbles: true,
  },
};
