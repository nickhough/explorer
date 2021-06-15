import { groupBy } from 'lodash'

const CONFIG = {
  state_channel_open_v1: { color: '#E68B00', name: 'State Channel Open' },
  price_oracle_v1: { color: 'rebeccapurple', name: 'Price Oracle' },
  state_channel_close_v1: {
    color: 'teal',
    hotspotContextName: 'Packets Transferred',
    name: 'State Channel Close',
  },
  payment_v1: { color: '#1D91F8', name: 'Payment' },
  payment_v2: { color: '#1D91F8', name: 'Payment' },
  poc_request_v1: {
    color: '#29D391',
    name: 'PoC Challenge',
    hotspotContextName: 'Created Challenge',
    tooltip: 'Proof of Coverage Challenge',
  },
  poc_receipts_v1: {
    color: '#38A2FF',
    name: 'PoC Receipt',
    tooltip: 'Proof of Coverage Receipt',
  },
  rewards_v1: {
    color: '#E68B00',
    name: 'Mining Reward',
    hotspotContextName: 'Received Mining Rewards',
    tooltip: 'Mining Reward (v1)',
  },
  rewards_v2: {
    color: '#E68B00',
    name: 'Mining Reward',
    hotspotContextName: 'Received Mining Rewards',
    tooltip: 'Mining Reward (v2)',
  },
  consensus_group_v1: {
    color: '#FF6666',
    name: 'Consensus Election',
    hotspotContextName: 'Participated in Consensus',
    tooltip: 'Consensus Election',
  },
  transfer_hotspot_v1: {
    color: '#474DFF',
    name: 'Transfer Hotspot',
    tooltip: 'Hotspot Transfer Confirmation Transaction',
  },
  poc_challengers: {
    color: '#BE73FF',
    name: 'Challenger',
    hotspotContextName: 'Created Challenge',
    tooltip: 'PoC challenger',
  },
  poc_challengees: {
    color: '#595A9A',
    name: 'Beacon',
    hotspotContextName: 'Sent Beacon',
    tooltip: 'PoC challengee',
  },
  assert_location_v1: {
    color: '#16CEE8',
    name: 'Assert Location',
    hotspotContextName: 'Asserted Location',
    tooltip: 'Assert Location Transaction (v1)',
  },
  assert_location_v2: {
    color: '#16CEE8',
    name: 'Assert Location',
    hotspotContextName: 'Asserted Location',
    tooltip: 'Assert Location Transaction (v2)',
  },
  add_gateway_v1: {
    color: '#8597BB',
    name: 'Add Hotspot',
    tooltip: 'Add Gateway Transaction',
  },
  poc_witnesses: {
    color: '#FFC769',
    name: 'Witness',
    hotspotContextName: 'Witnessed Beacon',
    tooltip: 'PoC witness',
  },
  poc_witnesses_valid: {
    color: '#FFC769',
    name: 'Witness',
    hotspotContextName: 'Witnessed Beacon',
    tooltip: 'PoC witness (Valid)',
  },
  poc_witnesses_invalid: {
    color: '#717E98',
    name: 'Witness',
    hotspotContextName: 'Witnessed Beacon (Invalid)',
    tooltip: 'PoC witness (Invalid)',
  },
  securities: {
    color: '#9AE8C9',
    name: 'Security Token Reward',
    tooltip: 'Mining Reward for Security Token holders',
  },
  token_burn_v1: { color: '#E86161', name: 'Token Burn' },
  default: { color: '#474DFF' },
}

export const getTxnTypeName = (id, context = 'block') => {
  if (context === 'hotspot')
    return CONFIG[id]?.hotspotContextName || CONFIG[id]?.name || id
  if (context === 'account')
    return CONFIG[id]?.accountContextName || CONFIG[id]?.name || id
  return CONFIG[id]?.name || id
}

export const getTxnTypeColor = (id) => {
  return (CONFIG[id] || CONFIG.default).color
}

export const getTxnTypeTooltip = (id) => {
  return CONFIG[id]?.tooltip
}

export const splitTransactionsByTypes = (txns) => {
  const obj = groupBy(txns, 'type')
  const arr = Object.keys(obj)
    .map((type) => ({ type, txns: obj[type] }))
    .sort((a, b) => b.txns.length - a.txns.length)
  return arr
}

export const formattedTxnHash = (hash) => {
  // TODO add optional truncation amount
  return `${hash.slice(0, 5)}...${hash.slice(-5)}`
}

export const getPocReceiptRole = (txn, address) => {
  let role = ''
  if (txn.challenger === address) {
    role = 'poc_challengers'
    return role
  }
  txn.path.map((p) => {
    if (p.challengee === address) {
      role = 'poc_challengees'
      return role
    }
    p.witnesses.map((w) => {
      if (w.gateway === address) {
        role = w.isValid ? 'poc_witnesses_valid' : 'poc_witnesses_invalid'
        return role
      }
    })
  })

  return role
}
