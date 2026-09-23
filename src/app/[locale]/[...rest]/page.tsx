import { notFound } from 'next/navigation'

const CatchAllPage = (): never => notFound()

export default CatchAllPage

export const dynamicParams = true
