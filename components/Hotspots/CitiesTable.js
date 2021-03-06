import { useState, useEffect } from 'react'
import { Table } from 'antd'
import ReactCountryFlag from 'react-country-flag'
import { Pagination } from 'antd'
import classNames from 'classnames'
import { Checkbox } from 'antd'

const CitiesTable = ({ topCities, topCitiesTotal }) => {
  const PAGE_SIZE_DEFAULT = 10
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DEFAULT)

  const [excludeOfflineHotspots, setExcludeOfflineHotspots] = useState(true)
  const updateShowOffline = (e) => {
    setExcludeOfflineHotspots(e.target.checked)
  }

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current)
    setPageSize(pagination.pageSize)
  }

  const sortAndSliceArray = (array) => {
    return array
      .sort((a, b) =>
        a.hotspotCount < b.hotspotCount
          ? 1
          : a.hotspotCount > b.hotspotCount
          ? -1
          : 0,
      )
      .slice(0, 100)
      .map((c, i) => ({ ...c, rank: i + 1 }))
  }

  const top100Online = sortAndSliceArray(topCities)
  const top100Total = sortAndSliceArray(topCitiesTotal)

  const [citiesToDisplayArray, setCitiesToDisplayArray] = useState(top100Online)

  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLast = currentPage * pageSize
  const indexOfFirst = indexOfLast - pageSize

  useEffect(() => {
    if (excludeOfflineHotspots) {
      setCitiesToDisplayArray(top100Online)
    } else {
      setCitiesToDisplayArray(top100Total)
    }
  }, [excludeOfflineHotspots])

  const currentPageOfCities = citiesToDisplayArray.slice(
    indexOfFirst,
    indexOfLast,
  )

  const citiesColumns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (data) => <span>{data}</span>,
    },
    {
      title: '# Hotspots Deployed',
      dataIndex: excludeOfflineHotspots ? 'online_count' : 'hotspot_count',
      key: excludeOfflineHotspots ? 'online_count' : 'hotspot_count',
      render: (data) => (
        <span className="text-purple-700 font-semibold">{data}</span>
      ),
    },
    {
      title: 'City',
      dataIndex: 'long_city',
      key: 'long_city',
      render: (data) => <span>{data}</span>,
    },
    {
      title: 'Region',
      dataIndex: 'long_state',
      key: 'long_state',
      render: (data) => <span>{data}</span>,
    },
    {
      title: 'Country',
      dataIndex: 'long_country',
      key: 'long_country',
      render: (data, row) => (
        <div className="flex items-center justify-start">
          <ReactCountryFlag countryCode={row.short_country} svg />
          <div className="mr-2" />
          <span className="m-0 p-0">{data}</span>
        </div>
      ),
    },
  ]

  return (
    <>
      <div className="hidden md:block">
        <div className="px-5">
          <span className="ant-checkbox-override-purple">
            <Checkbox
              onChange={updateShowOffline}
              checked={excludeOfflineHotspots}
              style={{ color: '#888', marginLeft: '5px', marginBottom: '4px' }}
            >
              Exclude offline hotspots
            </Checkbox>{' '}
          </span>
        </div>
        <Table
          dataSource={citiesToDisplayArray}
          columns={citiesColumns}
          size="small"
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize,
            showSizeChanger: topCities.length > PAGE_SIZE_DEFAULT,
            hideOnSinglePage: topCities.length <= PAGE_SIZE_DEFAULT,
            pageSizeOptions: [5, 10, 20, 50, 100],
            position: ['bottomCenter'],
          }}
          onChange={handleTableChange}
          scroll={{ x: true }}
        />
      </div>
      <div className="block md:hidden">
        <div className="px-5">
          <span className="ant-checkbox-override-purple">
            <Checkbox
              onChange={updateShowOffline}
              checked={excludeOfflineHotspots}
              style={{ color: '#888', marginLeft: '5px', marginBottom: '8px' }}
            >
              Exclude offline hotspots
            </Checkbox>
          </span>
        </div>
        <div className="flex flex-col px-5 mb-2">
          {currentPageOfCities.map((c, i, { length }) => {
            return (
              <div
                className={classNames(
                  'relative flex flex-col border-t border-0 border-l border-r border-solid border-gray-500',
                  {
                    'rounded-t-lg': i === 0,
                    'rounded-b-lg border-b': i === length - 1,
                    'border-b-0': i !== 0 && i !== length - 1,
                  },
                )}
              >
                <div
                  className={classNames(
                    'absolute top-0 bottom-0 w-14 flex items-center justify-center bg-purple-700',
                    {
                      'rounded-tl-lg': i === 0,
                      'rounded-bl-lg': i === length - 1,
                    },
                  )}
                >
                  <span className="text-white font-normal">{c.rank}</span>
                </div>
                <div className="pl-14">
                  <div className="px-3 py-2">
                    <div className="flex items-center justify-start">
                      <ReactCountryFlag countryCode={c.short_country} svg />
                      <span className="mr-2" />
                      <p className="text-black text-md font-semibold m-0 p-0">
                        {c.long_city}
                        <span className="m-0 p-0 font-normal text-gray-600">
                          , {c.long_country}
                        </span>
                      </p>
                    </div>
                    <p className="text-purple-700 font-semibold text-md m-0 p-0">
                      {excludeOfflineHotspots
                        ? c.online_count?.toLocaleString()
                        : c.hotspot_count?.toLocaleString()}{' '}
                      hotspots
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-center mt-5">
          <Pagination
            current={currentPage}
            showSizeChanger
            size="small"
            total={citiesToDisplayArray.length}
            pageSize={pageSize}
            onChange={(page, pageSize) => {
              setCurrentPage(page)
              setPageSize(pageSize)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default CitiesTable
