-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17-Jun-2023 às 06:02
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `app_scf`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `checklist`
--

CREATE TABLE `checklist` (
  `id` int(11) NOT NULL,
  `typeVehicle` enum('passeio','caminhonete','caminhao','carreta','van') NOT NULL,
  `options` longtext DEFAULT NULL,
  `commonOptions` longtext DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `checklist`
--

INSERT INTO `checklist` (`id`, `typeVehicle`, `options`, `commonOptions`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'passeio', '[{\"fileName\":\"airbags\",\"title\":\"Airbags em bom estado?\"},{\"fileName\":\"retrovisor\",\"title\":\"Retrovisor interno em bom estado?\"},{\"fileName\":\"painel\",\"title\":\"Possui algum luz de alerta no painel?\"},{\"fileName\":\"alarme\",\"title\":\"Sistema de alarme em bom estado?\"}]', '[{\"fileName\":\"commonPneus\",\"title\":\"Pneus calibrados e em bom estado?\"},{\"fileName\":\"commonFluidos\",\"title\":\"Níveis de óleo, água e fluidos normais?\"},{\"fileName\":\"commonParabrisa\",\"title\":\"Limpadores de para-brisa funcionando corretamente?\"},{\"fileName\":\"commonIluminacao\",\"title\":\"Faróis, lanternas e luzes de freio em bom funcionamento?\"}]', '2023-06-16 23:33:52.502091', '2023-06-16 23:33:52.502091', NULL),
(2, 'caminhonete', '[{\"fileName\":\"tracao\",\"title\":\"Sistema de tração nas quatro rodas funcionando?\"},{\"fileName\":\"cacamba\",\"title\":\"Caçamba com proteção em bom estado?\"},{\"fileName\":\"reboque\",\"title\":\"Engate de reboque em bom estado?\"},{\"fileName\":\"barraProtecao\",\"title\":\"Barras de proteção lateral em bom estado?\"}]', '[{\"fileName\":\"commonPneus\",\"title\":\"Pneus calibrados e em bom estado?\"},{\"fileName\":\"commonFluidos\",\"title\":\"Níveis de óleo, água e fluidos normais?\"},{\"fileName\":\"commonParabrisa\",\"title\":\"Limpadores de para-brisa funcionando corretamente?\"},{\"fileName\":\"commonIluminacao\",\"title\":\"Faróis, lanternas e luzes de freio em bom funcionamento?\"}]', '2023-06-16 23:33:52.502604', '2023-06-16 23:33:52.502604', NULL),
(3, 'caminhao', '[{\"fileName\":\"freioAr\",\"title\":\"Freio a ar ativando normalmente?\"},{\"fileName\":\"diferencial\",\"title\":\"Bloqueio de diferencial ativando normalmente\"},{\"fileName\":\"cameraRe\",\"title\":\"Sistema de câmera de ré em bom estado?\"},{\"fileName\":\"pneusCarga\",\"title\":\"Está com pneus adequados para carga?\"}]', '[{\"fileName\":\"commonPneus\",\"title\":\"Pneus calibrados e em bom estado?\"},{\"fileName\":\"commonFluidos\",\"title\":\"Níveis de óleo, água e fluidos normais?\"},{\"fileName\":\"commonParabrisa\",\"title\":\"Limpadores de para-brisa funcionando corretamente?\"},{\"fileName\":\"commonIluminacao\",\"title\":\"Faróis, lanternas e luzes de freio em bom funcionamento?\"}]', '2023-06-16 23:33:52.506707', '2023-06-16 23:33:52.506707', NULL),
(4, 'carreta', '[{\"fileName\":\"eixosTandem\",\"title\":\"Eixos tandem apresenta alguma avaria?\"},{\"fileName\":\"freioEletronico\",\"title\":\"Sistema de freio eletrônico ativando normalmente?\"},{\"fileName\":\"suspencaoAr\",\"title\":\"Sistema de suspensão a ar funcionando normalmente?\"},{\"fileName\":\"iluminacao\",\"title\":\"Sistema de iluminação adequado?\"}]', '[{\"fileName\":\"commonPneus\",\"title\":\"Pneus calibrados e em bom estado?\"},{\"fileName\":\"commonFluidos\",\"title\":\"Níveis de óleo, água e fluidos normais?\"},{\"fileName\":\"commonParabrisa\",\"title\":\"Limpadores de para-brisa funcionando corretamente?\"},{\"fileName\":\"commonIluminacao\",\"title\":\"Faróis, lanternas e luzes de freio em bom funcionamento?\"}]', '2023-06-16 23:33:52.508785', '2023-06-16 23:33:52.508785', NULL),
(5, 'van', '[{\"fileName\":\"bancos\",\"title\":\"Possui bancos adicionais para passageiros?\"},{\"fileName\":\"portaLateral\",\"title\":\"Porta lateral deslizante em bom estado?\"},{\"fileName\":\"climatizador\",\"title\":\"Climatizador de ar funcionando normalmente?\"}]', '[{\"fileName\":\"commonPneus\",\"title\":\"Pneus calibrados e em bom estado?\"},{\"fileName\":\"commonFluidos\",\"title\":\"Níveis de óleo, água e fluidos normais?\"},{\"fileName\":\"commonParabrisa\",\"title\":\"Limpadores de para-brisa funcionando corretamente?\"},{\"fileName\":\"commonIluminacao\",\"title\":\"Faróis, lanternas e luzes de freio em bom funcionamento?\"}]', '2023-06-16 23:33:52.522637', '2023-06-16 23:33:52.522637', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `checklist-vehicle`
--

CREATE TABLE `checklist-vehicle` (
  `id` int(11) NOT NULL,
  `kmAtual` int(11) NOT NULL,
  `type` enum('entrada','saida') NOT NULL,
  `options` longtext DEFAULT NULL,
  `vehicleId` int(11) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `permissions` text DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `roles`
--

INSERT INTO `roles` (`id`, `name`, `permissions`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Admin', '', '2023-06-13 21:16:00.382206', '2023-06-13 21:16:00.382206', NULL),
(2, 'Gerente', '', '2023-06-13 21:16:00.384625', '2023-06-13 21:16:00.384625', NULL),
(3, 'Administrativo', '', '2023-06-13 21:16:00.384985', '2023-06-13 21:16:00.384985', NULL),
(4, 'Financeiro', '', '2023-06-13 21:16:00.385622', '2023-06-13 21:16:00.385622', NULL),
(5, 'Motorista', '', '2023-06-13 21:16:00.395142', '2023-06-13 21:16:00.395142', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('ativo','inativo') NOT NULL DEFAULT 'ativo',
  `roleId` int(11) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `cep` varchar(20) DEFAULT NULL,
  `state` varchar(4) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `neighborhoods` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `complement` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`createdAt`, `updatedAt`, `deletedAt`, `id`, `name`, `email`, `password`, `status`, `roleId`, `street`, `cep`, `state`, `city`, `neighborhoods`, `number`, `complement`) VALUES
('2023-06-16 22:25:39.261489', '2023-06-16 22:25:39.261489', NULL, 1, 'Unileste Teste', 'uni@gmail.com', '$2b$10$Wpe4YxgpzlY1HgQPG.aq/O83In.ZEF8wlZxAx.Lu.PsSgQOlCrrlq', 'ativo', 1, 'Rua A', '12345-678', 'Mina', 'Coronel Fabriciano', 'Centro', '123', 'Campus'),
('2023-06-16 22:25:39.262580', '2023-06-16 22:25:39.262580', NULL, 2, 'Patricia Oliveira', 'patricia.oliveira@example.com', '$2b$10$2/Kii3kyHbr6sToQyLbZ..rQfkXnH7.r2V8Bs0ZcVBHSTaZN7zSZi', 'ativo', 2, 'Rua J', '13579-246', 'Para', 'Curitiba', 'Batel', '654', NULL),
('2023-06-16 22:25:39.264627', '2023-06-16 22:25:39.264627', NULL, 3, 'Lucas Santos', 'lucas.santos@example.com', '$2b$10$Pwmm.jPc1pYK8gSQtvHPDOJozxXlC/gOOXWRLnykcv.Fsct.HxI5K', 'ativo', 1, 'Rua G', '54321-678', 'Bahi', 'Salvador', 'Pituba', '654', NULL),
('2023-06-16 22:25:39.265161', '2023-06-16 22:25:39.265161', NULL, 4, 'Ana Ferreira', 'ana.ferreira@example.com', '$2b$10$w1D3DZgIDRBRlxAkH7kyRO3ie.y1ieeA9MMBUj0Mvw8094SQaMHxS', 'ativo', 2, 'Rua D', '13579-246', 'Rio ', 'Porto Alegre', 'Moinhos de Vento', '246', NULL),
('2023-06-16 22:25:39.322700', '2023-06-16 22:25:39.322700', NULL, 5, 'João Silva', 'joao.silva@example.com', '$2b$10$V/RUuFqzEbDOePyNyKw2YO.zrZ7RYMcxEGG9erLJOLovj4mQt4uHy', 'ativo', 1, 'Rua A', '12345-678', 'São ', 'São Paulo', 'Centro', '123', 'Apartmento 456'),
('2023-06-16 22:25:39.323399', '2023-06-16 22:25:39.323399', NULL, 6, 'José Pereira', 'jose.pereira@example.com', '$2b$10$LdpJ5RP/fb0FumBc67GrmuG0BBRKPn22qppBGtU2M1m9WNoIlzWQG', 'inativo', 1, 'Rua C', '54321-987', 'Mina', 'Belo Horizonte', 'Savassi', '789', NULL),
('2023-06-16 22:25:39.324142', '2023-06-16 22:25:39.324142', NULL, 7, 'Rafael Silva', 'rafael.silva@example.com', '$2b$10$CPW5nBMa7EhWSs//3iLzAeXph3qft/vRRbB6eL5hTII6VX5C00Xxa', 'ativo', 1, 'Avenida K', '97531-864', 'Pará', 'Belém', 'Nazaré', '987', NULL),
('2023-06-16 22:25:39.326009', '2023-06-16 22:25:39.326009', NULL, 8, 'Maria Santos', 'maria.santos@example.com', '$2b$10$YFgUEfYsqg5dB7otYoQKVeiNqniPYdYwnFcHeo6sEJgIDhFv1LaZC', 'ativo', 2, 'Avenida B', '87654-321', 'Rio ', 'Rio de Janeiro', 'Copacabana', '456', NULL),
('2023-06-16 22:25:39.383434', '2023-06-16 22:25:39.383434', NULL, 9, 'Pedro Gomes', 'pedro.gomes@example.com', '$2b$10$9DvBAPg28XBn.n3bcExdye/NBSEiENkg3h.BBgYwGcwsH5QbtclJC', 'inativo', 1, 'Avenida E', '97531-864', 'Rio ', 'Pelotas', 'Centro', '864', NULL),
('2023-06-16 22:25:39.386834', '2023-06-16 22:25:39.386834', NULL, 10, 'Juliana Lima', 'juliana.lima@example.com', '$2b$10$S3YhXCkSYf7BkH69uRlNW.XNz0BsoA4sp8C83cHSM4VdNMbYhlIN2', 'ativo', 2, 'Avenida H', '87654-321', 'Goiá', 'Goiânia', 'Setor Bueno', '987', NULL),
('2023-06-16 22:25:39.387269', '2023-06-16 22:25:39.387269', NULL, 11, 'Carla Oliveira', 'carla.oliveira@example.com', '$2b$10$j.dtLF5SlEqwCZ5bdEjCoOJa589l37WH6I9rKhEnbPsnNeLERG5ge', 'ativo', 2, 'Rua F', '13579-864', 'São ', 'Ribeirão Preto', 'Jardim Paulista', '987', NULL),
('2023-06-16 22:25:39.390483', '2023-06-16 22:25:39.390483', NULL, 12, 'Fernando Souza', 'fernando.souza@example.com', '$2b$10$wk9tfwp5.56CXdhgZv6KleeqSruemI.ziKfuzYj4FqOYsMGNBAk1e', 'ativo', 1, 'Rua I', '54321-987', 'Sant', 'Florianópolis', 'Centro', '321', 'Sala 123'),
('2023-06-16 22:25:39.443995', '2023-06-16 22:25:39.443995', NULL, 13, 'Mariana Costa', 'mariana.costa@example.com', '$2b$10$.9dQ1/fr7EiB5NbNuXq1yeB20.BLfzSJDBF9t31gngjrTjmbKqALW', 'ativo', 2, 'Rua L', '13579-864', 'Amaz', 'Manaus', 'Centro', '246', NULL),
('2023-06-16 22:25:39.446425', '2023-06-16 22:25:39.446425', NULL, 14, 'Larissa Lima', 'larissa.lima@example.com', '$2b$10$V2OebqYuqCrjpbkgfgn8POyewgSXDvo7nWojtpYxl4CW/PZSL5JIS', 'ativo', 2, 'Avenida N', '87654-321', 'Pern', 'Recife', 'Boa Viagem', '456', NULL),
('2023-06-16 22:25:39.448383', '2023-06-16 22:25:39.448383', NULL, 15, 'Guilherme Santos', 'guilherme.santos@example.com', '$2b$10$G6SOCo7MUP8Tap0NfLuJJubBA0AN9iAAhD4G639TGCMj2FR2wRZVS', 'ativo', 1, 'Rua M', '54321-678', 'Cear', 'Fortaleza', 'Aldeota', '123', NULL),
('2023-06-16 22:25:39.449895', '2023-06-16 22:25:39.449895', NULL, 16, 'Rodrigo Oliveira', 'rodrigo.oliveira@example.com', '$2b$10$6GAIaGT/z4KXjZTQij9EGuww5mXhA9oRyWuJ7Z1FCofTe8qGQj8m2', 'ativo', 1, 'Rua O', '54321-987', 'Mato', 'Cuiabá', 'Centro', '789', 'Sala 456');

-- --------------------------------------------------------

--
-- Estrutura da tabela `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `model` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `yearManufacture` varchar(255) NOT NULL,
  `plate` varchar(255) NOT NULL,
  `dateAcquisition` datetime NOT NULL,
  `type` enum('passeio','caminhonete','caminhao','carreta','van') NOT NULL,
  `status` enum('ativo','inativo') NOT NULL DEFAULT 'ativo',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `vehicles`
--

INSERT INTO `vehicles` (`id`, `model`, `image`, `yearManufacture`, `plate`, `dateAcquisition`, `type`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Gol', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/car.png', '2019-01-01T00:00:00.000Z', 'ABC-1234', '2020-06-14 21:00:00', 'passeio', 'ativo', '2023-06-13 21:16:00.698176', '2023-06-14 09:34:58.256334', NULL),
(2, 'Onix', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/car.png', '2020-04-01T00:00:00.000Z', 'DEF-5678', '2020-10-19 21:00:00', 'passeio', 'ativo', '2023-06-13 21:16:00.698986', '2023-06-14 09:35:04.066090', NULL),
(3, 'Hilux', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/hilux.png', '2018-06-01T00:00:00.000Z', 'JKL-3456', '2019-03-04 21:00:00', 'caminhonete', 'ativo', '2023-06-13 21:16:00.699548', '2023-06-14 09:39:27.331641', NULL),
(4, 'S10', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/hilux.png', '2022-03-01T00:00:00.000Z', 'MNO-7890', '2022-06-29 21:00:00', 'caminhonete', 'ativo', '2023-06-13 21:16:00.699799', '2023-06-14 09:39:29.710082', NULL),
(5, 'Volvo FH', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/truck.png', '2020-01-01T00:00:00.000Z', 'STU-5678', '2020-08-21 21:00:00', 'carreta', 'ativo', '2023-06-13 21:16:00.700368', '2023-06-14 09:35:41.737645', NULL),
(6, 'Corolla', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/car.png', '2021-09-01T00:00:00.000Z', 'GHI-9012', '2021-12-09 21:00:00', 'passeio', 'inativo', '2023-06-13 21:16:00.699303', '2023-06-14 09:35:09.706270', NULL),
(7, 'HR', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/truck2.png', '2017-08-01T00:00:00.000Z', 'PQR-1234', '2018-02-11 22:00:00', 'caminhao', 'inativo', '2023-06-13 21:16:00.700068', '2023-06-14 09:36:50.277545', NULL),
(8, 'Mercedes-Benz Actros', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/truck3.png', '2019-10-01T00:00:00.000Z', 'YZA-3456', '2020-04-14 21:00:00', 'carreta', 'ativo', '2023-06-13 21:16:00.700789', '2023-06-14 09:36:58.494143', NULL),
(9, 'Scania R440', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/truck.png', '2022-05-01T00:00:00.000Z', 'VWX-9012', '2022-09-04 21:00:00', 'carreta', 'ativo', '2023-06-13 21:16:00.701200', '2023-06-14 09:36:31.368752', NULL),
(10, 'Fiesta', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/car.png', '2015-02-01T00:00:00.000Z', 'BCD-7890', '2016-07-07 21:00:00', 'passeio', 'ativo', '2023-06-13 21:16:00.701484', '2023-06-14 09:35:15.211416', NULL),
(11, 'Amarok', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/hilux.png', '2021-12-01T00:00:00.000Z', 'HIJ-5678', '2022-03-09 21:00:00', 'caminhonete', 'ativo', '2023-06-13 21:16:00.708262', '2023-06-14 09:39:34.527744', NULL),
(12, 'Civic', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/car.png', '2023-01-01T00:00:00.000Z', 'EFG-1234', '2023-04-30 21:00:00', 'passeio', 'ativo', '2023-06-13 21:16:00.708951', '2023-06-14 09:35:20.051346', NULL),
(13, 'Ducato', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/truck3.png', '2019-04-01T00:00:00.000Z', 'KLM-9012', '2019-07-17 21:00:00', 'van', 'ativo', '2023-06-13 21:16:00.709384', '2023-06-14 09:36:08.415696', NULL),
(14, 'Bitrem', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/truck.png', '2022-07-01T00:00:00.000Z', 'NOP-3456', '2022-10-24 21:00:00', 'carreta', 'ativo', '2023-06-13 21:16:00.709644', '2023-06-14 09:35:43.759606', NULL),
(15, 'Uno', 'https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/car.png', '2017-05-01T00:00:00.000Z', 'QRS-7890', '2017-09-05 21:00:00', 'passeio', 'ativo', '2023-06-13 21:16:00.710189', '2023-06-14 09:35:21.954118', NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `checklist`
--
ALTER TABLE `checklist`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `checklist-vehicle`
--
ALTER TABLE `checklist-vehicle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ecc3514abc910b0c0653e69822f` (`vehicleId`);

--
-- Índices para tabela `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_368e146b785b574f42ae9e53d5e` (`roleId`);

--
-- Índices para tabela `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `checklist`
--
ALTER TABLE `checklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `checklist-vehicle`
--
ALTER TABLE `checklist-vehicle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `checklist-vehicle`
--
ALTER TABLE `checklist-vehicle`
  ADD CONSTRAINT `FK_ecc3514abc910b0c0653e69822f` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
