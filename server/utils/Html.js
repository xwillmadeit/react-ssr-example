import React from 'react'
import serialize from 'serialize-javascript'
import _ from 'lodash'

const Html = ({ store, htmlContent }) => {
  const assets = webpackIsomorphicTools.assets()

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Styles will be presented in production with webpack extract text plugin */}
        {_.keys(assets.styles).map(style =>
          <link
            key={_.uniqueId()}
            href={assets.styles[style]}
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
          />
        )}
      </head>
      <body>
        <div
          id="root"
          // Rendering the route, which passed from server-side
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
        />

        <script
          // Store the initial state into window
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              store &&
              `window.__INITIAL_STATE__=${serialize(store.getState())};`
          }}
        />

        <script src={assets.javascript.vendor} />
        <script src={assets.javascript.app} />
      </body>
    </html>
  )
}

Html.defaultProps = { htmlContent: '' }

export default Html
