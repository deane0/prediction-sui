'use client'

import React, { useEffect, useRef } from 'react'

let tvScriptLoadingPromise

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef<any>()

  useEffect(() => {
    onLoadScriptRef.current = createWidget

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script')
        script.id = 'tradingview-widget-loading-script'
        script.src = 'https://s3.tradingview.com/tv.js'
        script.type = 'text/javascript'
        script.onload = resolve

        document.head.appendChild(script)
      })
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current(),
    )

    return () => (onLoadScriptRef.current = null)

    function createWidget() {
      if (
        document.getElementById('tradingview_dbf69') &&
        'TradingView' in window
      ) {
        new (window.TradingView as any).widget({
          autosize: true,
          symbol: 'BINANCE:SUIUSDT',
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_dbf69',
        })
      }
    }
  }, [])

  return (
    <div className="tradingview-widget-container h-full">
      <div id="tradingview_dbf69" className="h-full" />
    </div>
  )
}
