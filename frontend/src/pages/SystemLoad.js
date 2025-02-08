import React, { useState } from 'react';
import { Container, Paper, Button, Typography, Box, CircularProgress, Fade } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';

// Стилизованные компоненты
const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/all.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  maxWidth: '100% !important',
  width: '100%',
  margin: 0
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(4px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const Terminal = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.95)',
  color: '#00ff00',
  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
  minHeight: '800px',
  maxHeight: '800px',
  overflow: 'auto',
  marginTop: theme.spacing(3),
  borderRadius: '10px',
  boxShadow: 'inset 0 0 20px rgba(0, 255, 0, 0.3)',
  fontSize: '13px',
  lineHeight: '1.2',
  '&::-webkit-scrollbar': {
    width: '12px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#1a1a1a',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#00ff00',
    borderRadius: '6px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 'bold',
  borderRadius: '10px',
  textTransform: 'none',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 10px 4px rgba(33, 203, 243, .3)',
  },
  '&:disabled': {
    background: '#gray',
  },
}));

// Меняем все логи на одинарные кавычки
const searchLogs = [
  '[15:07:38] 🔍 Инициализация поискового модуля...',
  'root@neurocascade:~$ sudo systemctl status neural-search',
  '● neural-search.service - Neural Search Service',
  '     Loaded: loaded (/etc/systemd/system/neural-search.service)',
  '     Active: active (running) since Thu 2024-03-15 14:55:23 UTC; 12min ago',
  '     Docs: man:neural-search(8)',
  '     Process: 13337 ExecStart=/usr/bin/neural-search --daemon',
  '     Main PID: 13338 (neural-search)',
  '     Tasks: 23 (limit: 4915)',
  '     Memory: 1.2G',
  '     CPU: 12.3%',
  '     CGroup: /system.slice/neural-search.service',
  '           └─13338 /usr/bin/neural-search --daemon',
  '',
  'root@neurocascade:~$ ./quantum-scan.sh --deep --threads 16',
  '[15:07:39] [INIT] Загрузка квантовых паттернов...',
  '[15:07:39] [SYS] Проверка целостности данных...',
  '[15:07:39] [QUANTUM] Инициализация квантового ядра...',
  '[15:07:39] [MEMORY] Выделено 16GB под квантовые вычисления',
  '[15:07:39] [CPU] Загрузка процессора: 78%',
  '[15:07:39] [GPU] CUDA cores: активны',
  '[15:07:39] [NET] Сетевой интерфейс: активен',
  '[15:07:39] [INIT] Загрузка нейронных сетей...',
  '[15:07:39] [SYS] Проверка квантовой запутанности...',
  '[15:07:39] [QUANTUM] Калибровка кубитов...',
  '[15:07:39] [INFO] Квантовая синхронизация: OK',
  '[15:07:39] [DEBUG] Инициализация поисковых алгоритмов',
  '[15:07:39] [SYS] Загрузка базы данных паттернов...',
  'root@neurocascade:~$ cat /proc/quantum/status',
  'QubitCount: 1024',
  'ErrorRate: 0.0001%',
  'Coherence: 99.99%',
  'Temperature: 0.015K',
  'State: OPERATIONAL',
  '',
  '[15:07:40] [SEARCH] Начало квантового поиска...',
  '[15:07:40] [INFO] Сканирование сектора A1...',
  'Прогресс: [##########] 100%',
  '[15:07:40] [INFO] Сканирование сектора A2...',
  'Прогресс: [##########] 100%',
  '[15:07:40] [INFO] Сканирование сектора A3...',
  'Прогресс: [##########] 100%',
  '[15:07:40] [DEBUG] Обнаружены квантовые флуктуации в секторе B1',
  '[15:07:40] [SYS] Применение квантовой коррекции ошибок...',
  '[15:07:40] [INFO] Коррекция успешна',
  'root@neurocascade:~$ tail -f /var/log/quantum/search.log',
  '2024-03-15 15:07:40 [INFO] Квантовый поиск активен',
  '2024-03-15 15:07:40 [DEBUG] Обработка результатов...',
  '2024-03-15 15:07:40 [INFO] Найдено совпадений: 1337',
  '2024-03-15 15:07:40 [SYS] Сохранение результатов...',
  '',
  'root@neurocascade:~$ ls -la /var/quantum/results/',
  'total 1337',
  'drwxr-xr-x 2 root root 4096 Mar 15 15:07 .',
  'drwxr-xr-x 4 root root 4096 Mar 15 15:07 ..',
  '-rw-r--r-- 1 root root 8192 Mar 15 15:07 quantum_results.dat',
  '-rw-r--r-- 1 root root 4096 Mar 15 15:07 neural_patterns.bin',
  '',
  '[15:07:41] [SUCCESS] Квантовый поиск завершен успешно',
  '[15:07:41] [INFO] Сохранение отчета...',
  'root@neurocascade:~$ cat /var/quantum/metrics.log',
  'CPU Usage: 78%',
  'Memory: 13.37GB/32GB',
  'Quantum Core Temperature: Optimal',
  'Neural Network Load: 89%',
  'Error Rate: 0.0001%',
  'Success Rate: 99.99%',
  '[15:07:41] ✅ Операция успешно завершена!'
];

