-- Habilita extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tipos enumerados
CREATE TYPE game_status AS ENUM ('upcoming', 'live', 'finished');
CREATE TYPE game_event_type AS ENUM (
  'score',
  'foul',
  'period_change',
  'clock_start',
  'clock_stop',
  'clock_reset',
  'overtime_start',
  'team_edit',
  'game_finished'
);
CREATE TYPE team_side AS ENUM ('home', 'away');

-- Tabela principal de jogos (estado atual)
CREATE TABLE games (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  status game_status NOT NULL DEFAULT 'upcoming',

  -- Times
  home_team_name text NOT NULL DEFAULT 'Casa',
  away_team_name text NOT NULL DEFAULT 'Visitante',

  -- Pontuação e faltas
  home_score integer NOT NULL DEFAULT 0,
  away_score integer NOT NULL DEFAULT 0,
  home_fouls integer NOT NULL DEFAULT 0,
  away_fouls integer NOT NULL DEFAULT 0,

  -- Período
  period integer NOT NULL DEFAULT 1,
  is_overtime boolean NOT NULL DEFAULT false,

  -- Cronômetro
  clock_running boolean NOT NULL DEFAULT false,
  clock_seconds integer NOT NULL DEFAULT 600,
  clock_updated_at timestamptz NOT NULL DEFAULT now(),

  -- Configurações do jogo
  period_duration_seconds integer NOT NULL DEFAULT 600,
  overtime_duration_seconds integer NOT NULL DEFAULT 300,
  total_periods integer NOT NULL DEFAULT 4,

  -- Segurança do controle
  control_token uuid NOT NULL DEFAULT uuid_generate_v4(),

  -- Histórico ao finalizar
  final_home_score integer,
  final_away_score integer,
  finished_at timestamptz,

  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Índices
CREATE UNIQUE INDEX games_control_token_idx ON games(control_token);
CREATE INDEX games_status_created_at_idx ON games(status, created_at DESC);

-- Tabela de eventos (log append-only)
CREATE TABLE game_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id uuid NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  type game_event_type NOT NULL,
  team team_side,
  value integer,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX game_events_game_id_idx ON game_events(game_id, created_at DESC);

-- RLS
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_events ENABLE ROW LEVEL SECURITY;

-- Leitura pública
CREATE POLICY "games_public_read"
  ON games FOR SELECT
  USING (true);

CREATE POLICY "game_events_public_read"
  ON game_events FOR SELECT
  USING (true);

-- Escrita: MVP com validação do control_token na aplicação.
-- A segurança vem do token secreto na URL de controle.
-- Para reforçar no banco no futuro, migrar para RPCs ou policies por token.
CREATE POLICY "games_public_insert"
  ON games FOR INSERT
  WITH CHECK (true);

CREATE POLICY "games_public_update"
  ON games FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "game_events_public_insert"
  ON game_events FOR INSERT
  WITH CHECK (true);

-- Trigger para manter updated_at atualizado
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER games_updated_at
  BEFORE UPDATE ON games
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
