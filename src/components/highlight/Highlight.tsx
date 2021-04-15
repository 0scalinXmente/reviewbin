import React, { PropsWithChildren } from 'react'
import { CSSProperties } from 'styled-components'

export type LineWrapperProps = PropsWithChildren<{
  lineNumber: number
  codeLine: JSX.Element[]
}>

const highlighter = ({
  onlyLine,
  codeMirror,
  value,
  language,
  lineWrapper = ({ children }) => <>{children}</>,
  prefix = 'cm-',
}: {
  onlyLine?: number
  codeMirror: any
  value: string
  language: string
  lineWrapper?: (props: LineWrapperProps) => JSX.Element
  prefix?: string
}) => {
  const elements: JSX.Element[] = []
  let line: JSX.Element[] = []
  let lineNumber = 0
  let index = 0
  let lastStyle: string | null = null
  let tokenBuf = ''

  const pushToken = (token: string, style: string | null) => {
    line.push(
      <span
        className={style ? prefix + style : ''}
        key={`token--${lineNumber}--${++index}`}>
        {token}
      </span>
    )
  }

  const pushLine = () => {
    lineNumber++
    if (!onlyLine || (onlyLine && onlyLine === lineNumber)) {
      elements.push(
        <React.Fragment key={lineNumber}>
          {lineWrapper({
            lineNumber: lineNumber,
            codeLine: line,
          })}
        </React.Fragment>
      )
    }
    line = []
  }

  const mode = codeMirror.findModeByName(language)
  codeMirror.runMode(
    value,
    mode ? mode.mime : language,
    (token: string, style: string | null) => {
      if (token === '\n') {
        tokenBuf += token
        pushToken(tokenBuf, lastStyle)
        pushLine()
        tokenBuf = ''
      } else if (lastStyle === style) {
        tokenBuf += token
        lastStyle = style
      } else {
        if (tokenBuf) {
          pushToken(tokenBuf, lastStyle)
        }
        tokenBuf = token
        lastStyle = style
      }
    }
  )

  pushToken(tokenBuf, lastStyle)

  pushLine()

  return elements
}

export const Highlight = ({
  code,
  language,
  onlyLine,
  lineWrapper,
  codeWrapper = ({ children }) => <>{children}</>,
  style,
}: {
  onlyLine?: number
  code: string
  language: string
  lineWrapper?: (props: LineWrapperProps) => JSX.Element
  codeWrapper?: (props: PropsWithChildren<{}>) => JSX.Element
  style?: CSSProperties
}) => {
  const prefix = 'cm-'

  let CodeMirror = null
  if (
    typeof window !== 'undefined' &&
    typeof window.navigator !== 'undefined'
  ) {
    CodeMirror = require('codemirror')
    require('codemirror/addon/runmode/runmode')
    require('codemirror/mode/meta')
    require('codemirror/mode/jsx/jsx')
    require('codemirror/mode/python/python')
    require('codemirror/mode/clike/clike')
    require('codemirror/mode/javascript/javascript')
    // TODO find a better way to import those languages
  }

  return (
    <>
      {CodeMirror && (
        <pre style={style} className={`${prefix}s-solarized`}>
          {codeWrapper({
            children: highlighter({
              onlyLine,
              codeMirror: CodeMirror,
              value: code,
              language,
              lineWrapper,
            }),
          })}
        </pre>
      )}
    </>
  )
}
