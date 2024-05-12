CREATE TABLE `partita` (
  `id` varchar(20) NOT NULL,
  `nome` varchar(20) NOT NULL,
  `numero` int(11) NOT NULL,
  `tentativi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `partita` ADD PRIMARY KEY (id);
ALTER TABLE `partita` ADD UNIQUE (id);
