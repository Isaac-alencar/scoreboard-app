import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

/**
 * @param {string | undefined} gameId
 * @returns {{
 *   game: import('../types/game').Game | null
 *   loading: boolean
 *   error: Error | null
 *   realtimeStatus: string
 * }}
 */
export function useGame(gameId) {
  const [game, setGame] = useState(null)
  const [error, setError] = useState(null)
  const [realtimeStatus, setRealtimeStatus] = useState('connecting')

  useEffect(() => {
    if (!gameId) return

    let subscription
    let isCancelled = false

    async function fetchGame() {
      try {
        const { data, error: fetchError } = await supabase
          .from('games')
          .select('*')
          .eq('id', gameId)
          .single()

        if (isCancelled) return

        if (fetchError) {
          throw fetchError
        }

        setGame(data)
        setError(null)
      } catch (err) {
        if (!isCancelled) {
          setError(err)
        }
      }
    }

    fetchGame()

    subscription = supabase
      .channel(`game:${gameId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'games',
          filter: `id=eq.${gameId}`,
        },
        (payload) => {
          if (payload.new) {
            setGame(payload.new)
          }
        }
      )
      .subscribe((status) => {
        setRealtimeStatus(status)
      })

    return () => {
      isCancelled = true
      if (subscription) {
        supabase.removeChannel(subscription)
      }
    }
  }, [gameId])

  const loading = game === null && error === null && !!gameId

  return { game, loading, error, realtimeStatus }
}
