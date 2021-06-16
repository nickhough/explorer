import classNames from 'classnames'
import useToggle from '../../../utils/useToggle'
import ChevronIcon from '../../Icons/Chevron'

const ExpandButtonPill = ({
  className,
  details,
  pillSymbolClasses,
  pillColor,
}) => {
  return (
    <div className="cursor-pointer flex items-center justify-end">
      <div
        className={classNames('whitespace-nowrap hidden md:flex', className)}
        style={{ backgroundColor: pillColor }}
      >
        <span className="m-0">{details}</span>
      </div>
      <div
        className={classNames(
          'px-2 md:pl-1 md:pr-2 py-0.5 flex items-center justify-center rounded-full md:rounded-l-none md:rounded-r-full w-7 h-5 md:h-6',
          pillSymbolClasses,
        )}
        style={{ backgroundColor: pillColor }}
      >
        <ChevronIcon
          className={classNames(
            'transition-all duration-200 w-4 transform rotate-90 h-3',
          )}
        />
      </div>
    </div>
  )
}

const ActivityListItem = ({
  title,
  subtitle,
  details,
  linkTo,
  pillClasses,
  pillSymbolClasses,
  expandedContent,
  pillColor,
}) => {
  const [expanded, toggleExpanded] = useToggle()

  return (
    <div className="w-full flex flex-col" onClick={toggleExpanded}>
      <div className="w-full flex justify-between">
        <div className="w-full">
          <div className="text-sm md:text-base font-medium text-darkgray-800 font-sans">
            {title}
          </div>
          <div className="flex items-center space-x-1 md:space-x-4 h-6 text-gray-525 text-xs md:text-sm whitespace-nowrap">
            {subtitle}
          </div>
        </div>
        <ExpandButtonPill
          onClick={toggleExpanded}
          expanded={expanded}
          className={classNames(
            'flex flex-row pl-2 pr-1 py-0.5 font-sans rounded-l-full',
            pillClasses,
          )}
          pillColor={pillColor}
          pillSymbolClasses={pillSymbolClasses}
          details={details}
        />
      </div>
    </div>
  )
}
export default ActivityListItem