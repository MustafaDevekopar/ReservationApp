
type Props = {
    Color: string,
    Text: string,
}

const ExplanatoryIcons = ({Color, Text}: Props) => {
  return (
    <div className="flex gap-2">
        <span className={`w-5 h-6 rounded ${Color}`}></span>
        <span className="text-sm text-DarkGray">{Text}</span>
    </div>
  )
}

export default ExplanatoryIcons