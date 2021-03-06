import memoizeOne from 'memoize-one';
import React from 'react';

function makeUsePinterest(endpoint, pagination=true) {
  return function(...args) {
    const resp = React.useRef(pagination ? {} : []);
    const [responseState, setResponseState] = React.useState(pagination ? {} : []);
    const [next, setNext] = React.useState(null);
    const callback = React.useCallback((response) => {
      const nextResponse = pagination ? response :  [...resp.current, response];
      setResponseState(nextResponse);
      resp.current = nextResponse;
      if (response.hasNext){
        if (pagination) {
          setNext(response.next);          
        } else {
          response.next();
        }
      } else {
          setNext(null);
      }
    }, []);

    React.useEffect(() => {
      endpoint(...args, callback);
    }, []);

    return {response: responseState, next};
  }
}

export const useMe = makeUsePinterest(window.PDK.me);
export function useBoards() {
  return useMe('boards', {fields: 'id,name'});
}
export const useRequestAll = makeUsePinterest(window.PDK.request, false);
export function usePins(boardId) {
  return useRequestAll(`/boards/${boardId}/pins`, {fields: 'image[original],id,note'});
}

const simplePromise = (cbfunc) => (...args) => {
  let results = [];
  return new Promise((resolve, reject) => {
    cbfunc(...args, (response) => {
      console.log('response', response);
      if (response.data) {
        results.push(response.data);
        if (response.hasNext) {
          response.next();
        }
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
}

const me = memoizeOne(simplePromise(window.PDK.me));
const request = memoizeOne(simplePromise(window.PDK.request));

export async function getBoards() {
  // return {data: [{"image": {"small": {"url": null, "width": 30, "height": 30}}, "id": "543246842490896739", "name": "Test"}, {"image": {"small": {"url": "https://i.pinimg.com/30x30/e4/7f/29/e47f29c381fc6c381d9f8a99f7fde695.jpg", "width": 30, "height": 30}}, "id": "543246842490896740", "name": "Kitchen Ideas"}]}
  const boards = await me('boards', {fields: 'id,name,image[small]'});
  return boards;
}

export async function getPins(boardId) {
  const pins = await request(`/boards/${boardId}/pins`, {fields: 'image[original],id,note'});
  return pins;
  // return {"data": [{"attribution": null, "creator": {"url": "https://www.pinterest.com/wabrielgest/", "first_name": "Gabriel", "last_name": "West", "id": "543246911210031684"}, "url": "https://www.pinterest.com/pin/543246773792732595/", "media": {"type": "image"}, "created_at": "2017-07-18T21:45:04", "original_link": "https://www.sarahraven.com/flowers/plants/shrubs/viburnum_opulus_roseum.htm", "note": "Something", "color": "#7d9850", "link": "https://www.pinterest.com/r/pin/543246773792732595/4921518846082296388/a25262ecf5f06afc8f2a902222589093919ea31b53a71af39d6dd03057a0b329", "board": {"url": "https://www.pinterest.com/wabrielgest/kitchen-ideas/", "id": "543246842490896740", "name": "Kitchen Ideas"}, "image": {"original": {"url": "https://i.pinimg.com/originals/eb/06/81/eb0681f23db1138ef3195eff8d990454.jpg", "width": 1500, "height": 1500}}, "counts": {"saves": 0, "comments": 0}, "id": "543246773792732595", "metadata": {"product": {"name": "Viburnum opulus 'Roseum' syn. 'Sterile'", "offer": {"price": "\u00a313.46", "standard_price": "\u00a314.95", "in_stock": false, "availability": 2}}, "link": {"locale": "en_GB", "title": "Viburnum opulus 'Roseum' syn. 'Sterile'", "site_name": "Sarah Raven", "description": "Buy Viburnum opulus 'Roseum' syn. 'Sterile' from Sarah Raven: My absolute favourite foliage plant for late spring, early summer picking. From early May, this is covered in bright acid-green fluffy footballs and elegant indented leaves.", "favicon": "https://i.pinimg.com/favicons/588cd583e20b230aadde4ecaa0e0e4c87b1f138dae45045ee3a841ea.ico?c7f8286f670f697bbca732f06ae4afb8"}}}, {"attribution": null, "creator": {"url": "https://www.pinterest.com/robynmorwenna/", "first_name": "Robyn", "last_name": "Westmarwick", "id": "211950863621556132"}, "url": "https://www.pinterest.com/pin/543246773781542099/", "media": {"type": "image"}, "created_at": "2015-11-03T10:34:10", "original_link": "http://www.farrow-ball.com/colours/paint/fcp-category/list?isSearchFilterSuffix=true&results=999&visModel=CHANNEL&filters=COLOUR_GROUP_FILTER_LANG_en-GB:blue!Hierarchy_TOP_NAVIGATION_FILTER:/TOP_NAVIGATION/wc_shop_all/wc_paint_all/wc_paint_colours", "note": "Pale Powder - Farrow & Ball", "color": "#d0d9c8", "link": "https://www.pinterest.com/r/pin/543246773781542099/4921518846082296388/d5221c83ec4cac25ed62e5919ae11aeb081b9409e57a72779170c8051a56e2cb", "board": {"url": "https://www.pinterest.com/wabrielgest/kitchen-ideas/", "id": "543246842490896740", "name": "Kitchen Ideas"}, "image": {"original": {"url": "https://i.pinimg.com/originals/9b/6e/39/9b6e39dae3055f2e1c3c5450664328bf.jpg", "width": 280, "height": 420}}, "counts": {"saves": 0, "comments": 0}, "id": "543246773781542099", "metadata": {}}, {"attribution": null, "creator": {"url": "https://www.pinterest.com/robynmorwenna/", "first_name": "Robyn", "last_name": "Westmarwick", "id": "211950863621556132"}, "url": "https://www.pinterest.com/pin/543246773781542087/", "media": {"type": "image"}, "created_at": "2015-11-03T10:33:27", "original_link": "http://www.farrow-ball.com/colours/paint/fcp-category/list?isSearchFilterSuffix=true&results=999&visModel=CHANNEL&filters=COLOUR_GROUP_FILTER_LANG_en-GB:blue!Hierarchy_TOP_NAVIGATION_FILTER:/TOP_NAVIGATION/wc_shop_all/wc_paint_all/wc_paint_colours", "note": "Parma Gray - Farrow & Ball", "color": "#cbd7d7", "link": "https://www.pinterest.com/r/pin/543246773781542087/4921518846082296388/3fa15e77158b1f8010f88b6e268929a3eeddcfdbfa5809b121a5b9c91668f05c", "board": {"url": "https://www.pinterest.com/wabrielgest/kitchen-ideas/", "id": "543246842490896740", "name": "Kitchen Ideas"}, "image": {"original": {"url": "https://i.pinimg.com/originals/d9/15/8f/d9158fd3fcec72dcbea66a3222477bd4.jpg", "width": 280, "height": 420}}, "counts": {"saves": 1, "comments": 0}, "id": "543246773781542087", "metadata": {}}, {"attribution": null, "creator": {"url": "https://www.pinterest.com/robynmorwenna/", "first_name": "Robyn", "last_name": "Westmarwick", "id": "211950863621556132"}, "url": "https://www.pinterest.com/pin/543246773781542083/", "media": {"type": "image"}, "created_at": "2015-11-03T10:33:16", "original_link": "http://www.farrow-ball.com/colours/paint/fcp-category/list?isSearchFilterSuffix=true&results=999&visModel=CHANNEL&filters=COLOUR_GROUP_FILTER_LANG_en-GB:blue!Hierarchy_TOP_NAVIGATION_FILTER:/TOP_NAVIGATION/wc_shop_all/wc_paint_all/wc_paint_colours", "note": "Light Blue - Farrow & Ball", "color": "#cfd7cc", "link": "https://www.pinterest.com/r/pin/543246773781542083/4921518846082296388/f80a77bfd61bac987e29843632c4f3a306aafc69adbb7f65f76a59db11fff7fa", "board": {"url": "https://www.pinterest.com/wabrielgest/kitchen-ideas/", "id": "543246842490896740", "name": "Kitchen Ideas"}, "image": {"original": {"url": "https://i.pinimg.com/originals/a1/bb/d0/a1bbd0a56d306c5c92052cd0e9d71cdb.jpg", "width": 280, "height": 420}}, "counts": {"saves": 0, "comments": 0}, "id": "543246773781542083", "metadata": {}}, {"attribution": null, "creator": {"url": "https://www.pinterest.com/robynmorwenna/", "first_name": "Robyn", "last_name": "Westmarwick", "id": "211950863621556132"}, "url": "https://www.pinterest.com/pin/543246773781542080/", "media": {"type": "image"}, "created_at": "2015-11-03T10:32:30", "original_link": "http://www.farrow-ball.com/colours/paint/fcp-category/list?isSearchFilterSuffix=true&results=999&visModel=CHANNEL&filters=COLOUR_GROUP_FILTER_LANG_en-GB:blue!Hierarchy_TOP_NAVIGATION_FILTER:/TOP_NAVIGATION/wc_shop_all/wc_paint_all/wc_paint_colours", "note": "Borrowed Light - Farrow & Ball", "color": "#dbe5dc", "link": "https://www.pinterest.com/r/pin/543246773781542080/4921518846082296388/cb7cc31418ede40d4ec7bd32cf386fb28f983e8d234fa67e7da2f6e5c79ea506", "board": {"url": "https://www.pinterest.com/wabrielgest/kitchen-ideas/", "id": "543246842490896740", "name": "Kitchen Ideas"}, "image": {"original": {"url": "https://i.pinimg.com/originals/e4/7f/29/e47f29c381fc6c381d9f8a99f7fde695.jpg", "width": 280, "height": 420}}, "counts": {"saves": 0, "comments": 0}, "id": "543246773781542080", "metadata": {}}], "page": {"cursor": null, "next": null}}
}