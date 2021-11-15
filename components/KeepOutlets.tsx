import React from 'react'
import { useOutlet } from 'react-router-dom'
import { Freeze } from 'react-freeze'

interface IKeepCtx {
  drop: (path: string) => void
}

interface IKeepProps {
  exclude?: string[]
  max?: number
}

const keepContext = React.createContext<IKeepCtx>({
  drop: () => undefined,
})
const { Provider: KeepProvider } = keepContext

function useForcedUpdate(): [() => void, number] {
  const [key, setKey] = React.useState(Math.random)
  const forceUpdate = React.useCallback(() => setKey(Math.random), [])
  return [forceUpdate, key]
}

export function useKeepControl() {
  return React.useContext(keepContext)
}

export function useKeepOutlets({ exclude = [], max = Infinity }: IKeepProps = {}) {
  const { drop: dropOutside } = useKeepControl()
  const [forcedUpdate] = useForcedUpdate()
  const keepOutlets = React.useRef<any>({})
  const outletRenderKeys = React.useRef<any>({})
  const currentElement = useOutlet()

  const matchedPath = [...(currentElement?.props?.value?.matches ?? [])].pop()?.pathname
  if (matchedPath) {
    keepOutlets.current[matchedPath] = currentElement
    outletRenderKeys.current[matchedPath] = outletRenderKeys.current[matchedPath] ?? Math.random()
  }

  const drop = React.useCallback((path) => {
    delete keepOutlets.current[path]
    outletRenderKeys.current[path] = Math.random()

    if (typeof dropOutside === 'function') {
      dropOutside(path)
    }

    forcedUpdate()
  }, [])

  const ctxValue = React.useMemo(
    () => ({
      drop,
    }),
    [],
  )

  React.useEffect(() => {
    if (exclude.includes(matchedPath)) {
      return () => drop(matchedPath)
    }
  }, [matchedPath])

  const renderConfigs = Object.entries(keepOutlets.current).slice(-1 * max) // 限制最大渲染数

  keepOutlets.current = {} // 先清空，目的是应用最大渲染数

  return (
    <KeepProvider value={ctxValue}>
      {renderConfigs.map(([pathname, element]: any) => {
        keepOutlets.current[pathname] = element // 恢复幸存内容

        const outletRenderKey = outletRenderKeys.current[pathname]
        const isMatch = currentElement === element

        return (
          // @ts-ignore
          <Freeze key={outletRenderKey} freeze={!isMatch}>
            {element}
          </Freeze>
        )
      })}
    </KeepProvider>
  )
}

export default function KeepOutlets(props: IKeepProps) {
  return <>{useKeepOutlets(props)}</>
}
