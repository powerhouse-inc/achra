import SimpleBar from 'simplebar-react'

interface MaybeScrollableListProps extends React.PropsWithChildren {
  scrollable: boolean
}

const MaybeScrollableList: React.FC<MaybeScrollableListProps> = ({ scrollable, children }) =>
  scrollable ? (
    <SimpleBar
      style={{
        height: 150,
      }}
      autoHide={false}
    >
      <ul className="flex h-full flex-col gap-2 p-0">{children}</ul>
    </SimpleBar>
  ) : (
    <ul className="flex h-full flex-col gap-2 p-0">{children}</ul>
  )

export default MaybeScrollableList
