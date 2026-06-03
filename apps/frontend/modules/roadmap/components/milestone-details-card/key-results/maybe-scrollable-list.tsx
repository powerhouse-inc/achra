import SimpleBar from 'simplebar-react'

interface MaybeScrollableListProps extends React.PropsWithChildren {
  scrollable: boolean
}

function MaybeScrollableList({ scrollable, children }: MaybeScrollableListProps) {
  if (scrollable) {
    return (
      <SimpleBar
        style={{
          height: 170,
          marginRight: -8,
          paddingRight: 8,
        }}
        autoHide={false}
      >
        <ul className="flex h-full flex-col gap-2 p-0">{children}</ul>
      </SimpleBar>
    )
  }
  return <ul className="flex h-full flex-col gap-2 p-0">{children}</ul>
}

export { MaybeScrollableList }
