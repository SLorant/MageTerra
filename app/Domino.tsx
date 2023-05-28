import { CSSProperties, Dispatch, FC, SetStateAction, useEffect, useState, memo, useRef } from 'react'
import { useDrag, useDragLayer, XYCoord } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import Image from 'next/image'

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  cursor: 'move',
}

export interface DominoProps {
  firstname: string
  secondname: string
  isDropped: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
  img: string
  secondimg: string
  isTurned: boolean
  setIsTurned: Dispatch<SetStateAction<boolean>>
}

export const Domino: FC<DominoProps> = memo(function Domino({
  firstname,
  secondname,
  isDropped,
  setIsActive,
  img,
  secondimg,
  isTurned,
  setIsTurned,
}) {
  const dominoRef = useRef<HTMLDivElement>(null)
  const [{ opacity, isDragging, didDrop }, drag] = useDrag(
    () => ({
      type: ItemTypes.FOREST,
      item: { firstname, secondname, img, secondimg },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.9 : 1,
        isDragging: monitor.isDragging() ? true : false,
        didDrop: monitor.didDrop() ? true : false,
      }),
    }),
    [firstname, secondname, img, secondimg],
  )
  useEffect(() => {
    !isDragging ? setIsActive(false) : ''
  }, [isDragging])
  const handleTurnClick = () => {
    setIsTurned(!isTurned)
  }

  return (
    <div className={`${isTurned ? 'h-[200px]' : 'w-[200px]'} flex  ml-20 justify-center items-center`}>
      <div ref={drag}>
        <div
          ref={dominoRef}
          style={{ ...style, opacity }}
          className={`${isTurned ? 'flex-col w-[80px] h-[160px]' : 'w-[160px] h-[80px]'} flex  mt-6`}>
          <div className={`w-[80px] h-[80px] ring-2 bg-yellow-500 ring-gray-200 shadow-lg z-20`} data-testid="Domino">
            <Image src={img} alt="kep" width={80} height={80} className="w-full h-full pbject-cover" />
          </div>
          <div className={`w-[80px] h-[80px] ring-2 bg-yellow-500 ring-gray-200 shadow-lg z-20`} data-testid="Domino">
            <Image src={secondimg} alt="kep" width={80} height={80} className="w-full h-full pbject-cover" />
          </div>
        </div>
      </div>
      <button className="ml-4" onClick={handleTurnClick}>
        Turn
      </button>
    </div>
  )
})
