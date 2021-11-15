# keep-alive demo of umi-next

基于 react-router 6 的 keep-alive 实现

---

## 启动

```bash
# 先装依赖，pnpm yarn 应该都可以
npm run dev -- --vite
```

注：可能需要等以下两个 PR 处理，不然跑起来有问题

1. https://github.com/umijs/umi-next/pull/184
2. https://github.com/umijs/umi-next/pull/185

## 工作方式

使用 `<KeepOutlets />` 替换 `<Outlet />`

只有使用 `KeepOutlets` 标签才会有 `keep-alive` 效果

### 最大缓存数 max

使用 `max` 属性控制最大缓存数，默认不做限制

```jsx
<KeepOutlets max={10} />
```

### 排除路径 exclude

使用 `exclude` 排除不需要缓存的路径

```jsx
<KeepOutlets exclude={['/users/foo']} />
```

### 主动清除缓存

使用 `drop` 方法清除指定路由的缓存（激活状态下行为表现为 “刷新”）

```jsx
import { useKeepControl } from '../components/KeepOutlets'

function XXX() {
  const { drop } = useKeepControl()

  return (
    <button
      onClick={() => {
        drop('/users/foo')
      }}
    >
      清除 foo 缓存
    </button>
  )
}
```

### 其他功能

待补充

- [ ] 生命周期
- [ ] 更多的控制方法如 getKeepings、clear
- [ ] umi-next-plugin
- [ ] 打赏二维码