const analyzeLogs = [
  '[15:07:40] 📊 Запуск модуля анализа...',
  'root@neurocascade:~$ ./neural-analyzer --mode deep',
  '[15:07:40] [INIT] Загрузка моделей ИИ...',
  '[15:07:40] [SYS] TensorFlow v2.8.0 загружен',
  '[15:07:40] [SYS] PyTorch v1.9.0 загружен',
  '[15:07:40] [SYS] Keras v2.4.3 загружен',
  '[15:07:40] [CUDA] Инициализация CUDA cores...',
  '[15:07:40] [MEMORY] Выделено 24GB под нейронные сети',
  '[15:07:40] [NET] Проверка сетевых подключений...',
  '[15:07:40] [SYS] Загрузка весов моделей...',
  '[15:07:40] [INFO] Модель BERT: загружена',
  '[15:07:40] [INFO] Модель GPT: загружена',
  '[15:07:40] [INFO] Модель ResNet: загружена',
  '[15:07:40] [DEBUG] Проверка GPU памяти...',
  'root@neurocascade:~$ nvidia-smi',
  '+-----------------------------------------------------------------------------+',
  '| NVIDIA-SMI 470.82.01    Driver Version: 470.82.01    CUDA Version: 11.4     |',
  '|-------------------------------+----------------------+----------------------+',
  '| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |',
  '| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |',
  '|                               |                      |               MIG M. |',
  '|===============================+======================+======================|',
  '|   0  NVIDIA A100         On   | 00000000:00:05.0 Off |                    0 |',
  '| N/A   32C    P0    65W / 300W |  23024MiB / 40536MiB |     42%      Default |',
  '|                               |                      |             Disabled |',
  '+-------------------------------+----------------------+----------------------+',
  '',
  '[15:07:41] [INIT] Запуск нейронных сетей...',
  '[15:07:41] [SYS] Инициализация пайплайна анализа...',
  '[15:07:41] [INFO] Загрузка датасета...',
  'root@neurocascade:~$ ls -l /data/neural/',
  'total 8.4G',
  '-rw-r--r-- 1 root root 2.1G Mar 15 15:07 dataset_1.h5',
  '-rw-r--r-- 1 root root 2.3G Mar 15 15:07 dataset_2.h5',
  '-rw-r--r-- 1 root root 2.0G Mar 15 15:07 dataset_3.h5',
  '-rw-r--r-- 1 root root 2.0G Mar 15 15:07 dataset_4.h5',
  '',
  '[15:07:41] [PROCESS] Начало анализа данных...',
  '[15:07:41] [INFO] Batch 1/4 в обработке...',
  'Прогресс: [##########] 100%',
  '[15:07:41] [INFO] Batch 2/4 в обработке...',
  'Прогресс: [##########] 100%',
  '[15:07:41] [INFO] Batch 3/4 в обработке...',
  'Прогресс: [##########] 100%',
  '[15:07:41] [INFO] Batch 4/4 в обработке...',
  'Прогресс: [##########] 100%',
  '',
  '[15:07:42] [DEBUG] Агрегация результатов...',
  '[15:07:42] [INFO] Применение глубокого обучения...',
  '[15:07:42] [SYS] Оптимизация нейронных связей...',
  'root@neurocascade:~$ cat /var/log/neural/training.log',
  'Epoch 1/5: loss=0.0342, accuracy=0.9876',
  'Epoch 2/5: loss=0.0256, accuracy=0.9901',
  'Epoch 3/5: loss=0.0198, accuracy=0.9923',
  'Epoch 4/5: loss=0.0165, accuracy=0.9945',
  'Epoch 5/5: loss=0.0143, accuracy=0.9967',
  '',
  '[15:07:42] [SUCCESS] Обучение завершено успешно',
  '[15:07:42] [INFO] Сохранение результатов...',
  'root@neurocascade:~$ ls -la /var/neural/results/',
  'total 2048',
  'drwxr-xr-x 2 root root 4096 Mar 15 15:07 .',
  'drwxr-xr-x 4 root root 4096 Mar 15 15:07 ..',
  '-rw-r--r-- 1 root root 1024M Mar 15 15:07 model_weights.h5',
  '-rw-r--r-- 1 root root 512M Mar 15 15:07 analysis_results.npz',
  '',
  '[15:07:43] [INFO] Генерация отчета...',
  'root@neurocascade:~$ cat /var/neural/metrics.log',
  'Model Performance Metrics:',
  'Accuracy: 99.67%',
  'Precision: 99.45%',
  'Recall: 99.32%',
  'F1 Score: 99.38%',
  'GPU Memory Usage: 23GB/40GB',
  'Training Time: 127.3s',
  '',
  '[15:07:43] ✅ Анализ успешно завершен!'
];

