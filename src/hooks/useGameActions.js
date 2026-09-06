import { supabase } from '../lib/supabase'

/**
 * @typedef {Object} CreateGameInput
 * @property {string} homeTeamName
 * @property {string} awayTeamName
 * @property {number} periodDurationMinutes
 * @property {number} overtimeDurationMinutes
 * @property {number} totalPeriods
 */

/**
 * @param {CreateGameInput} input
 * @returns {Promise<{ id: string, controlToken: string }>}
 */
export async function createGame(input) {
  const { data, error } = await supabase
    .from('games')
    .insert({
      home_team_name: input.homeTeamName,
      away_team_name: input.awayTeamName,
      period_duration_seconds: input.periodDurationMinutes * 60,
      overtime_duration_seconds: input.overtimeDurationMinutes * 60,
      total_periods: input.totalPeriods,
      clock_seconds: input.periodDurationMinutes * 60,
    })
    .select('id, control_token')
    .single()

  if (error) {
    throw error
  }

  return {
    id: data.id,
    controlToken: data.control_token,
  }
}

/**
 * @param {string} gameId
 * @param {string} controlToken
 * @param {Partial<import('../types/game').Game>} updates
 */
export async function updateGame(gameId, controlToken, updates) {
  const { error } = await supabase
    .from('games')
    .update(updates)
    .eq('id', gameId)
    .eq('control_token', controlToken)

  if (error) {
    throw error
  }
}

/**
 * @param {string} gameId
 * @param {import('../types/game').GameEvent} event
 */
export async function addGameEvent(gameId, event) {
  const { error } = await supabase.from('game_events').insert({
    game_id: gameId,
    type: event.type,
    team: event.team,
    value: event.value,
    payload: event.payload,
  })

  if (error) {
    throw error
  }
}

/**
 * @param {string} gameId
 * @param {string} controlToken
 */
export async function finishGame(gameId, controlToken) {
  const { data: game, error: fetchError } = await supabase
    .from('games')
    .select('home_score, away_score')
    .eq('id', gameId)
    .eq('control_token', controlToken)
    .single()

  if (fetchError) {
    throw fetchError
  }

  const { error } = await supabase
    .from('games')
    .update({
      status: 'finished',
      final_home_score: game.home_score,
      final_away_score: game.away_score,
      finished_at: new Date().toISOString(),
    })
    .eq('id', gameId)
    .eq('control_token', controlToken)

  if (error) {
    throw error
  }
}

/**
 * @returns {Promise<import('../types/game').Game[]>}
 */
export async function fetchGames() {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data || []
}

/**
 * @returns {Promise<import('../types/game').Game[]>}
 */
export async function fetchFinishedGames() {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('status', 'finished')
    .order('finished_at', { ascending: false })

  if (error) {
    throw error
  }

  return data || []
}
