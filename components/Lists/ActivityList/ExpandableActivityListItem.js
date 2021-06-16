import classNames from 'classnames'
import useToggle from '../../../utils/useToggle'
import ChevronIcon from '../../Icons/Chevron'
import { Link } from 'react-router-i18n'
import useSelectedTxn from '../../../hooks/useSelectedTxn'
import useSelectedHotspot from '../../../hooks/useSelectedHotspot'

const ExpandButtonPill = ({
  className,
  details,
  expanded,
  pillSymbolClasses,
  pillColor,
}) => {
  return (
    <div className="cursor-pointer flex items-center justify-end">
      <div
        className={classNames('whitespace-nowrap hidden md:flex', className)}
        style={{ backgroundColor: pillColor }}
      >
        <span className="m-0 pr-2 pl-1">{details}</span>
      </div>
      <span
        className={classNames(
          'px-2 md:pl-1 md:pr-2 py-0.5 flex items-center justify-center rounded-full md:rounded-l-none md:rounded-r-full w-7 relative',
          pillSymbolClasses,
        )}
        style={{ backgroundColor: pillColor }}
      >
        <span className="bg-black opacity-20 hidden md:block absolute left-0 top-0 rounded-full md:rounded-l-none md:rounded-r-full w-7 h-full" />
        <span className="text-white z-10 hidden md:block">
          {expanded ? '-' : '+'}
        </span>
        <ChevronIcon
          className={classNames(
            'block md:hidden transition-all duration-200 w-4 transform h-3 text-white',
            { 'rotate-0': expanded, 'rotate-180': !expanded },
          )}
        />
      </span>
    </div>
  )
}

const ExpandableListItem = ({
  address,
  context,
  txn,
  title,
  subtitle,
  details,
  linkTo,
  pillColor,
  pillClasses,
  pillSymbolClasses,
  expandedContent,
}) => {
  const [expanded, toggleExpanded] = useToggle()

  const { selectTxn, clearSelectedTxn } = useSelectedTxn()
  const { selectHotspot, clearSelectedHotspot } = useSelectedHotspot()

  return (
    <div
      className="w-full flex flex-col"
      onClick={() => {
        if (!expanded) selectTxn(txn.hash)
        if (expanded) {
          clearSelectedTxn()
          if (context === 'hotspot') selectHotspot(address)
        }
        toggleExpanded()
      }}
    >
      <div className="w-full flex justify-between">
        <div className="w-full">
          <div className="text-sm md:text-base font-medium text-darkgray-800 font-sans">
            {title}
          </div>
          <div className="flex items-center space-x-2 md:space-x-4 h-6 text-gray-525 text-xs md:text-sm whitespace-nowrap">
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
      {expanded && (
        <div className="w-full py-2 flex flex-col justify-between">
          {expandedContent}
          <Link
            to={linkTo}
            // clear selected hotspot when navigating to selected transaction, this was causing a Mapbox error on mobile
            onClick={clearSelectedHotspot}
            className={classNames(
              'w-full bg-gray-300 hover:bg-gray-350 transition-all duration-200 cursor-pointer rounded-lg mt-2 flex items-center justify-center',
            )}
          >
            <p className="text-gray-600 font-sans text-sm p-2 m-0">
              View transaction details
            </p>
            <ChevronIcon
              className={classNames(
                'h-auto  text-gray-600 transition-all duration-200 w-4 transform rotate-90',
              )}
            />
          </Link>
        </div>
      )}
    </div>
  )
}
export default ExpandableListItem