const aggregateLogs = [
  '[15:07:41] 📦 Запуск агрегации данных...',
  'root@neurocascade:~$ docker ps | grep neural',
  'CONTAINER ID   IMAGE                COMMAND     CREATED          STATUS',
  'a1b2c3d4e5f6   neural-aggregator    "/bin/sh"   12 hours ago     Up 12 hours',
  'f6e5d4c3b2a1   neural-processor     "/bin/sh"   12 hours ago     Up 12 hours',
  '',
  'root@neurocascade:~$ ./aggregate-data.sh --parallel --shards 16',
  '[15:07:41] [INIT] Инициализация агрегатора...',
  '[15:07:41] [SYS] Проверка доступных ресурсов...',
  '[15:07:41] [MEMORY] Доступно: 64GB',
  '[15:07:41] [CPU] Доступно ядер: 16',
  '[15:07:41] [STORAGE] Доступно: 1.2TB',
  '[15:07:41] [NET] Проверка сетевых интерфейсов...',
  '',
  'root@neurocascade:~$ ifconfig',
  'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
  '        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255',
  '        inet6 fe80::1  prefixlen 64  scopeid 0x20<link>',
  '        ether 00:15:5d:01:ca:05  txqueuelen 1000  (Ethernet)',
  '        RX packets 1235813  bytes 1.8 GB',
  '        RX errors 0  dropped 0  overruns 0  frame 0',
  '        TX packets 1147721  bytes 1.6 GB',
  '        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0',
  '',
  '[15:07:42] [INIT] Запуск воркеров...',
  'root@neurocascade:~$ ps aux | grep worker',
  'root      1337  0.0  0.0   8160  2.3M S    15:07   0:00 worker_1',
  'root      1338  0.0  0.0   8160  2.3M S    15:07   0:00 worker_2',
  'root      1339  0.0  0.0   8160  2.3M S    15:07   0:00 worker_3',
  'root      1340  0.0  0.0   8160  2.3M S    15:07   0:00 worker_4',
  '',
  '[15:07:42] [PROCESS] Начало агрегации...',
  'worker_1 | Обработка шарда 1/4: [##########] 100%',
  'worker_2 | Обработка шарда 2/4: [##########] 100%',
  'worker_3 | Обработка шарда 3/4: [##########] 100%',
  'worker_4 | Обработка шарда 4/4: [##########] 100%',
  '',
  '[15:07:43] [DEBUG] Проверка целостности данных...',
  'root@neurocascade:~$ sha256sum /var/data/shards/*',
  '6a1b2c3d4e5f... shard_1.dat',
  '7b2c3d4e5f6a... shard_2.dat',
  '8c3d4e5f6a7b... shard_3.dat',
  '9d4e5f6a7b8c... shard_4.dat',
  '',
  '[15:07:43] [INFO] Объединение результатов...',
  '[15:07:43] [SYS] Применение MapReduce...',
  '[15:07:43] [DEBUG] Оптимизация индексов...',
  '',
  'root@neurocascade:~$ df -h /var/data',
  'Filesystem      Size  Used  Avail Use% Mounted on',
  '/dev/sda1       1.2T  428G  772G  36% /var/data',
  '',
  '[15:07:44] [INFO] Сжатие данных...',
  'Compression ratio: 2.7:1',
  'Original size: 428GB',
  'Compressed size: 158GB',
  '',
  '[15:07:44] [SUCCESS] Агрегация завершена',
  '[15:07:44] [INFO] Генерация отчета...',
  '',
  'root@neurocascade:~$ cat /var/log/aggregation/summary.log',
  'Total records processed: 1,337,420',
  'Processing time: 183.5s',
  'Average throughput: 7,289 records/s',
  'Memory peak usage: 48.2GB',
  'CPU utilization: 92%',
  'Network I/O: 3.4GB/s',
  '',
  '[15:07:44] ✅ Агрегация успешно завершена!'
];

