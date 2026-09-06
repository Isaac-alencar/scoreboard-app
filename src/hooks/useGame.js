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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [realtimeStatus, setRealtimeStatus] = useState('connecting')

  useEffect(() => {
    if (!gameId) {
      setLoading(false)
      return
    }

    let subscription
    let isCancelled = false

    async function fetchGame() {
      try {
        setLoading(true)
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
      } finally {
        if (!isCancelled) {
          setLoading(false)
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
        if (status === 'CHANNEL_ERROR') {
          // eslint-disable-next-line no-console
          console.error(`Realtime error for game ${gameId}`)
        }
      })

    return () => {
      isCancelled = true
      if (subscription) {
        supabase.removeChannel(subscription)
      }
    }
  }, [gameId])

  return { game, loading, error, realtimeStatus }
}
