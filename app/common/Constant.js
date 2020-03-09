import { Dimensions, Platform, StatusBar } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const statusHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const headerHeight = 80;

export default {
  rave_publickey: 'FLWPUBK_TEST-fc1356183ca31a6b449d32d06aadf597-X',
  rave_secretkey: 'FLWSECK_TEST-540e40f66b92934b9764334f6f8cf626-X',
  rave_encryptionkey: 'FLWSECK_TESTfde803baf423',
  publickey: 'FLWPUBK_TEST-fc1356183ca31a6b449d32d06aadf597-X',
  secretkey: 'FLWSECK_TEST-540e40f66b92934b9764334f6f8cf626-X',
  encryptionkey: 'FLWSECK_TESTfde803baf423',
  kraken_token_url: 'https://remittyllc.com/api/v0/kraken/token',
  transferwise_api_key: 'c6ad6f58-4395-4f5a-abf7-b1c32124951d',
  token_url: 'https://remittyllc.com/api/v0/kraken/token',
  req_url: 'https://remittyllc.com/',
  currencies: [
    { value: 'USD' },
    { value: 'GBP' },
    { value: 'EUR' },
    { value: 'BTC(Bitcoin)' },
    { value: 'LTC(Litecoin)' },
    { value: 'ETH(Ethereum)' },
  ],
  fiatcurrencies: [{ value: 'USD' }, { value: 'EUR' }],
  stock_order_type: [
    { value: 'Market' },
    { value: 'Limit' },
    { value: 'Stop' },
    { value: 'Stop limit' },
  ],
  cryptocurrencies: [{ value: 'BTC' }, { value: 'LTC' }, { value: 'ETH' }],
  authemail: 'dev5@britisheducationonline.org',
  authpass: 'bux@2018',
  '': '',
  window: {
    width,
    height,
  },
  statusHeight: statusHeight,
  headerHeight: headerHeight,
  menuHeight: Platform.OS === 'ios' ? 60 : 80,
};
export const emailValidate = email => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};
export const mobileValidate = number => {
  let reg = /^[0]?[789]\d{9}$/;
  if (reg.test(number) === false) {
    return false;
  } else {
    return true;
  }
};
