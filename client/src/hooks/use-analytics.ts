import { useCallback } from "react"

type AnalyticsEvent = {
  event: string
  buttonName: string
  location: string
  timestamp: string
}

export function useAnalytics() {
  const trackButtonClick = useCallback((buttonName: string, location: string) => {
    const event: AnalyticsEvent = {
      event: 'button_click',
      buttonName,
      location,
      timestamp: new Date().toISOString()
    }

    // For now, we'll just log to console, but this could be extended to send to an analytics service
    console.log('Analytics Event:', event)

    // You could also send this to your backend API
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    }).catch(error => {
      console.error('Failed to send analytics:', error)
    })
  }, [])

  return { trackButtonClick }
}