function SystemLoad() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOperation = async (operation) => {
    setLoading(true);
    setLogs([]);
    
    let logsToShow;
    switch(operation) {
      case 'search':
        logsToShow = searchLogs;
        break;
      case 'analyze':
        logsToShow = analyzeLogs;
        break;
      case 'aggregate':
        logsToShow = aggregateLogs;
        break;
      default:
        logsToShow = [];
    }

    // Выводим по 10 строк каждые 2мс
    for (let i = 0; i < logsToShow.length; i += 10) {
      const chunk = logsToShow.slice(i, i + 10);
      setLogs(prev => [...prev, ...chunk]);
      await new Promise(resolve => setTimeout(resolve, 2));
    }

    setLoading(false);
  };

  return (
    <StyledContainer maxWidth="lg">
      <Fade in timeout={1000}>
        <StyledPaper elevation={6}>
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              fontWeight: 'bold',
              marginBottom: 4
            }}
          >
            Системные операции
          </Typography>
          <Box 
            display="flex" 
            justifyContent="space-around" 
            mb={4}
            sx={{ gap: 2 }}
          >
            <StyledButton
              variant="contained"
              onClick={() => handleOperation('search')}
              disabled={loading}
            >
              🔍 Поиск
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() => handleOperation('analyze')}
              disabled={loading}
            >
              📊 Анализ
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() => handleOperation('aggregate')}
              disabled={loading}
            >
              📦 Агрегация
            </StyledButton>
          </Box>
          <Terminal elevation={3}>
            <Box p={2}>
              <Typography variant="body2" color="#00ff00" gutterBottom>
                root@neurocascade:~$ {loading ? 'processing...' : 'ready'}
              </Typography>
              {loading && (
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <CircularProgress size={20} color="success" />
                  <Typography variant="body2" color="#00ff00">
                    Выполнение операции...
                  </Typography>
                </Box>
              )}
              {logs.map((log, index) => (
                <Fade in timeout={500} key={index}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 1,
                      opacity: 0.9,
                      textShadow: '0 0 5px rgba(0, 255, 0, 0.5)',
                      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                    }}
                  >
                    {log}
                  </Typography>
                </Fade>
              ))}
            </Box>
          </Terminal>
        </StyledPaper>
      </Fade>
    </StyledContainer>
  );
}

export default SystemLoad; 