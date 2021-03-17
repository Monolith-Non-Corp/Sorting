import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'
import { numbers, sorts } from './data'

const defaultColumns = 50
const defaultSpeed = 1000

export default function App() {
  const [columns, setColumns] = useState(numbers.slice(0, defaultColumns))
  const [size, setSize] = useState(defaultColumns)
  const [speed, setSpeed] = useState(defaultSpeed)
  const [sorting, setSorting] = useState(sorts[0])
  const [sortingData, setSortingData] = useState([])
  const [step, setStep] = useState(0)
  const [active, setActive] = useState(false)

  const activeRef = useRef(active)
  const stepRef = useRef(step)
  const sortingDataRef = useRef(sortingData)
  const speedRef = useRef(speed)
  activeRef.current = active
  stepRef.current = step
  sortingDataRef.current = sortingData
  speedRef.current = speed

  useEffect(() => {
    setTimeout(() => {
      if (activeRef.current && stepRef.current < sortingDataRef.current.length - 1) {
        setStep(prev => prev + 1)
      }
    }, 1000 - speedRef.current)
  }, [step, active])

  useEffect(() => {
    setColumns(sortingData.length > 0 && sortingData[step] || columns)
  }, [setColumns, step, sortingData])

  const captureSize = useCallback((e) => {
    setStep(0)
    setActive(false)
    setSortingData([])
    setSize(e.target.value)
    setColumns(numbers.slice(0, e.target.value))
  }, [setStep, setActive, setSortingData,setSize, setColumns])

  const captureSpeed = useCallback((e) => {
    setSpeed(e.target.value)
  }, [setSpeed])

  const captureStep = useCallback((e) => {
    setActive(false)
    setStep(parseInt(e.target.value))
    setColumns(sortingData[e.target.value])
  }, [setActive, setStep, setColumns, sortingData])

  const sort = useCallback(() => {
    const steps = [columns]
    sorting.fn({
      array: [...columns],
      steps: steps
    })
    setSortingData(steps)
  }, [setSortingData, sorting, columns])

  const begin = useCallback(() => {
    setActive(true)
    setStep(0)
    sort()
  }, [setActive, setStep, sort])

  const pause = useCallback(() => {
    setActive(false)
  }, [setActive])

  const forward = useCallback(() => {
    setActive(false)
    setStep(prev => prev < sortingData.length - 1 && prev + 1 || sortingData.length - 1)
  }, [setActive, setStep, sortingData])

  const backward = useCallback(() => {
    setActive(false)
    setStep(prev => prev > 0 && prev - 1 || 0)
  }, [setActive, setStep, sortingData])

  const resume = useCallback(() => {
    setActive(true)
  }, [setActive])

  const stop = useCallback(() => {
    setActive(false)
    setStep(0)
    setColumns(sortingData[0])
  }, [setActive, setStep, sortingData])

  return (
    <div className='container'>
      <div className='header'>
        <div className='amount'>
          <span>Number of columns</span>
          <input type="range" min="1" max="99" value={size} onChange={captureSize} />
        </div>
        <div className='speed'>
          <span>Play Speed</span>
          <input type="range" min="1" max="1000" value={speed} onChange={captureSpeed} />
        </div>
        <div className='sorting'>
          <span>Selected: {sorting.name}</span>
          {sorts.map((sorting) => (
            <div key={sorting.name}>
              <button onClick={() => setSorting(sorting)}>[{sorting.name}]</button>
            </div>
          ))}
        </div>
        <div className='control'>
          <div>
            <input type="range" min={0} max={sortingData.length > 0 ? sortingData.length - 1 : 0} defaultValue={0} value={step} onChange={captureStep} />
          </div>
          <button onClick={begin}>
            Begin
          </button>
          <button onClick={pause}>
            Pause
          </button>
          <button onClick={backward}>
            {'<--'}
          </button>
          <button onClick={forward}>
            {'-->'}
          </button>
          <button onClick={resume}>
            Resume
          </button>
          <button onClick={stop}>
            Stop
          </button>
        </div>
      </div>
      <div className='body'>
        {columns.map(({ value }) => (
          <div key={value} style={{
            height: `${5 + value / size * 95}%`,
            backgroundColor: `hsl(${50 + value / size * 150}, 50%, 50%)`,
            textAlign: 'center',
          }}>
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}